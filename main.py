from crypt import methods
from urllib import request
from flask import Flask, redirect, render_template
import os

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/pull", methods=["GET", "POST", "OPTIONS"])
def pull():
    os.system("git pull https://github.com/OasiBoi/itsOasi-Portfolio.git")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)