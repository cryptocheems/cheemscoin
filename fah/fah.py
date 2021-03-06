import requests
from cryptoaddress import EthereumAddress

# Cheemscoin one is 1060762
TEAMID = "226715" # this is the dogefolders one just for testing
# ! remember to change this
TOTALCHEEMS = 5000
# TODO: Consider a minimum amount of CHEEMS per user
# TODO: Also consider giving a bonus to people that have supplied liquidity

with open('fah/previous.txt', 'r') as file:
  oldScores = list(file.read())

response = requests.get("https://stats.foldingathome.org/api/team/" + TEAMID)
scores = response.json()["donors"]

# Fake data for testing
scores.append({
  "name": "0xB67D4dd9F0E25760dC0f373d79588Bd0169b2335",
  "credit": 69
})
scores.append({
  "name": "0xEaF7B3376173DF8BC0C22Ad6126943cC8353C1Ee",
  "credit": 690
})
scores.append({
  "name": "0x9f27D1Dc4702711D16E9CdeFE5CCA633Edc46154",
  "credit": 420
})

validUsers = []
invalidUsers = []
totalPoints = 0

for user in scores:
  try:
    EthereumAddress(user["name"])
    validUsers.append({
      "address": user["name"],
      "score": user["credit"]
    })
    totalPoints += user["credit"]
  except ValueError:
    invalidUsers.append(user)

with open('fah/previous.txt', 'w') as file:
  file.write(str(validUsers))

# TODO: Figure out difference from last run and this run
# Basically so the score is only for this week

cheemsAmounts = list(map((lambda user: {
  "address": user["address"],
  "cheems": user["score"] / totalPoints * TOTALCHEEMS
}), validUsers))

print(cheemsAmounts)

# print('Invalid users:')
# print(invalidUsers)