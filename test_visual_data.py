# -*- coding: utf-8 -*-
import json

with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

with open('step_metadata.py', 'r', encoding='utf-8') as f:
    meta_ns = {}
    exec(f.read(), meta_ns)
    STATES_META = meta_ns['STATES_META']

with open('assemble_data.py', 'r', encoding='utf-8') as f:
    data_ns = {}
    exec(f.read(), data_ns)
    RESEARCH_PAPERS = data_ns['RESEARCH_PAPERS']
    AI_COPILOT_KNOWLEDGE = data_ns['AI_COPILOT_KNOWLEDGE']

with open('test_step_rbac.py', 'r', encoding='utf-8') as f:
    rbac_ns = {}
    exec(f.read(), rbac_ns)
    STATE_EVIDENCE_REVIEWS = rbac_ns['STATE_EVIDENCE_REVIEWS']

for code, sm in STATES_META.items():
    if code in state_paths:
        sm['path_d'] = state_paths[code]['d']
        sm['cx'] = state_paths[code]['cx']
        sm['cy'] = state_paths[code]['cy']
    else:
        sm['path_d'] = ""
        sm['cx'] = 0
        sm['cy'] = 0

states_json = json.dumps(STATES_META)
papers_json = json.dumps(RESEARCH_PAPERS)
ai_json = json.dumps(AI_COPILOT_KNOWLEDGE)
reviews_json = json.dumps(STATE_EVIDENCE_REVIEWS)

print("Data loaded successfully! Writing build script...")
