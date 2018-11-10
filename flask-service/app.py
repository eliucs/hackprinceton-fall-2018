"""
  Flask service for generating audioCAPTCHAs.
"""

from flask import Flask, render_template, request, jsonify

from audio_mixing import mix_audio
from google_cloud import text_to_speech, upload_to_storage
from word_generation import random_words

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/api/generate-audio-captcha', methods=['POST'])
def generate_audio_captcha():
  # TODO: Check API key, make sure that only audio-captcha web server is able to
  # authenticate and use this route

  try:
    numWords = int(request.form['numWords'])
    words = random_words.generate_random_words(numWords)
    audioTextBinary = text_to_speech.generate_audio_from_text(words)
    combinedAudio = mix_audio.mix_audio_files(audioTextBinary, 2, False)
    uuid, publicUrl = upload_to_storage.upload_audio_file(combinedAudio)

    return jsonify({
      'success': 'audioCAPTCHA successfully generated',
      'data': {
        'words': words,
        'id': uuid,
        'publicUrl': publicUrl
      }
    })
  except:
    return jsonify({
      'error': 'There was a problem generating the audioCAPTCHA'
    }), 400

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)
