"""
Upload all CSV content to MongoDB.
"""

import csv
import json

from pymongo import MongoClient

def parse_csv():
  data = []
  with open('geoipcountry.csv') as csvFile:
    csvReader = csv.reader(csvFile, delimiter=',')
    for row in csvReader:
      data.append({
        "ip_start": row[0],
        "ip_end": row[1],
        "ip_num_start": row[2],
        "ip_num_end": row[3],
        "country_code": row[4],
        "country_name": row[5]
      })

  with open('./config/mlab_config.json') as configFile:
    config = json.load(configFile)

  client = MongoClient('mongodb://{}:{}@ds159273.mlab.com:59273/ip-to-country'
    .format(config['username'], config['password']))
  db = client['ip-to-country']
  collection = db['ip_addresses_by_country']

  result = collection.insert_many(data)
  print(result.inserted_ids)

parse_csv()
