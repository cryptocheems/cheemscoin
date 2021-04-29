import requests
from math import log
from csv import DictWriter
from cryptoaddress import EthereumAddress

TEAMID = "1060762"

TOTALCHEEMS = 4000
MINCHEEMS = 5
RATE = 1/5000

with open('fah/previous.txt', 'r') as file:
  oldScores = eval(file.read())

response = requests.get(f"https://api.foldingathome.org/team/{TEAMID}/members" )
scores = response.json()

validScores = {}
invalidUsers = []

# This skips the first element which is just ['name', 'id', 'rank', 'score', 'wus']
for i in range(1, len(scores) ):
  user = scores[i]
  name = user[0]
  credit = user[3]

  try:
    EthereumAddress(name)
    validScores[name] = credit
  except ValueError:
    invalidUsers.append(user)

if validScores == oldScores:
  raise Exception("Valid scores identical to previous")

with open('fah/previous.txt', 'w') as file:
  file.write(str(validScores))

# Adjust points https://www.desmos.com/calculator/c9q5f46aea
def adjust(score):
  return (score, score if score < 1_000_000 else 1_800_000 * log(score + 1_000_000) - 25_115_584)

weekScores = {k: adjust(v - oldScores.get(k, 0)) for (k, v) in validScores.items() if v > oldScores.get(k, 0)}
totalPoints = sum([tup[1] for tup in weekScores.values()])

totalMin = MINCHEEMS * len(weekScores)
totalAmount = totalPoints * RATE + totalMin

cheemsAmounts = list(map((lambda user: {
  "address": user[0],
  "points": user[1][0],
  "adjusted points": user[1][1],
  "cheems": (user[1][1] / totalPoints * (TOTALCHEEMS - totalMin) if totalAmount > TOTALCHEEMS else user[1][1] * RATE) + MINCHEEMS
}), weekScores.items()))

with open("fah/payout.csv", 'w', encoding="utf8", newline="") as output:
  dict_writer = DictWriter(output, cheemsAmounts[0].keys())
  dict_writer.writeheader()
  dict_writer.writerows(cheemsAmounts)

print('Invalid users:')
print(invalidUsers)

# What this is doing is making it into code I can use in truffle console
# This is a pretty bad way of going about this
formatedAmounts = list(map((lambda user: {
  "account": user["address"],
  "amount": str(int(user["cheems"] * 10 ** 18))
}), cheemsAmounts))

with open("fah/payout.txt", "w", encoding="utf8") as file:
  file.write(
f'''const fah = await Fah.deployed()

await fah.distribute('{str(int((TOTALCHEEMS if totalAmount > TOTALCHEEMS else totalAmount) * 10 ** 18))}', {formatedAmounts})''')

# TODO: Backup the produced files
