"""
  Flask service for generating audioCAPTCHAs.
"""

from flask import Flask, render_template

from audio_mixing import mix_audio
from text_to_speech import generate_audio
from word_generation import random_words

app = Flask(__name__)

@app.route('/')
def index():
  words = random_words.generate_random_words(3)
  print(words)
  audioTextBinary = generate_audio.generate_audio_from_text(words)
  combinedAudio = mix_audio.mix_audio_files(audioTextBinary, 2, False, 'combined.mp3')

  return render_template('index.html')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)
