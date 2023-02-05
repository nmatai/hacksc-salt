import requests
import json

url = "http://10.25.210.245:5001/analyze"
test_data_path = "input.json"

with open(test_data_path, 'r') as f:
    data = json.load(f)

response = requests.post(url, json=data)

if response.status_code == 200:
    print(response.json())
else:
    print("Failed to send POST request")