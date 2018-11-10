"""
Mixes the audio text binary file with multiple random layers of background
audio. Uses a stdlib function to fetch multiple urls to audio files, then makes
requests to download those files. Repeatedly mixes audio files until it is
indecipherable by Google Cloud Speech API.
"""

import io
import os
import random
import urllib.request

from google.cloud import storage
from pydub import AudioSegment

BUCKET_NAME = 'audio-captcha'
MAX_SOUNDBITE_NUM = 400

def download_blob(bucketName, srcBlobName):
  client = storage.Client()
  bucket = client.get_bucket(bucketName)
  blob = bucket.blob(srcBlobName)
  return blob.download_as_string()

def mix_audio_files(audioTextBinary, n = 3, useTestSoundBites = False, outputFileName = None):
  if n < 1:
    raise RuntimeError('n must be >= 1, at least one audio file must be mixed in')

  if useTestSoundBites:
    # Get list of soundbite files
    path = os.path.dirname(os.path.abspath(__file__)) + '/sample_soundbites'
    soundbiteFiles = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]

    # Randomly choose n soundbite files
    soundbiteSamples = random.sample(soundbiteFiles, n)
  else:
    path = os.path.dirname(os.path.abspath(__file__)) + '/temp_soundbites'
    indices = random.sample(range(0, MAX_SOUNDBITE_NUM), n)
    soundbiteSamples = []
    for i in indices:
      fileName = '{}.mp3'.format(i)
      blobData = download_blob(BUCKET_NAME, fileName)
      soundbiteSamples.append(blobData)

  # Combine audio files
  combinedAudio = AudioSegment.from_file(io.BytesIO(audioTextBinary))
  for soundbiteFile in soundbiteSamples:
    if useTestSoundBites:
      audioLayer = AudioSegment.from_file(path + '/' + soundbiteFile)
    else:
      audioLayer = AudioSegment.from_file(io.BytesIO(soundbiteFile))

    # Reduce audio by 8db
    audioLayer -= 8

    combinedAudio = combinedAudio.overlay(audioLayer)

  if outputFileName:
    combinedAudio.export(outputFileName, format='mp3')

  return combinedAudio
