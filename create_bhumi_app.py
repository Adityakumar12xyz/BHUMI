# -*- coding: utf-8 -*-
"""
create_bhumi_app.py
Generates the complete bhumi-insight-v2.html application
"""
import json

# Load state paths
with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

# Load state metadata
with open('step_metadata.py', 'r', encoding='utf-8') as f:
    meta_ns = {}
    exec(f.read(), meta_ns)
    STATES_META = meta_ns['STATES_META']

# Load papers and AI knowledge
with open('assemble_data.py', 'r', encoding='utf-8') as f:
    data_ns = {}
    exec(f.read(), data_ns)
    RESEARCH_PAPERS = data_ns['RESEARCH_PAPERS']
    AI_COPILOT_KNOWLEDGE = data_ns['AI_COPILOT_KNOWLEDGE']

# Merge state paths
for code, sm in STATES_META.items():
    if code in state_paths:
        sm['path_d'] = state_paths[code]['d']
        sm['cx'] = state_paths[code]['cx']
        sm['cy'] = state_paths[code]['cy']
    else:
        sm['path_d'] = ""
        sm['cx'] = 0
        sm['cy'] = 0

print("Generating HTML content...")
