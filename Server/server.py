from distutils.log import debug
from flask import Flask, request
from flask_ngrok import run_with_ngrok

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
        return "Video readdddddd"
    return "Hello worlds"

if __name__ == "__main__":
    app.run(debug=True)