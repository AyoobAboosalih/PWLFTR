# This is the Pipeline utilized to extract and save features and labels 
# to create the new dataset 

import cv2
import numpy as np
import os
import tensorflow as tf
import mediapipe as mp

#####  Functions to extract key-points using MediaPipe ######

#Initializing Media pipe model and drawing tools
mp_holistic = mp.solutions.holistic # Holistic model
mp_drawing = mp.solutions.drawing_utils # Drawing utilities
mp_drawing_styles = mp.solutions.drawing_styles

# Function to detect key points using mediapipe
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False                  # Image is no longer writeable
    results = model.process(image)                 # Make prediction
    image.flags.writeable = True                   # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
    return image, results


# Function to draw landmarks of detected keypoints for visualization
def draw_styled_landmarks(image, results):
    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                             mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1),
                             mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1)
                             )
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                             landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
                             )
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                             mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4),
                             mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
                             )
    # Draw right hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                             mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4),
                             mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                             )


#Fucntion to resize input video to fit screen dimensions
def scale_video(scale_percent):
    width = int(image.shape[1] * scale_percent / 100)
    height = int(image.shape[0] * scale_percent / 100)
    dimensions = (width, height)
    return dimensions

# Function to extract body key-points detected
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    return pose


# Actions that we try to detect
Squat_result = np.array(['Valid', 'Invalid'])

#### Creating folders to store Data #####

# Path for videos to create data set to be used in the Deep Learning Model
DATA_PATH = os.path.join('Add path here')

# Path for exported data, numpy arrays
VALID_SAVE_PATH = os.path.join('Squat_Data')

# Thirty videos worth of data
no_of_vids = 120

# Code to create Initial Sub Folders
for result in Squat_result:
    for sequence in range(90,120):
        try:
            os.makedirs(os.path.join(VALID_SAVE_PATH, result, str(sequence)))
        except:
            pass



#######  Main feature extraction pipline using mediapipe #############

# Variable used to iterate and save each frame of a video
frame_no = 0
for action in Squat_result:
    for video in range (90,120):
        cap = cv2.VideoCapture(os.path.join(DATA_PATH,action,str(video)+".mp4"))
        # Set mediapipe model
        with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            while cap.isOpened():
                # Read feed
                ret, frame = cap.read()
                #Close window at end of video
                if not ret:
                    break
                # Make detections
                image, results = mediapipe_detection(frame, holistic)
                # Draw landmarks
                draw_styled_landmarks(image, results)
                #Export Keypoints
                keypoints = extract_keypoints(results)
                npy_path = os.path.join(VALID_SAVE_PATH,action , str(video), str(frame_no))
                np.save(npy_path, keypoints)
                frame_no+=1
                # resize output display video
                dim = scale_video(30)
                image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)

                # Show to screen
                cv2.imshow('OpenCV Feed', image)

                # Break gracefully
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break
            cap.release()
            cv2.destroyAllWindows()
            frame_no = 0


####### Creation of Features and Labels ##############

from tensorflow.keras.utils import to_categorical

label_map = {label:num for num, label in enumerate(Squat_result)}

# initializing two arrays to hold features(sequences) and labels(labels)
sequences, labels = [], []
max_frame_num = 0

for action in Squat_result:
    for sequence in range(no_of_vids):
        counter = True
        window = []
        frame_no = 0
        while counter:
            try:
                res = np.load(os.path.join(VALID_SAVE_PATH, action, str(sequence), "{}.npy".format(frame_no)))
                print(sequence, action, frame_no)
                frame_no+=1
                if frame_no>max_frame_num:
                    max_frame_num=frame_no
                window.append(res)
            except:
                break

        sequences.append(window)
        labels.append(label_map[action])

# Features
# Features are padded to an equal sixe of the longest video to be input into the lSTM model later
X = tf.keras.preprocessing.sequence.pad_sequences(sequences)
# Labels
y = to_categorical(labels).astype(int)


# Saving Data
np.save("Features_240",X)
np.save("Labels_240",y)
