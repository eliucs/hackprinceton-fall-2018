# audioCAPTCHA Generation

Microservice for the generation of audioCAPTCHAs. This does the following:
1. Generates list of `n` random words, specified by the user
2. Uses Google Cloud Text-to-Speech API to turn those words into binary audio file
(`audioTextBinary`)
3. Uses stdlib function to fetch list of `m` background audio files from Firebase
4. Requests those audio files
5. Mixes `audioTextBinary` with the audio files to create audioCAPTCHA, validates the
security of the audioCAPTCHA using Google Cloud Speech API
6. Repeatedly mixes audio until it is indecipherable by the Google Cloud Speech API
