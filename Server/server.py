from distutils.log import debug
from flask import Flask, jsonify, request
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

    return squat_result

if __name__ == "__main__":
    app.run(debug=True)