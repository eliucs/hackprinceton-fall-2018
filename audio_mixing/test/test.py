from pydub import AudioSegment

sound1 = AudioSegment.from_file("sound1.mp3")
sound2 = AudioSegment.from_file("sound2.mp3")

combined = sound1.overlay(sound2)

combined.export("combined.mp3", format='mp3')