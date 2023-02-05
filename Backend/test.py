import requests
import json

url = "http://192.168.222.118:5001/analyze"
test_data_path = "input.json"

with open(test_data_path, 'r') as f:
    data = json.load(f)

response = requests.post(url, json=data)

if response.status_code == 200:
    print(response.json())
else:
    print("Failed to send POST request")