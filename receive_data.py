import requests

url = "https://rapidapi.p.rapidapi.com/warzone/Flyplass/psn"

headers = {
    'x-rapidapi-host': "call-of-duty-modern-warfare.p.rapidapi.com",
    'x-rapidapi-key': "4cfa8dde81msh47a98d07c3bdc5bp1ebfcejsnee06d0ca5e7a"
    }

response = requests.request("GET", url, headers=headers)

print(response.text)