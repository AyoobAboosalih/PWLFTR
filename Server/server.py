from distutils.log import debug
from flask import Flask, request
from flask_ngrok import run_with_ngrok
from PIL import Image
import os

app = Flask(__name__)
# run_with_ngrok(app)

# Memeber API Route

@app.route("/video", methods=['GET','POST'])
def members():
    if(request.method == "POST"):
        bytesOfVideo = request.get_data()
        print(bytesOfVideo)
        with open('video.mp4', 'wb') as out:
            out.write(bytesOfVideo)
        # cap = cv2.VideoCapture(video)
        # while cap.isOpened():

        #     # Read feed
        #     ret, frame = cap.read()
        #     #Close window at end of video
        #     if not ret:
        #         break
        #     cv2.imshow('OpenCV Feed', image)

        #     # Break gracefully
        #     if cv2.waitKey(10) & 0xFF == ord('q'):
        #         break
        # cap.release()
        # cv2.destroyAllWindows()
        return "Video readdddddd"
    return "Hello worlds"


@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('image.png', 'wb') as out:
            out.write(bytesOfImage)
        return "Image read"


@app.route('/processing',methods=['GET', 'POST'])
def process():
    print(request.files)
    file = request.files['videoFile']
    print(file)
    UPLOAD_FOLDER = './upload'
    path = os.path.join(UPLOAD_FOLDER, "test-vid" + ".mp4")
    file.save(path)
    return "works"

if __name__ == "__main__":
    app.run(debug=True)