"""
Uploads file to Google Cloud Storage.
"""

import io
import os
import uuid

from google.cloud import storage

BUCKET_NAME = 'audio-captcha'

def get_gcs_public_url(bucketName, destBlobName):
  return 'https://storage.cloud.google.com/{}/{}'.format(bucketName, destBlobName)

# Uploads binary object to Google Cloud Storage
def upload_blob(bucketName, srcFileName, destBlobName, debug = True):
  client = storage.Client()
  bucket = client.get_bucket(bucketName)
  blob = bucket.blob(destBlobName)
  blob.upload_from_filename(srcFileName)
  publicUrl = get_gcs_public_url(bucketName, destBlobName)

  if debug:
    print('Uploaded:', srcFileName)
    print('Public Url:', publicUrl)

  return publicUrl

def upload_audio_file(audioFile):
  if 'GOOGLE_APPLICATION_CREDENTIALS' not in os.environ:
    path = os.path.dirname(os.path.abspath(__file__)) + '/config/audio-captcha-credentials.json'
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = path

  id = str(uuid.uuid4())
  fileName = id + '.mp3'
  audioFile.export(fileName, format='mp3')
  publicUrl = upload_blob(BUCKET_NAME, fileName, 'public/' + fileName)
  os.remove(fileName)

  return id, publicUrl
