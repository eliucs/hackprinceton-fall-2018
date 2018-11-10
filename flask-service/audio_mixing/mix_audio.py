import io
from pydub import AudioSegment

def mix_audio_files(audioFiles):
  # Note that audioFiles are a list of binary audio files
  if len(audioFiles) == 1:
    return AudioSegment.from_file(io.BytesIO(audioFiles[0])).export('test.mp3',
      format='mp3')

  audio = list(map(lambda s: AudioSegment.from_file(io.BytesIO(s)), audioFiles))

  combined = audio[0]
  for i in range(1, len(audio)):
    combined = combined.overlay(audio[i])

  combined.export("combined.mp3", format='mp3')
