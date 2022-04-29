from distutils.log import debug
from flask import Flask, jsonify, request, send_file
from PIL import Image
import os
from keypoint_extractor import *

app = Flask(__name__)

# Video API Route
@app.route('/processvideo',methods=['GET', 'POST'])
def process():
    
    # Read File sent from front-end
    file = request.files['videoFile']
    UPLOAD_FOLDER = './upload'

    # Save file for processing
    path = os.path.join(UPLOAD_FOLDER, file.name + ".mp4")
    file.save(path)

    # Pre-processing and squat validity prodiction
    sequence = process_video(path)
    squat_result = squat_validator(sequence)

    print(squat_result)

    # correctedVideo = send_file('anotatedVideo.mp4', download_name='anotatedVideo.mp4')

    response = {
        squat_result,
        # "video": correctedVideo
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)