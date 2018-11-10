
def get_urls():
  # URLs from SoundBible follow the format:
  # soundbible.com/free-sound-effects-${n}.html
  FIRST_URL = 'soundbible.com/free-sounds.php'
  FIRST_PAGE = 2
  LAST_PAGE = 214
  result = [FIRST_URL]
  for i in range(FIRST_PAGE, LAST_PAGE + 1):
    result.append('soundbible.com/free-sound-effects-${i}.html')
  return result

def web_scrape():
  return 0

print(get_urls())
