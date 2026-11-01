import urllib.request
import json

bucket = "7eqz38xrdPbpp51xeVYMf2"
key = "dr_leane_dle_profile"
url = f"https://kvdb.io/{bucket}/{key}"

sample_payload = {
    "version": "1.0",
    "updatedAt": "2026-11-01T10:45:00Z",
    "device": "Laptop",
    "streak": 5,
    "lastLogin": "Sun Nov 01 2026",
    "examHistory": [
        {"id": "exam-1", "date": "2026-10-31", "score": 85, "passed": True, "total": 100, "correct": 85}
    ],
    "flaggedQuestions": ["dle-gp-001", "dle-pharma-001"],
    "notes": "Leane's Board Exam Notes: Remember Starling forces and ICDAS codes!",
    "leaneNotebooks": [{"id": "nb-1", "title": "Pathology Pearls", "pages": []}],
    "settings": {
        "girlfriendName": "Leane",
        "examDate": "2026-11-22",
        "personalMessage": "You are going to top the DLE board exam, Dr. Leane! 🦷💜",
        "passingScore": 75
    }
}

data = json.dumps(sample_payload).encode("utf-8")
req = urllib.request.Request(url, data=data, method="POST", headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    print("Write status:", resp.status)

req2 = urllib.request.Request(url, method="GET")
with urllib.request.urlopen(req2) as resp:
    content = resp.read().decode("utf-8")
    loaded = json.loads(content)
    print("Read success! Device:", loaded["device"], "Streak:", loaded["streak"], "Flagged:", len(loaded["flaggedQuestions"]))

