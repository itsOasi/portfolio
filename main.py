from flask import Flask, redirect, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/pull.php")
def pull():
    return render_template("pull.php", methods=["GET", "POST"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)