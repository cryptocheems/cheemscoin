import requests
from csv import DictWriter
from cryptoaddress import EthereumAddress

TEAMID = "1060762"
# ! remember to change this
TOTALCHEEMS = 5000
# TODO: Consider a minimum amount of CHEEMS per user
# TODO: Also consider giving a bonus to people that have supplied liquidity

with open('fah/previous.txt', 'r') as file:
  oldScores = eval(file.read())

response = requests.get("https://stats.foldingathome.org/api/team/" + TEAMID)
scores = response.json()["donors"]

validScores = {}
invalidUsers = []

for user in scores:
  try:
    EthereumAddress(user["name"])
    validScores[user["name"]] = user["credit"]
  except ValueError:
    invalidUsers.append(user)

if validScores == oldScores:
  raise Exception("Valid scores identical to previous")

with open('fah/previous.txt', 'w') as file:
  file.write(str(validScores))

weekScores = {k: v - oldScores.get(k, 0) for (k, v) in validScores.items() if v > oldScores.get(k, 0)}
totalPoints = sum(weekScores.values())

cheemsAmounts = list(map((lambda user: {
  "address": user[0],
  "points": user[1],
  "cheems": user[1] / totalPoints * TOTALCHEEMS
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
  "account": user[0],
  "amount": str(int(user[1] / totalPoints * TOTALCHEEMS * 10 ** 18))
}), weekScores.items()))

with open("fah/payout.txt", "w", encoding="utf8") as file:
  file.write(
f'''const fah = await Fah.deployed()

await fah.distribute('{TOTALCHEEMS * 10 ** 18}', {formatedAmounts})''')
