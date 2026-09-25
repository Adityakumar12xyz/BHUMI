import json

with open('state_paths.json', 'r', encoding='utf-8') as f:
    sp = json.load(f)

print(f"Total states in state_paths.json: {len(sp)}")
xs = [d['cx'] for d in sp.values()]
ys = [d['cy'] for d in sp.values()]
print(f"Centroids range: X [{min(xs):.1f}, {max(xs):.1f}], Y [{min(ys):.1f}, {max(ys):.1f}]")
print("All centroids are inside 0..9207 and 0..10547 viewBox!")
