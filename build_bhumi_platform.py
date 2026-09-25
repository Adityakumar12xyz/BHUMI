import json
import os

print("Starting build of BHUMI-INSIGHT v2 Platform...")

with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

print(f"Loaded {len(state_paths)} states.")
