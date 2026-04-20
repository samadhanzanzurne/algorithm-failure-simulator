import requests
import json

url = "http://127.0.0.1:5000/api/stress-test"
payload = {
    "problem_type": "coin_change",
    "dataset_size": 100
}

try:
    response = requests.post(url, json=payload)
    print("Status:", response.status_code)
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(e)
