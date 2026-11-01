import urllib.request
import json

bucket = "7eqz38xrdPbpp51xeVYMf2"
url = f"https://kvdb.io/{bucket}/test_key"
data = json.dumps({"streak": 7, "name": "Leane", "mockScore": 88}).encode("utf-8")

req = urllib.request.Request(url, data=data, method="POST")
with urllib.request.urlopen(req) as resp:
    print("Write status:", resp.status)

req2 = urllib.request.Request(url, method="GET")
with urllib.request.urlopen(req2) as resp:
    content = resp.read().decode("utf-8")
    print("Read content:", content)
