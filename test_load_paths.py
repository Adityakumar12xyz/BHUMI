import json
import os

# Load the processed SVG state paths
with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

print(f"Loaded {len(state_paths)} state SVG paths!")
