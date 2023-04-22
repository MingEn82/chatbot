from flask import Flask, request
from flask_cors import CORS
import sketch
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

pattern_data = pd.read_csv("TSLA.csv")

@app.route("/", methods=['POST'])
def main():
    if request.method == 'POST':
        question = request.form.get("question")
        answer = pattern_data.sketch.ask(question, call_display=False)
        return {
            'answer': answer
        }
    else:
        return "<p>Invalid method</p>"

if __name__ == "__main__":
    app.run(debug=True, port=5000)