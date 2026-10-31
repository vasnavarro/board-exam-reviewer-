import urllib.request, json
try:
    req = urllib.request.Request("https://api.github.com/users/vasnavarro/repos", headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read())
    print("Repos for vasnavarro:")
    for r in data:
        print(f" - {r['name']} ({r['html_url']})")
except Exception as e:
    print(f"Error: {e}")

