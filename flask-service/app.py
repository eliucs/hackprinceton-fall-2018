"""
  Flask service for generating audioCAPTCHAs.
"""

from flask import Flask, render_template, request

from text_to_speech import generate_audio
from word_generation import random_words

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
