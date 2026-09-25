# -*- coding: utf-8 -*-
"""
make_ultimate_app.py
Builds the complete bhumi-insight-v2.html with unmistakable, visual role differentiation:
- 🏛️ Govt Officer: National Command Center, Cabinet Simulation, Raw Disputes, State Evidence Approvals
- 🏫 Research Institution: University Grants Tracker (₹50 Cr Fund), Faculty Submissions, Lab Datasets, MoUs
- 🔬 Academic Researcher: Scholar Studio, Paper Writing, AI Copilot, Annotated Bookmarks, Full Papers
- 📋 State Evidence Reviewer: State Validation Queue, Discrepancy Flagging, Clearance Certificates
- 👥 Citizen / Public User: "Apni Zameen Janein" Portal, FAQs, Abstracts only, Masked Disputes, Locked Features
- ❓ Side-by-Side Role Comparison Matrix ("Fark Samjhein")
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

html_part1 = """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>BHUMI-INSIGHT · National Digital Platform for Land Governance Research & Policy Innovation (PS 26019)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
:root {
  --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'Space Grotesk', monospace;
  
  --bg-app: #08110c;
  --bg-card: #0f1d16;
  --bg-card-hover: #15271e;
  --bg-card-subtle: #13241b;
  --border-card: #1f382a;
  --border-light: #2c4d3b;
  --text-main: #f0fdf4;
  --text-muted: #8fa89b;
  --text-dim: #5c7567;
  
  --gov-green: #10b981;
  --gov-green-dark: #047857;
  --gov-green-glow: rgba(16, 185, 129, 0.2);
  --gov-saffron: #f59e0b;
  --gov-saffron-dark: #d97706;
  --gov-saffron-glow: rgba(245, 158, 11, 0.2);
  --gov-blue: #3b82f6;
  --gov-blue-glow: rgba(59, 130, 246, 0.2);
  --gov-red: #ef4444;
  --gov-purple: #a855f7;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}

[data-theme="light"] {
  --bg-app: #f4f7f4;
  --bg-card: #ffffff;
  --bg-card-hover: #f8faf8;
  --bg-card-subtle: #edf3ee;
  --border-card: #d1ded5;
  --border-light: #b8cbbb;
  --text-main: #13241b;
  --text-muted: #4e6b5a;
  --text-dim: #769382;
  
  --gov-green: #059669;
  --gov-green-dark: #047857;
  --gov-green-glow: rgba(5, 150, 105, 0.15);
  --gov-saffron: #d97706;
  --gov-saffron-dark: #b45309;
  --gov-saffron-glow: rgba(217, 119, 6, 0.15);
  --gov-blue: #2563eb;
  --gov-blue-glow: rgba(37, 99, 235, 0.15);
  --gov-purple: #9333ea;
  
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-main);
  background-color: var(--bg-app);
  color: var(--text-main);
  line-height: 1.5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  transition: background-color 0.25s ease, color 0.25s ease;
}

/* Tricolor Top Bar */
.gov-tricolor-stripe {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #FF9933 0%, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%, #138808 100%);
  position: sticky;
  top: 0;
  z-index: 1001;
}

/* Header */
header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-card);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  position: sticky;
  top: 4px;
  z-index: 1000;
  backdrop-filter: blur(12px);
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
}

.emblem-badge {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #064e3b, #047857);
  border: 1px solid #10b981;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

.brand-titles h1 {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main);
}

.brand-titles h1 span.pill {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--gov-saffron-glow);
  color: var(--gov-saffron);
  border: 1px solid var(--gov-saffron);
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.brand-sub {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* User Profile Badge */
.user-profile-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  padding: 6px 14px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.user-profile-badge:hover {
  border-color: var(--gov-green);
  background: var(--bg-card-hover);
}
.user-avatar { font-size: 16px; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-light);
}
.btn-primary {
  background: var(--gov-green);
  border-color: var(--gov-green);
  color: #022c22;
  font-weight: 700;
}
.btn-primary:hover {
  background: #34d399;
  border-color: #34d399;
  box-shadow: 0 0 14px rgba(16, 185, 129, 0.4);
}
.btn-saffron {
  background: var(--gov-saffron);
  border-color: var(--gov-saffron);
  color: #451a03;
  font-weight: 700;
}
.btn-saffron:hover {
  background: #fbbf24;
  border-color: #fbbf24;
}
.btn-blue {
  background: var(--gov-blue);
  border-color: var(--gov-blue);
  color: #ffffff;
  font-weight: 700;
}
.btn-sm {
  padding: 5px 11px;
  font-size: 12px;
  border-radius: 6px;
}

/* ==========================================================
   PERMANENT PERSONA QUICK-SWITCHER & COMPARATOR BAR
========================================================== */
.persona-quick-bar {
  background: var(--bg-card-subtle);
  border-bottom: 1px solid var(--border-card);
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.persona-switch-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.persona-btn {
  padding: 6px 13px;
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.persona-btn:hover {
  color: var(--text-main);
  border-color: var(--border-light);
  background: var(--bg-card-hover);
}
.persona-btn.active-role-btn {
  background: var(--gov-green);
  color: #022c22;
  border-color: var(--gov-green);
  font-weight: 800;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}
.persona-btn.active-role-btn.saffron {
  background: var(--gov-saffron);
  color: #451a03;
  border-color: var(--gov-saffron);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
.persona-btn.active-role-btn.blue {
  background: var(--gov-blue);
  color: #ffffff;
  border-color: var(--gov-blue);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}
.persona-btn.active-role-btn.purple {
  background: var(--gov-purple);
  color: #ffffff;
  border-color: var(--gov-purple);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
}
.persona-btn.active-role-btn.gray {
  background: #4b5563;
  color: #ffffff;
  border-color: #6b7280;
}

/* Security Clearance Sub-Banner */
.role-clearance-bar {
  background: rgba(16, 185, 129, 0.08);
  border-bottom: 1px solid var(--border-card);
  padding: 6px 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.clearance-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}

/* Navigation Tabs */
nav.app-nav {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-card);
  padding: 0 24px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}
nav.app-nav::-webkit-scrollbar { display: none; }

.nav-tab {
  padding: 13px 18px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.nav-tab:hover {
  color: var(--text-main);
  background: var(--bg-card-hover);
}
.nav-tab[aria-selected="true"] {
  color: var(--gov-green);
  border-bottom-color: var(--gov-green);
  background: var(--gov-green-glow);
  font-weight: 700;
}
.nav-badge {
  font-size: 10.5px;
  padding: 1px 7px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  color: var(--text-muted);
}
.nav-tab[aria-selected="true"] .nav-badge {
  background: var(--gov-green);
  color: #022c22;
  border-color: var(--gov-green);
  font-weight: 800;
}

/* Main Workspace */
main#workspace {
  flex: 1;
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* Card Styles */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.card:hover { border-color: var(--border-light); }
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}
.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
}
.card-subtitle { font-size: 12.5px; color: var(--text-muted); }

/* Grids */
.grid-2 {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 20px;
}
@media (max-width: 1080px) { .grid-2 { grid-template-columns: 1fr; } }

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

/* KPI Cards */
.kpi-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 18px;
  position: relative;
  overflow: hidden;
}
.kpi-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: var(--gov-green);
}
.kpi-card.saffron::before { background: var(--gov-saffron); }
.kpi-card.blue::before { background: var(--gov-blue); }
.kpi-card.red::before { background: var(--gov-red); }
.kpi-card.purple::before { background: var(--gov-purple); }

.kpi-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}
.kpi-val {
  font-size: 30px;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: 6px;
}
.kpi-sub { font-size: 12px; color: var(--text-dim); }

/* Tags */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  white-space: nowrap;
}
.tag-verified {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.tag-saffron {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.tag-blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.tag-purple {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.3);
}
.tag-gray {
  background: var(--bg-card-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-card);
}

/* Map Section Styles */
.map-viewport-wrapper {
  position: relative;
  height: 620px;
  background: radial-gradient(circle at center, #102419 0%, #08110c 100%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-card);
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.6);
}
[data-theme="light"] .map-viewport-wrapper {
  background: radial-gradient(circle at center, #d8e6db 0%, #eaf1ec 100%);
}

#svg-map-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#india-svg-map {
  width: 100%;
  height: 100%;
  max-height: 600px;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.5));
}

.map-state-path {
  fill: #163625;
  stroke: #2e6648;
  stroke-width: 8;
  cursor: pointer;
  transition: all 0.25s ease;
  vector-effect: non-scaling-stroke;
}
.map-state-path:hover {
  fill: #2ecc71 !important;
  stroke: #ffffff;
  stroke-width: 16;
  filter: drop-shadow(0 0 12px rgba(46, 204, 113, 0.8));
}
.map-state-path.selected {
  fill: #f59e0b !important;
  stroke: #ffffff;
  stroke-width: 24;
  filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.9));
}

#leaflet-map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  z-index: 10;
  display: none;
}

.map-floating-controls {
  position: absolute;
  top: 16px; left: 16px;
  z-index: 20;
  display: flex; gap: 8px; flex-wrap: wrap;
  max-width: 90%;
}
.map-floating-legend {
  position: absolute;
  bottom: 16px; left: 16px;
  z-index: 20;
  background: rgba(15, 29, 22, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-card);
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-size: 11.5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
[data-theme="light"] .map-floating-legend { background: rgba(255, 255, 255, 0.88); }
.legend-bar {
  display: flex; height: 8px; width: 160px;
  border-radius: 4px; overflow: hidden; margin-top: 2px;
}

#map-hover-tooltip {
  position: absolute;
  pointer-events: none;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  display: none;
  min-width: 180px;
}

/* Detail Drawer */
.state-detail-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 620px;
  overflow-y: auto;
  padding-right: 4px;
}
.state-detail-panel::-webkit-scrollbar { width: 5px; }
.state-detail-panel::-webkit-scrollbar-thumb { background: var(--border-card); border-radius: 4px; }

.stat-bar-group { margin: 8px 0; }
.stat-bar-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.stat-bar-track {
  height: 8px;
  background: var(--bg-card-subtle);
  border-radius: 4px;
  overflow: hidden;
}
.stat-bar-fill {
  height: 100%;
  background: var(--gov-green);
  border-radius: 4px;
  transition: width 0.5s ease;
}
.stat-bar-fill.saffron { background: var(--gov-saffron); }
.stat-bar-fill.red { background: var(--gov-red); }

/* District Chips */
.chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}
.chip {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.chip:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-light);
}
.chip.active {
  background: var(--gov-green);
  color: #022c22;
  border-color: var(--gov-green);
  font-weight: 700;
}

/* Knowledge Hub Styles */
.search-filter-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.search-input-wrapper {
  flex: 1; min-width: 260px;
  position: relative;
}
.search-input-wrapper input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  font-size: 13.5px;
  font-family: inherit;
}
.search-input-wrapper input:focus {
  outline: 2px solid var(--gov-green);
  border-color: transparent;
}
.search-icon {
  position: absolute;
  left: 12px; top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  font-size: 14px;
}

.paper-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.2s ease;
  position: relative;
}
.paper-card:hover {
  transform: translateY(-2px);
  border-color: var(--gov-green);
  box-shadow: var(--shadow-md);
}
.paper-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.paper-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-main);
}
.paper-agency {
  font-size: 12px;
  font-weight: 600;
  color: var(--gov-green);
  margin-top: 3px;
}
.paper-abstract {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Locked Overlay for Public User */
.locked-preview-overlay {
  background: rgba(245, 158, 11, 0.08);
  border: 1px dashed rgba(245, 158, 11, 0.4);
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  margin-top: 14px;
}

/* Security Restriction Card */
.restricted-zone-card {
  text-align: center;
  padding: 60px 20px;
  max-width: 640px;
  margin: 40px auto;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* AI Copilot */
.copilot-container {
  display: grid;
  grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
  gap: 20px;
  height: 680px;
}
@media (max-width: 900px) { .copilot-container { grid-template-columns: 1fr; height: auto; } }

.copilot-sidebar {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}
.copilot-chat-window {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.chat-bubble {
  max-width: 85%;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 13.5px;
  line-height: 1.55;
}
.chat-bubble.bot {
  align-self: flex-start;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  color: var(--text-main);
}
.chat-bubble.user {
  align-self: flex-end;
  background: var(--gov-green-dark);
  color: #fff;
  border: 1px solid var(--gov-green);
}
.chat-input-bar {
  padding: 14px 20px;
  background: var(--bg-card-subtle);
  border-top: 1px solid var(--border-card);
  display: flex;
  gap: 10px;
}
.chat-input-bar input {
  flex: 1;
  padding: 10px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  font-size: 13.5px;
  font-family: inherit;
}
.chat-input-bar input:focus { outline: 2px solid var(--gov-green); }

/* Simulation */
.sim-slider-row { display: flex; flex-direction: column; gap: 6px; }
.sim-slider-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; }
input[type="range"] { width: 100%; accent-color: var(--gov-green); cursor: pointer; }

/* Modals */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  width: 100%; max-width: 820px; max-height: 85vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes modalPop {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.modal-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-card);
  display: flex; justify-content: space-between; align-items: center;
}
.modal-body {
  padding: 24px; overflow-y: auto; font-size: 14px; line-height: 1.6;
}
.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid var(--border-card);
  display: flex; justify-content: flex-end; gap: 10px;
  background: var(--bg-card-subtle);
}

/* Persona Cards */
.persona-card {
  padding: 14px;
  border: 1px solid var(--border-card);
  background: var(--bg-card-subtle);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.persona-card:hover {
  border-color: var(--gov-green);
  background: var(--bg-card-hover);
  transform: translateY(-1px);
}

/* State Evidence Card */
.evidence-card {
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 18px;
  display: flex; flex-direction: column; gap: 10px;
}

#toast {
  position: fixed; bottom: 24px; right: 24px;
  background: var(--bg-card);
  border: 1px solid var(--gov-green);
  box-shadow: var(--shadow-lg);
  color: var(--text-main);
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 13.5px; font-weight: 600;
  z-index: 3000; display: none;
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

footer {
  margin-top: auto;
  background: var(--bg-card);
  border-top: 1px solid var(--border-card);
  padding: 20px 24px;
  font-size: 12px; color: var(--text-muted);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
}
</style>
</head>
<body>

<div class="gov-tricolor-stripe"></div>

<!-- Top Persona Quick-Switcher Bar -->
<div class="persona-quick-bar">
  <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
    <span style="font-size:11.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">
      SWITCH OPERATIONAL WORKSPACE:
    </span>
    <div class="persona-switch-buttons" id="persona-switch-buttons-container">
      <button class="persona-btn active-role-btn" id="btn-role-Officer" onclick="switchRole('Officer')">
        🏛️ Govt Officer (Full Access)
      </button>
      <button class="persona-btn" id="btn-role-Institution" onclick="switchRole('Institution')">
        🏫 Research Institution (Grants)
      </button>
      <button class="persona-btn" id="btn-role-Researcher" onclick="switchRole('Researcher')">
        🔬 Academic Researcher (Studio & AI)
      </button>
      <button class="persona-btn" id="btn-role-Reviewer" onclick="switchRole('Reviewer')">
        📋 State Reviewer (Clearance)
      </button>
      <button class="persona-btn" id="btn-role-Public" onclick="switchRole('Public')">
        👥 Citizen (Limited Public Data)
      </button>
    </div>
  </div>
  
  <button class="btn btn-sm btn-saffron" onclick="openRoleComparisonModal()">
    ❓ Compare All Roles (Fark Dekhein)
  </button>
</div>

<!-- Header -->
<header>
  <div class="brand-wrapper">
    <div class="emblem-badge">🇮🇳</div>
    <div class="brand-titles">
      <h1>BHUMI-INSIGHT <span class="pill" id="portal-tier-pill">Executive Portal</span></h1>
      <div class="brand-sub">Department of Land Resources (DoLR) · Ministry of Rural Development, Govt of India</div>
    </div>
  </div>
  
  <div class="header-actions">
    <div id="auth-header-container"></div>
    
    <button class="btn btn-sm" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Dark/Light Mode">
      <span id="theme-icon">☀️ Light</span>
    </button>
    
    <div class="tag tag-verified" style="display:flex; align-items:center; gap:4px;">
      <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
      <span>7/7 APIs Online</span>
    </div>
  </div>
</header>

<!-- Role Clearance Bar -->
<div class="role-clearance-bar">
  <div style="display:flex; align-items:center; gap:8px;">
    <span class="clearance-pill" id="clearance-pill-tag">Level 4: National Executive</span>
    <span style="color:var(--text-muted);" id="clearance-summary-text">Loading clearance...</span>
  </div>
  <div id="role-extra-action">
    <!-- Extra role link -->
  </div>
</div>

<!-- Dynamic Navigation Tabs -->
<nav class="app-nav" id="app-nav-bar" role="tablist">
  <!-- Rendered dynamically by renderTabNav() for each role -->
</nav>

<!-- Main Dynamic Content Workspace -->
<main id="workspace">
  <!-- Content injected via JavaScript -->
</main>

<!-- Universal Document Reader Modal -->
<div class="modal-overlay" id="paper-modal">
  <div class="modal-box">
    <div class="modal-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="tag tag-verified" id="modal-tag">Research Paper</span>
        <span class="tag tag-saffron" id="modal-year">2023</span>
      </div>
      <button class="btn btn-sm" onclick="closeModal('paper-modal')">✕ Close</button>
    </div>
    <div class="modal-body" id="modal-body-content"></div>
    <div class="modal-footer" id="modal-footer-actions"></div>
  </div>
</div>

<!-- Role Comparison Matrix Modal ("Fark Samjhein") -->
<div class="modal-overlay" id="comparison-modal">
  <div class="modal-box" style="max-width: 980px;">
    <div class="modal-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:22px;">🔍</span>
        <h3 style="font-size:18px; font-weight:800;">Role Comparison & Security Clearance Matrix (Fark Samjhein)</h3>
      </div>
      <button class="btn btn-sm" onclick="closeModal('comparison-modal')">✕ Close</button>
    </div>
    <div class="modal-body" style="padding:16px;">
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
        Har persona ke liye alag workspace, alag permissions, aur alag data visibility configured hai:
      </p>
      
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-card); text-align:left; background:var(--bg-card-subtle);">
              <th style="padding:10px 8px;">Functional Capability</th>
              <th style="padding:10px 8px; color:var(--gov-green);">🏛️ Govt Officer</th>
              <th style="padding:10px 8px; color:var(--gov-blue);">🏫 Institution / Uni</th>
              <th style="padding:10px 8px; color:var(--gov-purple);">🔬 Researcher</th>
              <th style="padding:10px 8px; color:var(--gov-saffron);">📋 Evidence Reviewer</th>
              <th style="padding:10px 8px; color:var(--text-dim);">👥 Citizen (Public)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">Security Clearance Level</td>
              <td><span class="tag tag-verified">Level 4 Full Access</span></td>
              <td><span class="tag tag-blue">Level 3 Institutional</span></td>
              <td><span class="tag tag-purple">Level 2 Researcher</span></td>
              <td><span class="tag tag-saffron">Level 3 Validation</span></td>
              <td><span class="tag tag-gray">Level 1 Open Public</span></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">Dedicated Landing View</td>
              <td><b>Executive Command Center</b></td>
              <td><b>University Grants & Labs</b></td>
              <td><b>Scholar Research Studio</b></td>
              <td><b>State Clearance Board</b></td>
              <td><b>Citizen Information Desk</b></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">GIS & Cadastral Dispute Map</td>
              <td>✔ Full Raw Heatmaps + Disputes</td>
              <td>✔ Geospatial Research Layers</td>
              <td>✔ Academic Parcel Search</td>
              <td>✔ Cadastral Audit Overlays</td>
              <td>🔒 <b>Dispute Score Masked</b></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">Research Papers Repository</td>
              <td>✔ Full Text + Policy Briefs</td>
              <td>✔ Full Text + Bulk Datasets</td>
              <td>✔ Full Text + BibTeX Citations</td>
              <td>✔ Full Text + Statutory Briefs</td>
              <td>🔒 <b>Abstract ONLY (Findings Locked)</b></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">Policy Simulation Sandbox</td>
              <td>✔ <b>Unrestricted Full Access</b></td>
              <td>🔒 Locked</td>
              <td>🔒 Locked</td>
              <td>✔ Review Scenario Mode</td>
              <td>🔒 <b>Locked (Access Denied)</b></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">State Evidence Pack Export</td>
              <td>✔ <b>Official DoLR Briefs</b></td>
              <td>✔ Research Dossier</td>
              <td>✔ Annotated Dossier</td>
              <td>✔ Statutory Clearances</td>
              <td>🔒 <b>Locked (Officer Only)</b></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:9px 8px; font-weight:700;">DILRMP 3.0 ₹50 Cr Grants</td>
              <td>✔ Grant Oversight & Approval</td>
              <td>✔ <b>Apply & Track University Grants</b></td>
              <td>✔ View Grant Calls</td>
              <td>✔ Review Grant Deliverables</td>
              <td>🔒 Locked (Institution Only)</td>
            </tr>
            <tr>
              <td style="padding:9px 8px; font-weight:700;">Root System Admin & API</td>
              <td>✔ <b>Full Control & Audit Log</b></td>
              <td>🔒 Locked</td>
              <td>🔒 Locked</td>
              <td>🔒 Locked</td>
              <td>🔒 Locked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Floating Toast -->
<div id="toast">Notification message</div>

<footer>
  <div>
    <strong>BHUMI-INSIGHT · SIH 2026 Problem Statement 26019</strong> | Department of Land Resources, Ministry of Rural Development, New Delhi.
  </div>
  <div style="display:flex; gap:14px;">
    <span>National Data Sovereignty: MeghRaj NIC Cloud</span>
    <span>•</span>
    <span>DPDP Act 2023 Compliant</span>
  </div>
</footer>

<script>
window.BHUMI_STATES = """ + states_json + """;
window.BHUMI_PAPERS = """ + papers_json + """;
window.BHUMI_AI = """ + ai_json + """;
window.BHUMI_REVIEWS = """ + reviews_json + """;
"""

with open('bhumi_ultimate_part1.html', 'w', encoding='utf-8') as f:
    f.write(html_part1)

print("Ultimate part 1 written successfully!")
