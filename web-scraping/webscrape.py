import asyncio
import os
import pickle
import requests
import urllib.request

from bs4 import BeautifulSoup
from google.cloud import storage

# Get list of URLs to scrape
def get_urls():
  # URLs from SoundBible follow the format:
  # soundbible.com/free-sound-effects-${n}.html
  FIRST_URL = 'http://soundbible.com/free-sounds.php'
  FIRST_PAGE = 2
  LAST_PAGE = 214
  result = [FIRST_URL]
  for i in range(FIRST_PAGE, LAST_PAGE + 1):
    result.append(f'http://soundbible.com/free-sound-effects-{i}.html')
  return result

# Scrape URLs for .mp3 links
async def web_scrape(urls, debug = False):
  loop = asyncio.get_event_loop()
  futures = [
    loop.run_in_executor(
      None,
      requests.get,
      url
    )
    for url in urls
  ]

  audioUrls = []
  for response in await asyncio.gather(*futures):
    soup = BeautifulSoup(response.content, 'html.parser')
    for link in soup.find_all('a', href=True):
      linkUrl = link['href']
      if 'mp3' in linkUrl:
        audioUrls.append(linkUrl)
        if debug: print('Found audio link:', linkUrl)
    pass

  return audioUrls

# Download audio files, then upload them to Google Cloud Storage
def download_audio_files(urls):
  BUCKET_NAME = 'audio-captcha'
  client = storage.Client()
  bucket = client.get_bucket(BUCKET_NAME)

  for i, url in enumerate(urls):
    response = urllib.request.urlopen(url)
    # data = response.read()
    # contentType = response.getheader('Content-Type')
    fileName = '{}.mp3'.format(i)
    blob = bucket.blob(fileName)

    publicUrl = blob.upload_from_file(
      response.read(),
      content_type = response.getheader('Content-Type')
    )

    print(public_url)

    # fileName = '{}.mp3'.format(i)
    # upload_blob(BUCKET_NAME, fileName, data)

def main():
  URLS_TO_SCRAPE_PATH = './pickle-files/urlsToScrape.p'
  AUDIO_URLS_PATH = './pickle-files/audioUrls.p'

  # URLs to scrape
  try:
    urlsToScrape = pickle.load(open(URLS_TO_SCRAPE_PATH, 'rb'))
  except (OSError, IOError) as e:
    urlsToScrape = get_urls()
    pickle.dump(urlsToScrape, open(URLS_TO_SCRAPE_PATH, 'wb'))

  # Audio URLs
  try:
    audioUrls = pickle.load(open(AUDIO_URLS_PATH, 'rb'))
  except (OSError, IOError) as e:
    loop = asyncio.get_event_loop()
    audioUrls = loop.run_until_complete(web_scrape(urlsToScrape))
    pickle.dump(audioUrls, open(AUDIO_URLS_PATH, 'wb'))

  # Download audio files and upload to Google Cloud Storage
  if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
    path = os.path.dirname(os.path.abspath(__file__)) + '/config/audio-captcha-credentials.json'
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = path
  download_audio_files(audioUrls)

main()
