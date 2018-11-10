"""
Mixes the audio text binary file with multiple random layers of background
audio. Uses a stdlib function to fetch multiple urls to audio files, then makes
requests to download those files. Repeatedly mixes audio files until it is
indecipherable by Google Cloud Speech API.
"""

import io
import os
import random
from pydub import AudioSegment

def mix_audio_files(audioTextBinary, n = 2):
  if n < 1:
    raise RuntimeError('n must be >= 1, at least one audio file must be mixed in')

  # Get list of soundbite files
  path = os.path.dirname(os.path.abspath(__file__)) + '/sample_soundbites'
  soundbiteFiles = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]

  # Randomly choose n soundbite files
  soundbiteSamples = random.sample(soundbiteFiles, n)

  # Combine audio files
  combinedAudio = AudioSegment.from_file(io.BytesIO(audioTextBinary))
  for soundbiteFile in soundbiteSamples:
    audioLayer = AudioSegment.from_file(path + '/' + soundbiteFile)
    combinedAudio = combinedAudio.overlay(audioLayer)

  combinedAudio.export("combinedAudio.mp3", format='mp3')
