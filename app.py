from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hola Mundo!"


@app.route("/contact")
def contact():
    return "Si necesitas algo, enviame un mail a @example.com"
