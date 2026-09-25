import json
import os

print("Building complete BHUMI-INSIGHT v2 platform...")

with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

print(f"Loaded {len(state_paths)} SVG state paths!")
