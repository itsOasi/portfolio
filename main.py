from flask import Flask
import os
import wae
app = Flask(__name__)

@app.route("/")
def main():
    return wae.output.load_index_page()

@app.route("/pull", methods=["GET", "POST", "OPTIONS"])
def pull():
    os.system("git pull https://github.com/OasiBoi/itsOasi-Portfolio.git")
    return {}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)