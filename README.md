# HackPrinceton Fall 2018

audioCAPTCHA generation.

- `flask-service`: Flask server that uses Google Cloud Text-to-Speech and pydub
to mix voice and background sound to make an audio-based CAPTCHA that is
indecipherable by Google Cloud Speech
- `stdlib-services`: Various microservices made with stdlib
- `web-application`: Node.js server + React web application to view statistics
generated from the audioCAPTCHAs
- `web-scraping`: Python scripts to web scrape for audio files, then upload
them to Google Cloud Storage.
