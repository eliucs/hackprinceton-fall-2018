"""
  Flask service for generating audioCAPTCHAs.
"""

from flask import Flask, render_template, request

from word_generation import random_words

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
