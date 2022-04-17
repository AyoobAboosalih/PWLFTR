from distutils.log import debug
from flask import Flask, request
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
# run_with_ngrok(app)

# Memeber API Route

@app.route("/video", methods=['GET', 'POST'])
def members():
    if(request.method == "POST"):
        bytesOfVideo = request.get_data()
        with open('video.mp4', 'wb') as out:
            out.write(bytesOfVideo)
        return "Video read"
    return{"members": ["Member1","Member2","Member3"]}


if __name__ == "__main__":
    app.run(host = '192.168.1.4', port=3000 ,debug=True)