from flask import Flask, request
import os
from keypoint_extractor import *

app = Flask(__name__)

# Video API Route
@app.route('/processvideo',methods=['POST'])
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

    # Save result to local storage
    save_result(squat_result)

    return squat_result

if __name__ == "__main__":
    app.run(debug=True)