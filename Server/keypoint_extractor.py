import cv2
import numpy as np
import os
import tensorflow as tf
import mediapipe as mp

from tensorflow.keras.models import load_model

Squat_result = np.array(['Valid', 'Invalid'])
model = load_model("PWLFTR_180.h5")
longest_sequence = np.load("Longest_Sequence.npy")

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

# Function to extract body key-points detected
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    return pose


def process_video(video):
    # 1. New detection variables
    sequence_for_prediction = [longest_sequence]
    window = []

    # Capturing Video Stream
    cap = cv2.VideoCapture(video)

    # Setting up Video Writer
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    frame_size = (frame_width,frame_height)
    fps = 30
    output = cv2.VideoWriter('anotatedVideo.mp4', cv2.VideoWriter_fourcc(*'XVID'), fps, frame_size)


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

            # 2. Prediction logic
            keypoints = extract_keypoints(results)
            #sequence.insert(0,keypoints)
            #sequence = sequence[:30]
            window.append(keypoints)

            # Show to screen
            # dim = scale_video(30)
            # image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
            cv2.imshow('OpenCV Feed', image)

            # Break gracefully
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        output.release()
        cv2.destroyAllWindows()

        sequence_for_prediction.append(window)
        padded_sequence = tf.keras.preprocessing.sequence.pad_sequences(sequence_for_prediction, maxlen=191)
        seq_to_predict = padded_sequence[1]       
        return seq_to_predict


def squat_validator(sequence):
    res = model.predict(np.expand_dims(sequence, axis=0))
    return Squat_result[np.argmax(res)]
