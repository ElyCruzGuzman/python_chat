from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hola Mundo!"


@app.route("/contact")
def hello():
    return "Si necesitas algo, enviame un mail a @example.com"
