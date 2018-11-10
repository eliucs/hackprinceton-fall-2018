"""
Uses the Google Cloud Text-to-Speech API to convert a string of text (English
words) to an mp3 file.
"""

import os
from google.cloud import texttospeech

def generate_audio_from_text(text, outputFile = None):
  # Setup credentials from file
  if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
    path = os.path.dirname(os.path.abspath(__file__)) + '/config/audio-captcha-credentials.json'
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = path

  # Instantiates a client
  client = texttospeech.TextToSpeechClient()

  # Set the text input to be synthesized
  if isinstance(text, list):
    textInput = ','.join(text)
  elif not isinstance(text, str):
    raise RuntimeError('text must be either a string or a list')
  else:
    textInput = text

  synthesisInput = texttospeech.types.SynthesisInput(text=textInput)

  # Build the voice request, select the language code ("en-US") and the ssml
  # voice gender ("neutral")
  voice = texttospeech.types.VoiceSelectionParams(
      language_code='en-US',
      ssml_gender=texttospeech.enums.SsmlVoiceGender.NEUTRAL)

  # Select the type of audio file you want returned
  audioConfig = texttospeech.types.AudioConfig(
      audio_encoding=texttospeech.enums.AudioEncoding.MP3)

  # Perform the text-to-speech request on the text input with the selected
  # voice parameters and audio file type
  response = client.synthesize_speech(synthesisInput, voice, audioConfig)

  if outputFile:
    with open(outputFile, 'wb') as out:
      out.write(response.audio_content)

  # Binary content audio file
  return response.audio_content
