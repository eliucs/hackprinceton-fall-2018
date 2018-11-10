import random
from .word_list import WORD_LIST

def generate_random_words(n = 1):
  if n < 1:
    raise RuntimeError('n must be a number >= 1')

  result = random.sample(WORD_LIST, n)
  random.shuffle(result)
  return result
