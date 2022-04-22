from distutils.log import debug
from flask import Flask, request
from PIL import Image
import os
from keypoint_extractor import *

app = Flask(__name__)

# Video API Route

@app.route('/processing',methods=['GET', 'POST'])
def process():
    # print(request.files)
    file = request.files['videoFile']
    #print(file)
    UPLOAD_FOLDER = './upload'
    path = os.path.join(UPLOAD_FOLDER, "test-vid" + ".mp4")
    file.save(path)

    sequence = process_video(path)
    squat_result = squat_validator(sequence)
    print(squat_result)

    return "works"

if __name__ == "__main__":
    app.run(debug=True)