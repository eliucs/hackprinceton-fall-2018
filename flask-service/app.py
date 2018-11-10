"""
  Flask service for generating audioCAPTCHAs.
"""

from flask import Flask, render_template, request

from audio_mixing import mix_audio
from text_to_speech import generate_audio
from word_generation import random_words

app = Flask(__name__)

@app.route('/')
def index():
  audioBin = generate_audio.generate_audio_from_text('Hello, World')
  mix_audio.mix_audio_files([audioBin])

  return render_template('index.html')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)
