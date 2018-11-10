import random
from word_list import WORD_LIST

def generate_random_words(n):
  if n < 1:
    raise RuntimeError('n must be a number >= 1')

  totalWords = len(WORD_LIST)

  # Generate n unique, random, indices between 0 and TOTAL_WORDS
  indices = set()
  while len(indices) < n:
    randomIndex = random.randint(0, totalWords - 1)
    if randomIndex not in indices:
        indices.add(randomIndex)

  # Add words by index to result array
  result = list(map(lambda index: WORD_LIST[index], list(indices)))
  random.shuffle(result)

  return result
