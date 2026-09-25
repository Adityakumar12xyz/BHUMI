# -*- coding: utf-8 -*-
"""
compile_complete_platform.py
Compiles the enhanced bhumi-insight-v2.html with:
1. Multi-tier Login & Government SSO Simulator (MeriPehchan / Aadhaar OTP + 1-Click Persona)
2. Government Officer (DoLR / State Revenue) Full Access
3. State Evidence Reviewer Portal & Review Workflows
4. Research Institution / University Grants & Working Groups
5. Academic Researcher Full Papers & AI Copilot
6. Citizen / Public User Strictly Limited Data (Masked dispute risks, abstracts only, locked sandbox)
"""
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

for code, sm in STATES_META.items():
    if code in state_paths:
        sm['path_d'] = state_paths[code]['d']
        sm['cx'] = state_paths[code]['cx']
        sm['cy'] = state_paths[code]['cy']
    else:
        sm['path_d'] = ""
        sm['cx'] = 0
        sm['cy'] = 0

STATE_EVIDENCE_REVIEWS = [
    {
        "id": "EV-UP-2026-01",
        "state": "Uttar Pradesh",
        "district": "Bundelkhand (Banda & Mahoba)",
        "project": "SVAMITVA Abadi Drone Survey & Dryland Cadastre Audit",
        "submitted_by": "UP Revenue Council & Survey Directorate",
        "date": "2026-09-18",
        "status": "Pending Review",
        "priority": "High",
        "summary": "Field verification report on 420 Gram Panchayats. Reconciles drone parcel boundaries with legacy 1952 settlement maps. Identifies 142 localized boundary disputes resolved through village participatory camps.",
        "metrics": "52,400 Property Cards Generated · 99.2% Ground Accuracy · 0.8% Survey Appeals",
        "discrepancies": "28 plots overlapping with irrigation canal buffer reserve requiring revenue demarcation correction."
    },
    {
        "id": "EV-MH-2026-02",
        "state": "Maharashtra",
        "district": "Pune (Hinjawadi IT Corridor)",
        "project": "3D Cadastre High-Rise Property Titling Volumetric Audit",
        "submitted_by": "Settlement Commissioner, Maharashtra & COEP",
        "date": "2026-09-20",
        "status": "Clearance Granted",
        "priority": "Critical",
        "summary": "BIM and LiDAR integration trial across 34 high-rise commercial and residential towers. Generates 3D spatial parcels with legal volumetric title units registered on Mahabhulekh.",
        "metrics": "3,400 Vertical Apartment Units · Sub-cm LiDAR Accuracy · 100% Tax Identification Match",
        "discrepancies": "Nil. Validated by Chief Town Planner and State Land Registration Inspector."
    },
    {
        "id": "EV-GJ-2026-03",
        "state": "Gujarat",
        "district": "Kutch & Banaskantha",
        "project": "AnyRoR Modern Resurvey Farmer Objection Resolution Shibir Report",
        "submitted_by": "Directorate of Land Records, Gandhinagar",
        "date": "2026-09-15",
        "status": "Under Review",
        "priority": "Medium",
        "summary": "Second-phase camp verification covering 310 agricultural villages. Rectifies 4,800 farmer objection petitions regarding road buffer encroachments and saline tract boundaries.",
        "metrics": "1.2 Lakh Hectares Audited · 94.6% Citizen Satisfaction in Shibir Validation",
        "discrepancies": "12 village boundary tri-junctions (Chauhadis) requiring joint surveyor DGPS confirmation."
    },
    {
        "id": "EV-OD-2026-04",
        "state": "Odisha",
        "district": "Mayurbhanj & Koraput",
        "project": "Forest Rights Act (FRA) CFR Title Spatial Demarcation Audit",
        "submitted_by": "ST & SC Development Dept & Odisha Space Applications Centre (ORSAC)",
        "date": "2026-09-22",
        "status": "Clearance Granted",
        "priority": "High",
        "summary": "Participatory DGPS boundary survey of 180 Gram Sabha Community Forest Resource (CFR) titles. Digitally overlays CFR polygons onto Bhulekh Odisha cadastral maps to prevent linear infrastructure overlaps.",
        "metrics": "45,000 Hectares Forest Cadastre · 180 Gram Sabhas Biometrically Validated",
        "discrepancies": "Resolved 3 minor boundary overlaps with Forest Department Reserved Forest beats."
    }
]

states_json = json.dumps(STATES_META)
papers_json = json.dumps(RESEARCH_PAPERS)
ai_json = json.dumps(AI_COPILOT_KNOWLEDGE)
reviews_json = json.dumps(STATE_EVIDENCE_REVIEWS)

print("Data structures ready!")
