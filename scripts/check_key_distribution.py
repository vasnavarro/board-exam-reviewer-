import json
from collections import Counter

from generate_all_verified_rationales import MASTER_KEYS

counts = Counter(MASTER_KEYS.values())
print("Letter distribution across 847 verified questions:")
for k, v in sorted(counts.items()):
    print(f"  {k}: {v} ({v/len(MASTER_KEYS)*100:.1f}%)")
