import urllib.request
import json
import sys

bucket = "7eqz38xrdPbpp51xeVYMf2"
sync_key = "leane"
url = f"https://kvdb.io/{bucket}/{sync_key}"

print(f"Testing cloud sync at {url}...")

# 1. Fetch current cloud state
try:
    req = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(req) as resp:
        body = resp.read().decode("utf-8")
        data = json.loads(body)
        print("GET SUCCESS! Found existing cloud profile:")
        print(f"  Streak: {data.get('streak')}")
        print(f"  Last Device: {data.get('device')}")
        print(f"  Updated At: {data.get('updatedAt')}")
        print(f"  Exam History entries: {len(data.get('examHistory', []))}")
        print(f"  Flagged questions: {len(data.get('flaggedQuestions', []))}")
        print(f"  Notebooks: {len(data.get('leaneNotebooks', []))}")
except urllib.error.HTTPError as e:
    print(f"GET returned HTTP {e.code} (might be empty yet): {e.reason}")

# 2. Test saving comprehensive profile
test_profile = {
    "version": "2.0",
    "updatedAt": "2026-11-01T10:50:00Z",
    "device": "Laptop (Windows)",
    "streak": 5,
    "lastLogin": "Sun Nov 01 2026",
    "examHistory": [
        {
            "id": "exam-1730456789000",
            "date": "2026-11-01",
            "score": 88,
            "passed": True,
            "total": 100,
            "correct": 88,
            "timeSpent": 2400
        }
    ],
    "flaggedQuestions": ["dle-gp-001", "dle-pharma-001", "dle-oral-003"],
    "notes": "# Leane's High-Yield Dental Notes 🦷✨\n- Epinephrine limit for cardiac patients: 0.04 mg (2 cartridges)\n- Articaine metabolized by plasma pseudocholinesterase\n- Starling forces: Decreased plasma oncotic pressure leads to interstitial edema.",
    "leaneNotebooks": [
        {
            "id": "nb-1",
            "title": "🔬 General Pathology Pearls & Slides",
            "cover": "#a855f7",
            "template": "lined",
            "pages": [""]
        },
        {
            "id": "nb-4",
            "title": "💜 Angelo's Love Notes & Study Reminders",
            "cover": "#ec4899",
            "template": "dotted",
            "pages": [""]
        }
    ],
    "leaneCurNb": "nb-1",
    "stickies": {
        "leane_sticky_nb-1_0": [
            {"id": 1, "text": "Remember: McCune-Albright triad = polyostotic fibrous dysplasia + cafe-au-lait + precocious puberty", "x": 60, "y": 80, "color": "#fef08a"}
        ]
    },
    "settings": {
        "girlfriendName": "Leane",
        "examDate": "2026-11-22",
        "personalMessage": "Hi Leane! I have watched how hard and dedicated you are every single day. The board exam doesn't stand a chance against you. The license already has your name on it, Dr. Leane! Made with all my love by Angelo 💖",
        "passingScore": 75,
        "theme": "dark"
    }
}

payload_bytes = json.dumps(test_profile).encode("utf-8")
post_req = urllib.request.Request(
    url,
    data=payload_bytes,
    method="POST",
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(post_req) as resp:
    print(f"POST SUCCESS! HTTP Status: {resp.status}")

# 3. Read back and verify all keys
verify_req = urllib.request.Request(url, method="GET")
with urllib.request.urlopen(verify_req) as resp:
    verified_data = json.loads(resp.read().decode("utf-8"))
    assert verified_data["version"] == "2.0"
    assert verified_data["streak"] == 5
    assert len(verified_data["examHistory"]) == 1
    assert len(verified_data["flaggedQuestions"]) == 3
    assert len(verified_data["leaneNotebooks"]) == 2
    assert "leane_sticky_nb-1_0" in verified_data["stickies"]
    print("ALL ASSERTIONS PASSED! Cloud sync data store is 100% operational.")

