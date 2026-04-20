import requests

url = "http://127.0.0.1:5000/api/simulate"
payload = {
    "weights": [10, 20, 30],
    "values": [60, 100, 120],
    "capacity": 50
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:\n", response.json())
except Exception as e:
    print("Error:", e)
