import urllib.request
import json
from datetime import datetime

bucket = "7eqz38xrdPbpp51xeVYMf2"
sync_key = "leane"
url = f"https://kvdb.io/{bucket}/{sync_key}"

INITIAL_NOTEBOOKS = [
  {
    "id": "nb-1",
    "title": "🔬 General Pathology & Microbiology",
    "cover": "#a855f7",
    "template": "lined",
    "pages": [""]
  },
  {
    "id": "nb-2",
    "title": "💊 Pharmacology & Dental Anesthesia",
    "cover": "#8b5cf6",
    "template": "grid",
    "pages": [""]
  },
  {
    "id": "nb-3",
    "title": "📐 Odontogram Drills & Cavity Preps",
    "cover": "#06b6d4",
    "template": "odontogram",
    "pages": [""]
  },
  {
    "id": "nb-4",
    "title": "💜 Angelo's Love Notes & Study Reminders",
    "cover": "#ec4899",
    "template": "dotted",
    "pages": [""]
  }
]

fresh_profile = {
    "version": "2.0",
    "updatedAt": datetime.utcnow().isoformat() + "Z",
    "device": "Laptop",
    "streak": 1,
    "lastLogin": datetime.utcnow().strftime("%a %b %d %Y"),
    "examHistory": [],
    "flaggedQuestions": [],
    "notes": "", # will use DEFAULT_NOTES
    "leaneNotebooks": INITIAL_NOTEBOOKS,
    "leaneCurNb": "nb-1",
    "stickies": {},
    "redeemedRewards": {},
    "settings": {
        "girlfriendName": "Leane",
        "examDate": "2026-11-22",
        "personalMessage": "Hi Leane! I have watched how hard and dedicated you are every single day. The board exam doesn't stand a chance against you. The license already has your name on it, Dr. Leane! Made with all my love by Angelo 💖",
        "passingScore": 75,
        "theme": "dark"
    }
}

payload = json.dumps(fresh_profile).encode("utf-8")
req = urllib.request.Request(
    url,
    data=payload,
    method="POST",
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(req) as resp:
    print(f"Cloud profile reset successfully! HTTP {resp.status}")

# Verify GET
verify_req = urllib.request.Request(url, method="GET")
with urllib.request.urlopen(verify_req) as resp:
    data = json.loads(resp.read().decode("utf-8"))
    print("Verification:")
    print(f"  Streak: {data['streak']}")
    print(f"  Exam History: {len(data['examHistory'])}")
    print(f"  Flagged: {len(data['flaggedQuestions'])}")
    print(f"  Redeemed Rewards: {len(data['redeemedRewards'])}")
    print(f"  Notebooks: {len(data['leaneNotebooks'])}")
