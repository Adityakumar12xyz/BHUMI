<!DOCTYPE html>
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
  
  /* Modern Dark Palette (Default) */
  --bg-app: #08110c;
  --bg-card: #0f1d16;
  --bg-card-hover: #15271e;
  --bg-card-subtle: #13241b;
  --border-card: #1f382a;
  --border-light: #2c4d3b;
  --text-main: #f0fdf4;
  --text-muted: #8fa89b;
  --text-dim: #5c7567;
  
  /* Government & Brand Identity Colors */
  --gov-green: #10b981;
  --gov-green-dark: #047857;
  --gov-green-glow: rgba(16, 185, 129, 0.2);
  --gov-saffron: #f59e0b;
  --gov-saffron-dark: #d97706;
  --gov-saffron-glow: rgba(245, 158, 11, 0.2);
  --gov-blue: #3b82f6;
  --gov-blue-glow: rgba(59, 130, 246, 0.2);
  --gov-red: #ef4444;
  --gov-ashoka: #1e3a8a;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(16, 185, 129, 0.25);
  
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
  
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08);
  --shadow-glow: 0 0 15px rgba(5, 150, 105, 0.15);
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

.role-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.role-badge:hover {
  border-color: var(--gov-green);
  background: var(--bg-card-hover);
}
.role-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gov-green);
  box-shadow: 0 0 8px var(--gov-green);
}

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
.btn-sm {
  padding: 5px 11px;
  font-size: 12px;
  border-radius: 6px;
}

/* Announcement Top Banner */
.gov-notice-banner {
  background: linear-gradient(90deg, #064e3b, #0f2c1d);
  border-bottom: 1px solid #1f4e35;
  color: #d1fae5;
  padding: 6px 24px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.gov-notice-banner a {
  color: #6ee7b7;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
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

/* Main Container */
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
.card:hover {
  border-color: var(--border-light);
}
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
.card-subtitle {
  font-size: 12.5px;
  color: var(--text-muted);
}

/* Grid Layouts */
.grid-2 {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 20px;
}
@media (max-width: 1080px) {
  .grid-2 { grid-template-columns: 1fr; }
}

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

/* KPI Metric Cards */
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
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gov-green);
}
.kpi-card.saffron::before { background: var(--gov-saffron); }
.kpi-card.blue::before { background: var(--gov-blue); }
.kpi-card.red::before { background: var(--gov-red); }

.kpi-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}
.kpi-val {
  font-size: 32px;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: 6px;
}
.kpi-sub {
  font-size: 12px;
  color: var(--text-dim);
}

/* Tag Pills */
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
  top: 0;
  left: 0;
  z-index: 10;
  display: none;
}

.map-floating-controls {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 20;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: 90%;
}
.map-floating-legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
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
[data-theme="light"] .map-floating-legend {
  background: rgba(255, 255, 255, 0.88);
}
.legend-bar {
  display: flex;
  height: 8px;
  width: 160px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 2px;
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

/* Detail Drawer / Side Panel */
.state-detail-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 620px;
  overflow-y: auto;
  padding-right: 4px;
}
.state-detail-panel::-webkit-scrollbar {
  width: 5px;
}
.state-detail-panel::-webkit-scrollbar-thumb {
  background: var(--border-card);
  border-radius: 4px;
}

.stat-bar-group {
  margin: 8px 0;
}
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

/* Knowledge Hub Repository Cards */
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
  flex: 1;
  min-width: 260px;
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
  left: 12px;
  top: 50%;
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

/* AI Copilot Section */
.copilot-container {
  display: grid;
  grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
  gap: 20px;
  height: 680px;
}
@media (max-width: 900px) {
  .copilot-container { grid-template-columns: 1fr; height: auto; }
}

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
.chat-input-bar input:focus {
  outline: 2px solid var(--gov-green);
}

/* Simulation Section */
.sim-controls-panel {
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.sim-slider-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sim-slider-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
}
input[type="range"] {
  width: 100%;
  accent-color: var(--gov-green);
  cursor: pointer;
}

/* Modal Reader Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-overlay.open {
  display: flex;
}
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 820px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-body {
  padding: 24px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
}
.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid var(--border-card);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: var(--bg-card-subtle);
}

/* Footer */
footer {
  margin-top: auto;
  background: var(--bg-card);
  border-top: 1px solid var(--border-card);
  padding: 20px 24px;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
</head>
<body>

<div class="gov-tricolor-stripe"></div>

<!-- Announcement Bar -->
<div class="gov-notice-banner">
  <div>
    <strong>राष्ट्रीय भूमि ज्ञान मंच (BHUMI-INSIGHT):</strong> Smart India Hackathon 2026 · Problem Statement 26019 · Ministry of Rural Development & DoLR
  </div>
  <div>
    <span>National DILRMP 3.0 Applied Research Call open: </span>
    <a onclick="switchTab('innovate')">View ₹50 Cr Research Grants →</a>
  </div>
</div>

<!-- Header -->
<header>
  <div class="brand-wrapper">
    <div class="emblem-badge">🇮🇳</div>
    <div class="brand-titles">
      <h1>BHUMI-INSIGHT <span class="pill">National Portal</span></h1>
      <div class="brand-sub">Department of Land Resources (DoLR) · Ministry of Rural Development, Govt of India</div>
    </div>
  </div>
  
  <div class="header-actions">
    <div class="role-badge" id="role-selector-btn" onclick="openRoleModal()">
      <span class="role-dot"></span>
      <span id="current-role-label">Officer: S. Sharma (DoLR)</span>
      <span style="font-size: 10px; opacity: 0.6;">▼</span>
    </div>
    
    <button class="btn btn-sm" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Dark/Light Mode">
      <span id="theme-icon">☀️ Light</span>
    </button>
    
    <div class="tag tag-verified" style="display:flex; align-items:center; gap:4px;">
      <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
      <span>7/7 APIs Online</span>
    </div>
  </div>
</header>

<!-- Navigation Tabs -->
<nav class="app-nav" role="tablist">
  <button class="nav-tab" role="tab" aria-selected="true" data-tab="map" onclick="switchTab('map')">
    <span>🗺️</span> National GIS Map
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="repo" onclick="switchTab('repo')">
    <span>📚</span> Knowledge Hub <span class="nav-badge" id="papers-count-badge">20</span>
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="copilot" onclick="switchTab('copilot')">
    <span>🤖</span> AI Research Copilot
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="sim" onclick="switchTab('sim')">
    <span>🧪</span> Policy Sandbox
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="bench" onclick="switchTab('bench')">
    <span>📊</span> State Benchmarking
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="innovate" onclick="switchTab('innovate')">
    <span>💡</span> Innovation & Pilots
  </button>
  <button class="nav-tab" role="tab" aria-selected="false" data-tab="admin" onclick="switchTab('admin')">
    <span>🛡️</span> RBAC & Governance
  </button>
</nav>

<!-- Main Dynamic Content Workspace -->
<main id="workspace">
  <!-- Content injected via JavaScript according to selected tab -->
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
    <div class="modal-body" id="modal-body-content">
      <!-- Dynamic modal content -->
    </div>
    <div class="modal-footer">
      <button class="btn btn-sm" id="modal-doi-btn">Open Government Source</button>
      <button class="btn btn-primary btn-sm" id="modal-evidence-btn">Add to Evidence Pack</button>
    </div>
  </div>
</div>

<!-- Role Switcher Modal -->
<div class="modal-overlay" id="role-modal">
  <div class="modal-box" style="max-width: 580px;">
    <div class="modal-header">
      <h3 style="font-size:16px; font-weight:700;">Switch Operational Persona (RBAC)</h3>
      <button class="btn btn-sm" onclick="closeModal('role-modal')">✕</button>
    </div>
    <div class="modal-body">
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
        Different stakeholders have customized clearance tiers under DoLR Governance Guidelines:
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;" id="role-options-list">
        <!-- Injected via JS -->
      </div>
    </div>
  </div>
</div>

<footer>
  <div>
    <strong>BHUMI-INSIGHT · SIH 2026 Problem Statement 26019</strong> | Department of Land Resources, Ministry of Rural Development, New Delhi.
  </div>
  <div style="display:flex; gap:14px;">
    <span>National Data Sovereignty: MeghRaj NIC Cloud</span>
    <span>•</span>
    <span>Bhuvan OGC Services Active</span>
  </div>
</footer>

<script>
window.BHUMI_STATES = {"UP": {"name": "Uttar Pradesh", "capital": "Lucknow", "portal": "UP Bhulekh", "portal_url": "https://upbhulekh.gov.in", "ror_pct": 100.0, "cadastral_pct": 98.4, "ulpin_status": "Live (All 75 Districts)", "svamitva_cards": "52.4 Lakh", "dispute_idx": 78, "research_count": 54, "lat": 26.8467, "lng": 80.9462, "districts": [["Lucknow", "Urban/Administrative"], ["Kanpur Nagar", "Industrial/Urban"], ["Varanasi", "Peri-Urban/Heritage"], ["Bahraich", "Rural/Terai Belt"], ["Sonbhadra", "Forest/Tribal"], ["Gautam Buddha Nagar (Noida)", "High-Growth Peri-Urban"], ["Gorakhpur", "Mixed Agriculture"]], "path_d": "M 3672.0 4487.0 L 3669.0 4489.0 L 3666.0 4490.0 L 3667.0 4486.0 L 3672.0 4487.0 Z M 3327.0 4474.0 L 3321.0 4463.0 L 3320.0 4449.0 L 3335.0 4465.0 L 3327.0 4474.0 Z M 3318.0 4420.0 L 3317.0 4424.0 L 3313.0 4423.0 L 3315.0 4418.0 L 3318.0 4420.0 Z M 4895.0 3856.0 L 4951.0 3892.0 L 4906.0 3903.0 L 4843.0 3890.0 L 4837.0 3914.0 L 4834.0 3925.0 L 4787.0 3935.0 L 4788.0 3959.0 L 4823.0 3959.0 L 4875.0 3985.0 L 4870.0 4031.0 L 4824.0 4034.0 L 4838.0 4084.0 L 4918.0 4136.0 L 4995.0 4159.0 L 5026.0 4189.0 L 4984.0 4231.0 L 4944.0 4214.0 L 4932.0 4209.0 L 4931.0 4221.0 L 4929.0 4235.0 L 4896.0 4238.0 L 4873.0 4215.0 L 4850.0 4249.0 L 4800.0 4277.0 L 4757.0 4337.0 L 4676.0 4374.0 L 4636.0 4393.0 L 4617.0 4411.0 L 4607.0 4469.0 L 4632.0 4559.0 L 4682.0 4614.0 L 4672.0 4644.0 L 4670.0 4651.0 L 4635.0 4661.0 L 4653.0 4706.0 L 4615.0 4804.0 L 4552.0 4881.0 L 4494.0 4888.0 L 4446.0 4856.0 L 4417.0 4794.0 L 4429.0 4710.0 L 4411.0 4706.0 L 4413.0 4644.0 L 4441.0 4645.0 L 4428.0 4612.0 L 4396.0 4593.0 L 4352.0 4611.0 L 4310.0 4600.0 L 4313.0 4631.0 L 4254.0 4606.0 L 4260.0 4575.0 L 4146.0 4530.0 L 4145.0 4486.0 L 4110.0 4485.0 L 4045.0 4462.0 L 4043.0 4423.0 L 4007.0 4446.0 L 3939.0 4430.0 L 3937.0 4465.0 L 3893.0 4528.0 L 3876.0 4507.0 L 3805.0 4513.0 L 3798.0 4421.0 L 3754.0 4444.0 L 3778.0 4459.0 L 3745.0 4470.0 L 3721.0 4452.0 L 3682.0 4467.0 L 3682.0 4468.0 L 3681.0 4468.0 L 3627.0 4488.0 L 3639.0 4439.0 L 3664.0 4427.0 L 3624.0 4383.0 L 3627.0 4349.0 L 3589.0 4340.0 L 3567.0 4367.0 L 3533.0 4366.0 L 3525.0 4393.0 L 3475.0 4404.0 L 3469.0 4452.0 L 3379.0 4427.0 L 3359.0 4458.0 L 3326.0 4444.0 L 3340.0 4394.0 L 3285.0 4375.0 L 3302.0 4432.0 L 3242.0 4446.0 L 3196.0 4387.0 L 3159.0 4427.0 L 3159.0 4393.0 L 3190.0 4383.0 L 3163.0 4361.0 L 3149.0 4401.0 L 3129.0 4378.0 L 3160.0 4346.0 L 3179.0 4285.0 L 3115.0 4303.0 L 3124.0 4356.0 L 3089.0 4345.0 L 3100.0 4324.0 L 3047.0 4352.0 L 3075.0 4495.0 L 3121.0 4534.0 L 3123.0 4630.0 L 3158.0 4614.0 L 3191.0 4690.0 L 3155.0 4761.0 L 3123.0 4776.0 L 3031.0 4699.0 L 2992.0 4742.0 L 2986.0 4704.0 L 2955.0 4679.0 L 2957.0 4599.0 L 2925.0 4523.0 L 2979.0 4482.0 L 2978.0 4451.0 L 3017.0 4436.0 L 2970.0 4350.0 L 3009.0 4291.0 L 3033.0 4275.0 L 3087.0 4281.0 L 3139.0 4261.0 L 3120.0 4216.0 L 3181.0 4144.0 L 3205.0 4093.0 L 3186.0 4077.0 L 3249.0 4005.0 L 3247.0 3969.0 L 3200.0 3915.0 L 3203.0 3882.0 L 3165.0 3874.0 L 3125.0 3842.0 L 3069.0 3854.0 L 3004.0 3812.0 L 2955.0 3823.0 L 2972.0 3789.0 L 2933.0 3779.0 L 2916.0 3799.0 L 2854.0 3802.0 L 2809.0 3783.0 L 2747.0 3822.0 L 2726.0 3813.0 L 2703.0 3840.0 L 2702.0 3806.0 L 2804.0 3765.0 L 2737.0 3735.0 L 2785.0 3688.0 L 2755.0 3642.0 L 2710.0 3615.0 L 2682.0 3569.0 L 2684.0 3523.0 L 2665.0 3467.0 L 2728.0 3438.0 L 2750.0 3403.0 L 2732.0 3384.0 L 2753.0 3309.0 L 2731.0 3303.0 L 2740.0 3272.0 L 2692.0 3216.0 L 2690.0 3142.0 L 2653.0 3114.0 L 2649.0 3086.0 L 2659.0 3036.0 L 2632.0 3001.0 L 2636.0 2863.0 L 2626.0 2822.0 L 2659.0 2714.0 L 2694.0 2660.0 L 2735.0 2642.0 L 2786.0 2572.0 L 2788.0 2545.0 L 2789.0 2544.0 L 2785.0 2538.0 L 2898.0 2598.0 L 2832.0 2689.0 L 2823.0 2732.0 L 2858.0 2804.0 L 2889.0 2789.0 L 2924.0 2838.0 L 3019.0 2763.0 L 3067.0 2784.0 L 3074.0 2816.0 L 3130.0 2868.0 L 3194.0 2892.0 L 3135.0 2937.0 L 3177.0 2958.0 L 3193.0 2994.0 L 3223.0 3011.0 L 3234.0 2991.0 L 3268.0 3010.0 L 3276.0 3048.0 L 3336.0 3065.0 L 3351.0 3106.0 L 3428.0 3110.0 L 3466.0 3095.0 L 3512.0 3152.0 L 3533.0 3158.0 L 3555.0 3116.0 L 3618.0 3147.0 L 3650.0 3187.0 L 3698.0 3214.0 L 3693.0 3175.0 L 3744.0 3185.0 L 3781.0 3226.0 L 3820.0 3237.0 L 3884.0 3279.0 L 3917.0 3286.0 L 3950.0 3342.0 L 3950.0 3365.0 L 3985.0 3352.0 L 4001.0 3384.0 L 4071.0 3417.0 L 4142.0 3465.0 L 4158.0 3438.0 L 4191.0 3440.0 L 4314.0 3527.0 L 4392.0 3511.0 L 4404.0 3588.0 L 4464.0 3588.0 L 4505.0 3606.0 L 4547.0 3604.0 L 4588.0 3647.0 L 4618.0 3622.0 L 4614.0 3594.0 L 4682.0 3595.0 L 4766.0 3638.0 L 4808.0 3697.0 L 4832.0 3800.0 L 4895.0 3810.0 L 4895.0 3856.0 Z", "cx": 3642.8, "cy": 3951.0}, "MH": {"name": "Maharashtra", "capital": "Mumbai", "portal": "Mahabhulekh & Mahabhumi", "portal_url": "https://bhulekh.mahabhumi.gov.in", "ror_pct": 99.8, "cadastral_pct": 96.5, "ulpin_status": "Live (3D Cadastre Pilot in Pune)", "svamitva_cards": "28.6 Lakh", "dispute_idx": 65, "research_count": 49, "lat": 19.7515, "lng": 75.7139, "districts": [["Pune", "High-Tech/Peri-Urban Sprawl"], ["Mumbai Suburban", "Ultra-Dense Urban"], ["Nagpur", "Logistics Hub/Mixed"], ["Gadchiroli", "Forest/FRA Schedule V"], ["Nashik", "Agro-Industrial"], ["Satara", "Western Ghats Mixed"]], "path_d": "M 1208.0 6172.0 L 1236.0 6147.0 L 1282.0 6147.0 L 1281.0 6082.0 L 1307.0 6010.0 L 1281.0 5984.0 L 1309.0 5962.0 L 1360.0 6014.0 L 1397.0 6020.0 L 1459.0 5967.0 L 1469.0 5925.0 L 1440.0 5867.0 L 1403.0 5828.0 L 1366.0 5820.0 L 1433.0 5804.0 L 1437.0 5770.0 L 1477.0 5761.0 L 1481.0 5728.0 L 1524.0 5705.0 L 1601.0 5701.0 L 1604.0 5669.0 L 1568.0 5681.0 L 1522.0 5669.0 L 1451.0 5688.0 L 1428.0 5640.0 L 1462.0 5635.0 L 1440.0 5570.0 L 1555.0 5528.0 L 1604.0 5536.0 L 1653.0 5505.0 L 1682.0 5550.0 L 1674.0 5616.0 L 1700.0 5638.0 L 1778.0 5661.0 L 1792.0 5654.0 L 1856.0 5681.0 L 1871.0 5716.0 L 1936.0 5747.0 L 2161.0 5753.0 L 2204.0 5762.0 L 2223.0 5803.0 L 2230.0 5864.0 L 2295.0 5871.0 L 2335.0 5829.0 L 2379.0 5832.0 L 2381.0 5783.0 L 2439.0 5727.0 L 2441.0 5688.0 L 2474.0 5688.0 L 2534.0 5646.0 L 2580.0 5657.0 L 2604.0 5634.0 L 2672.0 5632.0 L 2698.0 5669.0 L 2700.0 5719.0 L 2652.0 5713.0 L 2672.0 5773.0 L 2777.0 5762.0 L 2810.0 5775.0 L 2902.0 5734.0 L 2903.0 5714.0 L 2987.0 5698.0 L 2989.0 5734.0 L 3014.0 5726.0 L 3088.0 5749.0 L 3158.0 5742.0 L 3152.0 5704.0 L 3254.0 5685.0 L 3260.0 5661.0 L 3345.0 5677.0 L 3361.0 5723.0 L 3427.0 5703.0 L 3468.0 5729.0 L 3537.0 5721.0 L 3579.0 5693.0 L 3640.0 5733.0 L 3651.0 5785.0 L 3690.0 5780.0 L 3736.0 5801.0 L 3704.0 5846.0 L 3669.0 5858.0 L 3657.0 5916.0 L 3669.0 5945.0 L 3696.0 5946.0 L 3709.0 6034.0 L 3676.0 6056.0 L 3724.0 6061.0 L 3711.0 6137.0 L 3722.0 6161.0 L 3643.0 6190.0 L 3646.0 6225.0 L 3696.0 6238.0 L 3689.0 6302.0 L 3649.0 6309.0 L 3738.0 6387.0 L 3757.0 6417.0 L 3810.0 6449.0 L 3779.0 6482.0 L 3797.0 6507.0 L 3766.0 6532.0 L 3717.0 6523.0 L 3706.0 6492.0 L 3643.0 6547.0 L 3602.0 6638.0 L 3628.0 6701.0 L 3601.0 6735.0 L 3546.0 6749.0 L 3474.0 6694.0 L 3490.0 6684.0 L 3486.0 6618.0 L 3463.0 6596.0 L 3502.0 6490.0 L 3481.0 6458.0 L 3424.0 6418.0 L 3332.0 6455.0 L 3276.0 6421.0 L 3246.0 6466.0 L 3178.0 6438.0 L 3162.0 6399.0 L 3125.0 6396.0 L 3121.0 6359.0 L 2969.0 6330.0 L 2940.0 6302.0 L 2958.0 6349.0 L 2930.0 6382.0 L 2937.0 6465.0 L 2895.0 6486.0 L 2893.0 6541.0 L 2846.0 6530.0 L 2813.0 6504.0 L 2783.0 6518.0 L 2749.0 6632.0 L 2779.0 6643.0 L 2809.0 6683.0 L 2772.0 6695.0 L 2740.0 6772.0 L 2688.0 6786.0 L 2663.0 6860.0 L 2670.0 6878.0 L 2641.0 6888.0 L 2604.0 6867.0 L 2610.0 6821.0 L 2565.0 6834.0 L 2552.0 6880.0 L 2518.0 6924.0 L 2465.0 6912.0 L 2450.0 7008.0 L 2381.0 7053.0 L 2369.0 7091.0 L 2341.0 7063.0 L 2300.0 7077.0 L 2275.0 7116.0 L 2246.0 7118.0 L 2245.0 7176.0 L 2270.0 7200.0 L 2171.0 7198.0 L 2105.0 7212.0 L 2093.0 7182.0 L 2064.0 7194.0 L 2004.0 7154.0 L 1984.0 7187.0 L 2010.0 7229.0 L 2000.0 7259.0 L 2014.0 7339.0 L 1949.0 7344.0 L 1941.0 7329.0 L 1877.0 7339.0 L 1857.0 7379.0 L 1811.0 7339.0 L 1757.0 7340.0 L 1750.0 7401.0 L 1671.0 7418.0 L 1667.0 7458.0 L 1621.0 7472.0 L 1599.0 7447.0 L 1513.0 7492.0 L 1543.0 7509.0 L 1544.0 7566.0 L 1599.0 7593.0 L 1591.0 7641.0 L 1539.0 7756.0 L 1501.0 7749.0 L 1463.0 7769.0 L 1459.0 7795.0 L 1406.0 7800.0 L 1397.0 7760.0 L 1305.0 7762.0 L 1278.0 7695.0 L 1251.0 7684.0 L 1200.0 7489.0 L 1201.0 7432.0 L 1184.0 7337.0 L 1190.0 7279.0 L 1160.0 7187.0 L 1172.0 7190.0 L 1146.0 7099.0 L 1146.0 7038.0 L 1113.0 6958.0 L 1073.0 6767.0 L 1088.0 6740.0 L 1067.0 6708.0 L 1069.0 6642.0 L 1045.0 6590.0 L 1061.0 6526.0 L 1047.0 6525.0 L 1056.0 6451.0 L 1029.0 6369.0 L 1033.0 6321.0 L 1012.0 6254.0 L 1040.0 6216.0 L 1046.0 6159.0 L 1067.0 6164.0 L 1097.0 6129.0 L 1126.0 6136.0 L 1125.0 6165.0 L 1136.0 6170.0 L 1138.0 6171.0 L 1154.0 6178.0 L 1155.0 6178.0 L 1156.0 6179.0 L 1195.0 6197.0 L 1208.0 6172.0 Z M 2585.0 6810.0 L 2576.0 6811.0 L 2574.0 6818.0 L 2583.0 6817.0 L 2585.0 6810.0 Z M 1527.0 7744.0 L 1521.0 7732.0 L 1510.0 7733.0 L 1512.0 7744.0 L 1527.0 7744.0 Z", "cx": 2289.1, "cy": 6449.1}, "KA": {"name": "Karnataka", "capital": "Bengaluru", "portal": "Bhoomi & Dishaank", "portal_url": "https://bhoomi.karnataka.gov.in", "ror_pct": 100.0, "cadastral_pct": 97.8, "ulpin_status": "Live (Geo-referenced Cadastre)", "svamitva_cards": "18.2 Lakh", "dispute_idx": 58, "research_count": 43, "lat": 15.3173, "lng": 75.7139, "districts": [["Bengaluru Urban", "IT Corridor/Urban Sprawl"], ["Mysuru", "Mixed Heritage/Agri"], ["Kalaburagi", "Dryland Rural (Kalyana-KA)"], ["Belagavi", "Agricultural Hub"], ["Dakshina Kannada", "Coastal Cadastre"]], "path_d": "M 2585.0 6810.0 L 2583.0 6817.0 L 2574.0 6818.0 L 2576.0 6811.0 L 2585.0 6810.0 Z M 1527.0 7744.0 L 1512.0 7744.0 L 1510.0 7733.0 L 1521.0 7732.0 L 1527.0 7744.0 Z M 1691.0 8843.0 L 1672.0 8793.0 L 1637.0 8626.0 L 1631.0 8539.0 L 1604.0 8422.0 L 1580.0 8397.0 L 1532.0 8191.0 L 1522.0 8206.0 L 1490.0 8122.0 L 1441.0 8100.0 L 1440.0 8066.0 L 1481.0 8058.0 L 1514.0 8016.0 L 1522.0 7964.0 L 1503.0 7943.0 L 1528.0 7929.0 L 1503.0 7854.0 L 1504.0 7795.0 L 1459.0 7795.0 L 1463.0 7769.0 L 1501.0 7749.0 L 1539.0 7756.0 L 1591.0 7641.0 L 1599.0 7593.0 L 1544.0 7566.0 L 1543.0 7509.0 L 1513.0 7492.0 L 1599.0 7447.0 L 1621.0 7472.0 L 1667.0 7458.0 L 1671.0 7418.0 L 1750.0 7401.0 L 1757.0 7340.0 L 1811.0 7339.0 L 1857.0 7379.0 L 1877.0 7339.0 L 1941.0 7329.0 L 1949.0 7344.0 L 2014.0 7339.0 L 2000.0 7259.0 L 2010.0 7229.0 L 1984.0 7187.0 L 2004.0 7154.0 L 2064.0 7194.0 L 2093.0 7182.0 L 2105.0 7212.0 L 2171.0 7198.0 L 2270.0 7200.0 L 2245.0 7176.0 L 2246.0 7118.0 L 2275.0 7116.0 L 2300.0 7077.0 L 2341.0 7063.0 L 2369.0 7091.0 L 2381.0 7053.0 L 2450.0 7008.0 L 2465.0 6912.0 L 2518.0 6924.0 L 2552.0 6880.0 L 2565.0 6834.0 L 2610.0 6821.0 L 2604.0 6867.0 L 2641.0 6888.0 L 2670.0 6878.0 L 2685.0 6952.0 L 2670.0 6969.0 L 2701.0 6985.0 L 2632.0 7092.0 L 2628.0 7131.0 L 2679.0 7139.0 L 2711.0 7171.0 L 2659.0 7182.0 L 2654.0 7210.0 L 2605.0 7260.0 L 2603.0 7289.0 L 2633.0 7302.0 L 2645.0 7337.0 L 2628.0 7372.0 L 2632.0 7419.0 L 2614.0 7460.0 L 2630.0 7488.0 L 2595.0 7523.0 L 2550.0 7528.0 L 2567.0 7552.0 L 2635.0 7562.0 L 2670.0 7580.0 L 2636.0 7608.0 L 2642.0 7725.0 L 2551.0 7711.0 L 2491.0 7727.0 L 2480.0 7793.0 L 2506.0 7817.0 L 2472.0 7827.0 L 2474.0 7924.0 L 2499.0 7936.0 L 2517.0 7993.0 L 2497.0 8043.0 L 2416.0 8041.0 L 2388.0 8019.0 L 2376.0 8062.0 L 2411.0 8064.0 L 2399.0 8128.0 L 2373.0 8195.0 L 2410.0 8242.0 L 2446.0 8239.0 L 2414.0 8270.0 L 2433.0 8324.0 L 2493.0 8332.0 L 2508.0 8290.0 L 2553.0 8293.0 L 2580.0 8316.0 L 2593.0 8294.0 L 2622.0 8311.0 L 2633.0 8351.0 L 2591.0 8353.0 L 2568.0 8404.0 L 2600.0 8421.0 L 2575.0 8449.0 L 2563.0 8403.0 L 2500.0 8412.0 L 2462.0 8391.0 L 2461.0 8349.0 L 2416.0 8353.0 L 2443.0 8391.0 L 2429.0 8402.0 L 2465.0 8437.0 L 2441.0 8478.0 L 2449.0 8502.0 L 2510.0 8499.0 L 2509.0 8462.0 L 2537.0 8449.0 L 2601.0 8471.0 L 2608.0 8521.0 L 2634.0 8525.0 L 2743.0 8464.0 L 2735.0 8444.0 L 2790.0 8433.0 L 2791.0 8479.0 L 2818.0 8455.0 L 2844.0 8495.0 L 2825.0 8527.0 L 2857.0 8541.0 L 2866.0 8574.0 L 2935.0 8566.0 L 2926.0 8647.0 L 2984.0 8683.0 L 3000.0 8718.0 L 2959.0 8763.0 L 2961.0 8787.0 L 2884.0 8828.0 L 2877.0 8862.0 L 2842.0 8855.0 L 2773.0 8816.0 L 2738.0 8822.0 L 2704.0 8892.0 L 2654.0 8893.0 L 2648.0 8961.0 L 2658.0 9002.0 L 2610.0 9035.0 L 2608.0 9056.0 L 2700.0 9069.0 L 2715.0 9090.0 L 2677.0 9146.0 L 2614.0 9153.0 L 2590.0 9217.0 L 2543.0 9200.0 L 2478.0 9212.0 L 2406.0 9204.0 L 2388.0 9268.0 L 2283.0 9263.0 L 2266.0 9232.0 L 2237.0 9246.0 L 2232.0 9212.0 L 2206.0 9220.0 L 2153.0 9171.0 L 2126.0 9175.0 L 2127.0 9133.0 L 2088.0 9149.0 L 2045.0 9142.0 L 2016.0 9094.0 L 1989.0 9097.0 L 1889.0 9013.0 L 1867.0 8955.0 L 1817.0 8914.0 L 1796.0 8877.0 L 1734.0 8852.0 L 1737.0 8831.0 L 1691.0 8843.0 Z", "cx": 2293.6, "cy": 8036.6}, "TN": {"name": "Tamil Nadu", "capital": "Chennai", "portal": "TN Patta Chitta (Anytime Anywhere e-Services)", "portal_url": "https://eservices.tn.gov.in", "ror_pct": 99.9, "cadastral_pct": 98.1, "ulpin_status": "Live (CollabLand Cadastral Integration)", "svamitva_cards": "14.1 Lakh", "dispute_idx": 61, "research_count": 39, "lat": 11.1271, "lng": 78.6569, "districts": [["Chennai", "Metropolitan Urban"], ["Coimbatore", "Industrial/Peri-Urban"], ["Madurai", "Heritage/Mixed"], ["Nilgiris", "Ecological/Plantation Hills"], ["Thanjavur", "Cauvery Delta Agriculture"]], "path_d": "M 3419.0 9235.0 L 3413.0 9304.0 L 3439.0 9369.0 L 3443.0 9501.0 L 3397.0 9508.0 L 3442.0 9558.0 L 3451.0 9752.0 L 3413.0 9756.0 L 3278.0 9738.0 L 3238.0 9768.0 L 3220.0 9816.0 L 3233.0 9840.0 L 3136.0 9955.0 L 3103.0 10047.0 L 3157.0 10103.0 L 3022.0 10140.0 L 2987.0 10163.0 L 2933.0 10168.0 L 2857.0 10222.0 L 2826.0 10339.0 L 2828.0 10388.0 L 2795.0 10438.0 L 2487.0 10447.0 L 2526.0 10368.0 L 2487.0 10296.0 L 2517.0 10250.0 L 2479.0 10198.0 L 2522.0 10151.0 L 2528.0 10098.0 L 2575.0 10025.0 L 2555.0 9989.0 L 2489.0 9986.0 L 2508.0 9943.0 L 2506.0 9892.0 L 2528.0 9857.0 L 2502.0 9809.0 L 2536.0 9770.0 L 2494.0 9720.0 L 2425.0 9768.0 L 2372.0 9737.0 L 2377.0 9633.0 L 2401.0 9566.0 L 2373.0 9533.0 L 2315.0 9512.0 L 2345.0 9467.0 L 2328.0 9427.0 L 2240.0 9413.0 L 2276.0 9357.0 L 2204.0 9317.0 L 2171.0 9316.0 L 2166.0 9279.0 L 2190.0 9279.0 L 2237.0 9246.0 L 2266.0 9232.0 L 2283.0 9263.0 L 2388.0 9268.0 L 2406.0 9204.0 L 2478.0 9212.0 L 2543.0 9200.0 L 2590.0 9217.0 L 2614.0 9153.0 L 2677.0 9146.0 L 2715.0 9090.0 L 2700.0 9069.0 L 2608.0 9056.0 L 2610.0 9035.0 L 2658.0 9002.0 L 2648.0 8961.0 L 2654.0 8893.0 L 2704.0 8892.0 L 2738.0 8822.0 L 2773.0 8816.0 L 2842.0 8855.0 L 2877.0 8862.0 L 2928.0 8912.0 L 2960.0 8911.0 L 2973.0 8870.0 L 2992.0 8887.0 L 3020.0 8803.0 L 3016.0 8782.0 L 3047.0 8754.0 L 3145.0 8748.0 L 3205.0 8773.0 L 3239.0 8723.0 L 3275.0 8731.0 L 3300.0 8710.0 L 3312.0 8660.0 L 3350.0 8687.0 L 3427.0 8695.0 L 3417.0 8668.0 L 3477.0 8656.0 L 3490.0 8615.0 L 3527.0 8584.0 L 3583.0 8614.0 L 3593.0 8580.0 L 3618.0 8685.0 L 3589.0 8804.0 L 3587.0 8865.0 L 3554.0 8971.0 L 3458.0 9113.0 L 3366.0 9095.0 L 3339.0 9150.0 L 3347.0 9214.0 L 3419.0 9235.0 Z", "cx": 2875.1, "cy": 9370.2}, "RJ": {"name": "Rajasthan", "capital": "Jaipur", "portal": "Apna Khata (e-Dharti)", "portal_url": "https://apnakhata.rajasthan.gov.in", "ror_pct": 99.5, "cadastral_pct": 94.2, "ulpin_status": "Live (Solar Park Land Records)", "svamitva_cards": "12.3 Lakh", "dispute_idx": 69, "research_count": 36, "lat": 27.0238, "lng": 74.2179, "districts": [["Jaipur", "Urban/State Capital"], ["Jodhpur", "Arid Semi-Urban"], ["Barmer", "Thar Desert/Energy Corridor"], ["Udaipur", "Aravalli Tribal Belt"], ["Kota", "Chambal Basin Mixed"]], "path_d": "M 1327.0 4830.0 L 1348.0 4807.0 L 1349.0 4761.0 L 1324.0 4736.0 L 1292.0 4772.0 L 1287.0 4740.0 L 1242.0 4706.0 L 1277.0 4648.0 L 1247.0 4631.0 L 1252.0 4595.0 L 1214.0 4608.0 L 1210.0 4641.0 L 1129.0 4635.0 L 1119.0 4599.0 L 1070.0 4580.0 L 1042.0 4613.0 L 1038.0 4582.0 L 1010.0 4558.0 L 922.0 4516.0 L 912.0 4496.0 L 871.0 4522.0 L 852.0 4504.0 L 781.0 4513.0 L 725.0 4494.0 L 660.0 4514.0 L 599.0 4482.0 L 552.0 4386.0 L 541.0 4309.0 L 476.0 4215.0 L 482.0 4103.0 L 394.0 4107.0 L 357.0 4092.0 L 306.0 4005.0 L 306.0 3949.0 L 339.0 3900.0 L 349.0 3784.0 L 310.0 3762.0 L 254.0 3765.0 L 141.0 3696.0 L 133.0 3671.0 L 150.0 3597.0 L 180.0 3538.0 L 278.0 3465.0 L 333.0 3414.0 L 376.0 3328.0 L 460.0 3261.0 L 530.0 3268.0 L 554.0 3301.0 L 555.0 3336.0 L 577.0 3376.0 L 621.0 3385.0 L 722.0 3348.0 L 788.0 3339.0 L 868.0 3344.0 L 947.0 3318.0 L 962.0 3260.0 L 1057.0 3172.0 L 1098.0 3067.0 L 1131.0 3035.0 L 1243.0 2982.0 L 1310.0 2957.0 L 1428.0 2771.0 L 1471.0 2644.0 L 1544.0 2614.0 L 1603.0 2601.0 L 1660.0 2559.0 L 1631.0 2639.0 L 1827.0 2661.0 L 1836.0 2689.0 L 1808.0 2732.0 L 1850.0 2731.0 L 1832.0 2855.0 L 1896.0 2875.0 L 1920.0 2861.0 L 1950.0 2906.0 L 1998.0 2929.0 L 2066.0 2908.0 L 2089.0 2921.0 L 2083.0 2978.0 L 2081.0 2989.0 L 2089.0 2994.0 L 2122.0 3013.0 L 2107.0 3038.0 L 2129.0 3156.0 L 2181.0 3200.0 L 2241.0 3249.0 L 2292.0 3328.0 L 2272.0 3321.0 L 2241.0 3349.0 L 2267.0 3351.0 L 2264.0 3356.0 L 2236.0 3412.0 L 2246.0 3431.0 L 2324.0 3440.0 L 2309.0 3388.0 L 2318.0 3364.0 L 2368.0 3377.0 L 2377.0 3336.0 L 2413.0 3333.0 L 2405.0 3355.0 L 2434.0 3400.0 L 2471.0 3384.0 L 2469.0 3356.0 L 2539.0 3313.0 L 2569.0 3343.0 L 2553.0 3395.0 L 2554.0 3454.0 L 2539.0 3493.0 L 2566.0 3518.0 L 2589.0 3460.0 L 2617.0 3477.0 L 2648.0 3471.0 L 2665.0 3467.0 L 2684.0 3523.0 L 2682.0 3569.0 L 2710.0 3615.0 L 2755.0 3642.0 L 2785.0 3688.0 L 2737.0 3735.0 L 2804.0 3765.0 L 2702.0 3806.0 L 2703.0 3840.0 L 2726.0 3813.0 L 2747.0 3822.0 L 2809.0 3783.0 L 2854.0 3802.0 L 2916.0 3799.0 L 2933.0 3779.0 L 2972.0 3789.0 L 2955.0 3823.0 L 2917.0 3839.0 L 2910.0 3879.0 L 2883.0 3869.0 L 2734.0 3965.0 L 2729.0 3969.0 L 2698.0 3971.0 L 2624.0 4029.0 L 2520.0 4078.0 L 2488.0 4130.0 L 2438.0 4142.0 L 2400.0 4180.0 L 2394.0 4276.0 L 2419.0 4327.0 L 2473.0 4357.0 L 2532.0 4371.0 L 2573.0 4350.0 L 2615.0 4361.0 L 2649.0 4317.0 L 2680.0 4394.0 L 2672.0 4431.0 L 2644.0 4444.0 L 2601.0 4432.0 L 2570.0 4451.0 L 2506.0 4457.0 L 2502.0 4486.0 L 2526.0 4516.0 L 2477.0 4532.0 L 2491.0 4558.0 L 2530.0 4557.0 L 2560.0 4600.0 L 2539.0 4658.0 L 2478.0 4636.0 L 2484.0 4698.0 L 2517.0 4757.0 L 2502.0 4781.0 L 2466.0 4782.0 L 2410.0 4731.0 L 2378.0 4766.0 L 2323.0 4733.0 L 2278.0 4743.0 L 2269.0 4702.0 L 2247.0 4746.0 L 2249.0 4786.0 L 2191.0 4809.0 L 2195.0 4842.0 L 2112.0 4864.0 L 2086.0 4885.0 L 2023.0 4840.0 L 2044.0 4795.0 L 2061.0 4813.0 L 2095.0 4802.0 L 2125.0 4816.0 L 2151.0 4777.0 L 2121.0 4765.0 L 2150.0 4729.0 L 2123.0 4673.0 L 2141.0 4645.0 L 2178.0 4657.0 L 2184.0 4613.0 L 2160.0 4555.0 L 2129.0 4543.0 L 2086.0 4567.0 L 1960.0 4545.0 L 1961.0 4500.0 L 1985.0 4517.0 L 2004.0 4436.0 L 1955.0 4437.0 L 1928.0 4457.0 L 1926.0 4488.0 L 1869.0 4489.0 L 1834.0 4455.0 L 1839.0 4518.0 L 1890.0 4520.0 L 1884.0 4551.0 L 1842.0 4563.0 L 1820.0 4516.0 L 1824.0 4561.0 L 1786.0 4617.0 L 1833.0 4641.0 L 1802.0 4704.0 L 1834.0 4703.0 L 1837.0 4709.0 L 1842.0 4722.0 L 1871.0 4795.0 L 1843.0 4836.0 L 1849.0 4900.0 L 1817.0 4962.0 L 1722.0 5006.0 L 1707.0 5042.0 L 1760.0 5078.0 L 1704.0 5121.0 L 1656.0 5115.0 L 1633.0 5132.0 L 1609.0 5086.0 L 1569.0 5087.0 L 1574.0 5056.0 L 1540.0 5035.0 L 1541.0 5030.0 L 1533.0 5029.0 L 1530.0 5028.0 L 1527.0 5027.0 L 1495.0 5021.0 L 1474.0 4986.0 L 1410.0 4980.0 L 1422.0 4919.0 L 1377.0 4921.0 L 1371.0 4886.0 L 1327.0 4830.0 Z", "cx": 1835.3, "cy": 4084.2}, "GJ": {"name": "Gujarat", "capital": "Gandhinagar", "portal": "AnyRoR (Anywhere Revenue Records)", "portal_url": "https://anyror.gujarat.gov.in", "ror_pct": 99.9, "cadastral_pct": 97.4, "ulpin_status": "Live (Modern Drone Resurvey)", "svamitva_cards": "16.5 Lakh", "dispute_idx": 54, "research_count": 38, "lat": 22.2587, "lng": 71.1924, "districts": [["Ahmedabad", "Mega Urban Corridor"], ["Surat", "Diamond & Textile Industrial"], ["Kutch", "Coastal/Arid Saline Flats"], ["Vadodara", "Chemical Industrial Belt"], ["Dang", "Tribal Forest Cadastre"]], "path_d": "M 1111.0 6112.0 L 1111.0 6114.0 L 1111.0 6115.0 L 1116.0 6123.0 L 1126.0 6128.0 L 1126.0 6136.0 L 1097.0 6129.0 L 1067.0 6164.0 L 1046.0 6159.0 L 1051.0 6120.0 L 1075.0 6075.0 L 1102.0 6078.0 L 1091.0 6039.0 L 1107.0 5991.0 L 1060.0 5830.0 L 1060.0 5797.0 L 1028.0 5813.0 L 1022.0 5733.0 L 1057.0 5651.0 L 1032.0 5635.0 L 1066.0 5612.0 L 1004.0 5587.0 L 1046.0 5518.0 L 1007.0 5527.0 L 1023.0 5430.0 L 1047.0 5407.0 L 1094.0 5425.0 L 1096.0 5404.0 L 1056.0 5383.0 L 1004.0 5411.0 L 988.0 5373.0 L 947.0 5433.0 L 927.0 5504.0 L 918.0 5460.0 L 919.0 5572.0 L 931.0 5613.0 L 904.0 5674.0 L 848.0 5745.0 L 857.0 5765.0 L 647.0 5846.0 L 622.0 5870.0 L 521.0 5900.0 L 519.0 5902.0 L 519.0 5905.0 L 497.0 5910.0 L 474.0 5908.0 L 474.0 5908.0 L 474.0 5908.0 L 471.0 5906.0 L 466.0 5911.0 L 469.0 5907.0 L 448.0 5909.0 L 408.0 5922.0 L 281.0 5855.0 L 220.0 5805.0 L 143.0 5720.0 L 106.0 5277.0 L 157.0 5235.0 L 231.0 5232.0 L 324.0 5105.0 L 355.0 5051.0 L 321.0 5067.0 L 304.0 5100.0 L 266.0 5079.0 L 221.0 5102.0 L 164.0 5103.0 L 100.0 5125.0 L 131.0 4634.0 L 226.0 4642.0 L 260.0 4600.0 L 418.0 4565.0 L 414.0 4626.0 L 462.0 4643.0 L 525.0 4631.0 L 514.0 4618.0 L 596.0 4588.0 L 560.0 4567.0 L 561.0 4509.0 L 599.0 4482.0 L 660.0 4514.0 L 725.0 4494.0 L 781.0 4513.0 L 852.0 4504.0 L 871.0 4522.0 L 912.0 4496.0 L 922.0 4516.0 L 1010.0 4558.0 L 1038.0 4582.0 L 1042.0 4613.0 L 1070.0 4580.0 L 1119.0 4599.0 L 1129.0 4635.0 L 1210.0 4641.0 L 1214.0 4608.0 L 1252.0 4595.0 L 1247.0 4631.0 L 1277.0 4648.0 L 1242.0 4706.0 L 1287.0 4740.0 L 1292.0 4772.0 L 1324.0 4736.0 L 1349.0 4761.0 L 1348.0 4807.0 L 1327.0 4830.0 L 1393.0 4907.0 L 1405.0 4907.0 L 1409.0 4908.0 L 1422.0 4919.0 L 1410.0 4980.0 L 1474.0 4986.0 L 1495.0 5021.0 L 1525.0 5020.0 L 1526.0 5026.0 L 1526.0 5027.0 L 1527.0 5027.0 L 1527.0 5028.0 L 1530.0 5028.0 L 1531.0 5028.0 L 1533.0 5029.0 L 1538.0 5030.0 L 1540.0 5035.0 L 1574.0 5056.0 L 1569.0 5087.0 L 1609.0 5086.0 L 1633.0 5132.0 L 1650.0 5188.0 L 1677.0 5188.0 L 1676.0 5223.0 L 1645.0 5285.0 L 1611.0 5280.0 L 1560.0 5325.0 L 1549.0 5355.0 L 1604.0 5368.0 L 1576.0 5396.0 L 1537.0 5381.0 L 1536.0 5430.0 L 1551.0 5434.0 L 1540.0 5505.0 L 1555.0 5528.0 L 1440.0 5570.0 L 1462.0 5635.0 L 1428.0 5640.0 L 1451.0 5688.0 L 1522.0 5669.0 L 1568.0 5681.0 L 1604.0 5669.0 L 1601.0 5701.0 L 1524.0 5705.0 L 1481.0 5728.0 L 1477.0 5761.0 L 1437.0 5770.0 L 1433.0 5804.0 L 1366.0 5820.0 L 1403.0 5828.0 L 1440.0 5867.0 L 1469.0 5925.0 L 1459.0 5967.0 L 1397.0 6020.0 L 1360.0 6014.0 L 1309.0 5962.0 L 1281.0 5984.0 L 1307.0 6010.0 L 1281.0 6082.0 L 1282.0 6147.0 L 1236.0 6147.0 L 1208.0 6172.0 L 1203.0 6169.0 L 1203.0 6160.0 L 1203.0 6158.0 L 1209.0 6156.0 L 1210.0 6156.0 L 1210.0 6155.0 L 1211.0 6154.0 L 1207.0 6145.0 L 1201.0 6144.0 L 1195.0 6143.0 L 1192.0 6143.0 L 1186.0 6140.0 L 1184.0 6142.0 L 1187.0 6152.0 L 1182.0 6153.0 L 1179.0 6157.0 L 1179.0 6158.0 L 1178.0 6158.0 L 1177.0 6158.0 L 1175.0 6157.0 L 1171.0 6157.0 L 1167.0 6152.0 L 1165.0 6157.0 L 1164.0 6157.0 L 1160.0 6134.0 L 1166.0 6130.0 L 1171.0 6132.0 L 1172.0 6131.0 L 1175.0 6128.0 L 1184.0 6121.0 L 1185.0 6119.0 L 1189.0 6115.0 L 1191.0 6113.0 L 1192.0 6111.0 L 1192.0 6110.0 L 1193.0 6112.0 L 1198.0 6103.0 L 1184.0 6104.0 L 1177.0 6105.0 L 1176.0 6105.0 L 1180.0 6095.0 L 1175.0 6084.0 L 1166.0 6096.0 L 1164.0 6095.0 L 1159.0 6096.0 L 1153.0 6108.0 L 1144.0 6108.0 L 1142.0 6108.0 L 1134.0 6108.0 L 1116.0 6108.0 L 1113.0 6109.0 L 1113.0 6110.0 L 1111.0 6112.0 Z M 1574.0 5369.0 L 1573.0 5361.0 L 1568.0 5362.0 L 1571.0 5369.0 L 1574.0 5369.0 Z", "cx": 1096.5, "cy": 5543.7}, "MP": {"name": "Madhya Pradesh", "capital": "Bhopal", "portal": "MP Bhulekh & Saara", "portal_url": "https://mpbhulekh.gov.in", "ror_pct": 100.0, "cadastral_pct": 99.1, "ulpin_status": "Live (NCAER N-LRSI #1 Rank)", "svamitva_cards": "24.8 Lakh", "dispute_idx": 59, "research_count": 41, "lat": 22.9734, "lng": 78.6569, "districts": [["Bhopal", "Administrative Urban"], ["Indore", "Commercial Smart City"], ["Jabalpur", "Narmada Valley Mixed"], ["Dindori", "Baiga Tribal CFR Belt"], ["Ujjain", "Agro-Religious Mixed"]], "path_d": "M 1574.0 5369.0 L 1571.0 5369.0 L 1568.0 5362.0 L 1573.0 5361.0 L 1574.0 5369.0 Z M 4154.0 5013.0 L 4172.0 5043.0 L 4172.0 5052.0 L 4172.0 5052.0 L 4172.0 5053.0 L 4173.0 5054.0 L 4175.0 5056.0 L 4176.0 5055.0 L 4177.0 5054.0 L 4177.0 5053.0 L 4180.0 5055.0 L 4181.0 5056.0 L 4243.0 5086.0 L 4221.0 5166.0 L 4162.0 5176.0 L 4163.0 5219.0 L 4106.0 5249.0 L 4112.0 5287.0 L 4106.0 5294.0 L 4064.0 5344.0 L 4008.0 5386.0 L 3983.0 5404.0 L 3958.0 5375.0 L 3914.0 5389.0 L 3913.0 5387.0 L 3908.0 5388.0 L 3888.0 5405.0 L 3889.0 5457.0 L 3858.0 5480.0 L 3844.0 5545.0 L 3811.0 5541.0 L 3788.0 5653.0 L 3753.0 5680.0 L 3761.0 5751.0 L 3736.0 5801.0 L 3690.0 5780.0 L 3651.0 5785.0 L 3640.0 5733.0 L 3579.0 5693.0 L 3537.0 5721.0 L 3468.0 5729.0 L 3427.0 5703.0 L 3361.0 5723.0 L 3345.0 5677.0 L 3260.0 5661.0 L 3254.0 5685.0 L 3152.0 5704.0 L 3158.0 5742.0 L 3088.0 5749.0 L 3014.0 5726.0 L 2989.0 5734.0 L 2987.0 5698.0 L 2903.0 5714.0 L 2902.0 5734.0 L 2810.0 5775.0 L 2777.0 5762.0 L 2672.0 5773.0 L 2652.0 5713.0 L 2700.0 5719.0 L 2698.0 5669.0 L 2672.0 5632.0 L 2604.0 5634.0 L 2580.0 5657.0 L 2534.0 5646.0 L 2474.0 5688.0 L 2441.0 5688.0 L 2439.0 5727.0 L 2381.0 5783.0 L 2379.0 5832.0 L 2335.0 5829.0 L 2295.0 5871.0 L 2230.0 5864.0 L 2223.0 5803.0 L 2204.0 5762.0 L 2161.0 5753.0 L 1936.0 5747.0 L 1871.0 5716.0 L 1856.0 5681.0 L 1792.0 5654.0 L 1778.0 5661.0 L 1700.0 5638.0 L 1674.0 5616.0 L 1682.0 5550.0 L 1653.0 5505.0 L 1604.0 5536.0 L 1555.0 5528.0 L 1540.0 5505.0 L 1551.0 5434.0 L 1536.0 5430.0 L 1537.0 5381.0 L 1576.0 5396.0 L 1604.0 5368.0 L 1549.0 5355.0 L 1560.0 5325.0 L 1611.0 5280.0 L 1645.0 5285.0 L 1676.0 5223.0 L 1677.0 5188.0 L 1650.0 5188.0 L 1633.0 5132.0 L 1656.0 5115.0 L 1704.0 5121.0 L 1760.0 5078.0 L 1707.0 5042.0 L 1722.0 5006.0 L 1791.0 4966.0 L 1817.0 4962.0 L 1849.0 4900.0 L 1843.0 4836.0 L 1871.0 4795.0 L 1837.0 4726.0 L 1842.0 4722.0 L 1846.0 4720.0 L 1846.0 4716.0 L 1842.0 4710.0 L 1837.0 4709.0 L 1802.0 4704.0 L 1833.0 4641.0 L 1786.0 4617.0 L 1824.0 4561.0 L 1820.0 4516.0 L 1842.0 4563.0 L 1884.0 4551.0 L 1890.0 4520.0 L 1839.0 4518.0 L 1834.0 4455.0 L 1869.0 4489.0 L 1926.0 4488.0 L 1928.0 4457.0 L 1955.0 4437.0 L 2004.0 4436.0 L 1985.0 4517.0 L 1961.0 4500.0 L 1960.0 4545.0 L 2086.0 4567.0 L 2129.0 4543.0 L 2160.0 4555.0 L 2161.0 4590.0 L 2184.0 4613.0 L 2178.0 4657.0 L 2141.0 4645.0 L 2123.0 4673.0 L 2150.0 4729.0 L 2121.0 4765.0 L 2151.0 4777.0 L 2125.0 4816.0 L 2095.0 4802.0 L 2061.0 4813.0 L 2044.0 4795.0 L 2023.0 4840.0 L 2086.0 4885.0 L 2112.0 4864.0 L 2195.0 4842.0 L 2191.0 4809.0 L 2249.0 4786.0 L 2247.0 4746.0 L 2269.0 4702.0 L 2278.0 4743.0 L 2323.0 4733.0 L 2378.0 4766.0 L 2410.0 4731.0 L 2466.0 4782.0 L 2502.0 4781.0 L 2517.0 4757.0 L 2484.0 4698.0 L 2478.0 4636.0 L 2539.0 4658.0 L 2560.0 4600.0 L 2530.0 4557.0 L 2491.0 4558.0 L 2477.0 4532.0 L 2526.0 4516.0 L 2502.0 4486.0 L 2506.0 4457.0 L 2570.0 4451.0 L 2601.0 4432.0 L 2644.0 4444.0 L 2672.0 4431.0 L 2680.0 4394.0 L 2649.0 4317.0 L 2615.0 4361.0 L 2573.0 4350.0 L 2525.0 4364.0 L 2517.0 4356.0 L 2513.0 4354.0 L 2473.0 4357.0 L 2419.0 4327.0 L 2394.0 4276.0 L 2400.0 4180.0 L 2438.0 4142.0 L 2488.0 4130.0 L 2520.0 4078.0 L 2589.0 4043.0 L 2594.0 4033.0 L 2595.0 4031.0 L 2624.0 4029.0 L 2698.0 3971.0 L 2729.0 3969.0 L 2734.0 3966.0 L 2734.0 3965.0 L 2739.0 3960.0 L 2883.0 3869.0 L 2910.0 3879.0 L 2917.0 3839.0 L 2955.0 3823.0 L 3004.0 3812.0 L 3069.0 3854.0 L 3125.0 3842.0 L 3165.0 3874.0 L 3203.0 3882.0 L 3200.0 3915.0 L 3247.0 3969.0 L 3249.0 4005.0 L 3186.0 4077.0 L 3205.0 4093.0 L 3181.0 4144.0 L 3120.0 4216.0 L 3139.0 4261.0 L 3087.0 4281.0 L 3033.0 4275.0 L 3009.0 4291.0 L 2970.0 4350.0 L 3017.0 4436.0 L 2978.0 4451.0 L 2979.0 4482.0 L 2925.0 4523.0 L 2957.0 4599.0 L 2955.0 4679.0 L 2986.0 4704.0 L 2992.0 4742.0 L 3031.0 4699.0 L 3123.0 4776.0 L 3155.0 4761.0 L 3191.0 4690.0 L 3158.0 4614.0 L 3123.0 4630.0 L 3121.0 4534.0 L 3075.0 4495.0 L 3047.0 4352.0 L 3100.0 4324.0 L 3089.0 4345.0 L 3124.0 4356.0 L 3115.0 4303.0 L 3179.0 4285.0 L 3160.0 4346.0 L 3129.0 4378.0 L 3149.0 4401.0 L 3163.0 4361.0 L 3190.0 4383.0 L 3159.0 4393.0 L 3159.0 4427.0 L 3196.0 4387.0 L 3242.0 4446.0 L 3302.0 4432.0 L 3285.0 4375.0 L 3340.0 4394.0 L 3326.0 4444.0 L 3359.0 4458.0 L 3379.0 4427.0 L 3469.0 4452.0 L 3475.0 4404.0 L 3525.0 4393.0 L 3533.0 4366.0 L 3567.0 4367.0 L 3589.0 4340.0 L 3627.0 4349.0 L 3624.0 4383.0 L 3664.0 4427.0 L 3639.0 4439.0 L 3627.0 4488.0 L 3681.0 4468.0 L 3678.0 4464.0 L 3681.0 4462.0 L 3682.0 4464.0 L 3682.0 4467.0 L 3721.0 4452.0 L 3745.0 4470.0 L 3778.0 4459.0 L 3754.0 4444.0 L 3798.0 4421.0 L 3805.0 4513.0 L 3876.0 4507.0 L 3893.0 4528.0 L 3937.0 4465.0 L 3939.0 4430.0 L 4007.0 4446.0 L 4043.0 4423.0 L 4045.0 4462.0 L 4110.0 4485.0 L 4145.0 4486.0 L 4146.0 4530.0 L 4260.0 4575.0 L 4254.0 4606.0 L 4313.0 4631.0 L 4310.0 4600.0 L 4352.0 4611.0 L 4396.0 4593.0 L 4428.0 4612.0 L 4441.0 4645.0 L 4413.0 4644.0 L 4411.0 4706.0 L 4429.0 4710.0 L 4417.0 4794.0 L 4446.0 4856.0 L 4412.0 4870.0 L 4411.0 4871.0 L 4396.0 4877.0 L 4360.0 4918.0 L 4196.0 4910.0 L 4153.0 4891.0 L 4119.0 4914.0 L 4069.0 4873.0 L 4048.0 4886.0 L 4071.0 4933.0 L 4074.0 4938.0 L 4078.0 4946.0 L 4060.0 4968.0 L 4039.0 4994.0 L 4060.0 5028.0 L 4075.0 5015.0 L 4092.0 5002.0 L 4115.0 5015.0 L 4124.0 5021.0 L 4154.0 5013.0 Z M 3672.0 4487.0 L 3667.0 4486.0 L 3666.0 4490.0 L 3669.0 4489.0 L 3672.0 4487.0 Z M 3327.0 4474.0 L 3335.0 4465.0 L 3320.0 4449.0 L 3321.0 4463.0 L 3327.0 4474.0 Z M 3318.0 4420.0 L 3315.0 4418.0 L 3313.0 4423.0 L 3317.0 4424.0 L 3318.0 4420.0 Z", "cx": 2970.2, "cy": 4818.6}, "BR": {"name": "Bihar", "capital": "Patna", "portal": "Bihar Bhumi (Biharbhumi Portal)", "portal_url": "https://biharbhumi.bihar.gov.in", "ror_pct": 98.7, "cadastral_pct": 82.5, "ulpin_status": "Special Survey in Progress (Bandobast)", "svamitva_cards": "9.4 Lakh", "dispute_idx": 84, "research_count": 35, "lat": 25.0961, "lng": 85.3131, "districts": [["Patna", "Urban Core"], ["Gaya", "Southern Plateau Mixed"], ["Muzaffarpur", "North Bihar Flood Plain"], ["Sitamarhi", "Border Agricultural"], ["Rohtas", "Canal Irrigated Belt"]], "path_d": "M 5000.0 4738.0 L 4998.0 4736.0 L 4997.0 4731.0 L 5002.0 4736.0 L 5000.0 4738.0 Z M 4682.0 4614.0 L 4663.0 4576.0 L 4657.0 4576.0 L 4654.0 4577.0 L 4632.0 4559.0 L 4607.0 4469.0 L 4617.0 4411.0 L 4676.0 4374.0 L 4733.0 4339.0 L 4739.0 4337.0 L 4739.0 4337.0 L 4740.0 4333.0 L 4742.0 4336.0 L 4757.0 4337.0 L 4800.0 4277.0 L 4850.0 4249.0 L 4873.0 4215.0 L 4896.0 4238.0 L 4931.0 4221.0 L 4944.0 4214.0 L 4948.0 4212.0 L 4953.0 4214.0 L 4984.0 4231.0 L 5026.0 4189.0 L 4995.0 4159.0 L 4918.0 4136.0 L 4838.0 4084.0 L 4824.0 4034.0 L 4870.0 4031.0 L 4871.0 4025.0 L 4875.0 4020.0 L 4875.0 3985.0 L 4823.0 3959.0 L 4788.0 3959.0 L 4787.0 3935.0 L 4834.0 3918.0 L 4837.0 3914.0 L 4841.0 3908.0 L 4845.0 3901.0 L 4906.0 3903.0 L 4951.0 3892.0 L 4947.0 3876.0 L 4935.0 3874.0 L 4922.0 3872.0 L 4895.0 3856.0 L 4895.0 3810.0 L 4832.0 3800.0 L 4808.0 3697.0 L 4766.0 3638.0 L 4755.0 3608.0 L 4816.0 3604.0 L 4840.0 3576.0 L 4889.0 3597.0 L 4897.0 3616.0 L 5009.0 3635.0 L 5031.0 3675.0 L 5018.0 3738.0 L 5121.0 3765.0 L 5143.0 3803.0 L 5197.0 3797.0 L 5203.0 3835.0 L 5244.0 3841.0 L 5335.0 3790.0 L 5369.0 3809.0 L 5376.0 3871.0 L 5411.0 3896.0 L 5468.0 3860.0 L 5531.0 3885.0 L 5588.0 3881.0 L 5700.0 3937.0 L 5751.0 3921.0 L 5806.0 3874.0 L 5815.0 3922.0 L 5872.0 3935.0 L 5897.0 3955.0 L 5940.0 3920.0 L 5977.0 3939.0 L 6005.0 3918.0 L 6034.0 3926.0 L 6073.0 3896.0 L 6108.0 3935.0 L 6141.0 3911.0 L 6143.0 3873.0 L 6184.0 3866.0 L 6168.0 3888.0 L 6207.0 3937.0 L 6117.0 4019.0 L 6108.0 4040.0 L 6067.0 4056.0 L 6064.0 4118.0 L 6093.0 4124.0 L 6091.0 4153.0 L 6138.0 4177.0 L 6134.0 4217.0 L 6152.0 4255.0 L 6114.0 4236.0 L 6060.0 4271.0 L 6061.0 4311.0 L 6085.0 4327.0 L 6065.0 4353.0 L 5995.0 4310.0 L 5963.0 4331.0 L 5962.0 4367.0 L 5913.0 4360.0 L 5905.0 4408.0 L 5868.0 4419.0 L 5863.0 4493.0 L 5851.0 4495.0 L 5831.0 4579.0 L 5800.0 4574.0 L 5777.0 4602.0 L 5709.0 4607.0 L 5688.0 4596.0 L 5662.0 4618.0 L 5644.0 4676.0 L 5582.0 4647.0 L 5595.0 4603.0 L 5530.0 4596.0 L 5503.0 4536.0 L 5471.0 4555.0 L 5446.0 4531.0 L 5400.0 4525.0 L 5373.0 4574.0 L 5382.0 4607.0 L 5255.0 4636.0 L 5182.0 4678.0 L 5130.0 4695.0 L 5107.0 4646.0 L 5057.0 4667.0 L 5051.0 4690.0 L 5006.0 4697.0 L 4998.0 4729.0 L 4931.0 4672.0 L 4930.0 4631.0 L 4899.0 4635.0 L 4870.0 4663.0 L 4831.0 4608.0 L 4811.0 4640.0 L 4741.0 4657.0 L 4670.0 4651.0 L 4668.0 4645.0 L 4672.0 4644.0 L 4676.0 4643.0 L 4676.0 4641.0 L 4678.0 4636.0 L 4682.0 4614.0 Z", "cx": 5272.6, "cy": 4222.6}, "WB": {"name": "West Bengal", "capital": "Kolkata", "portal": "Banglarbhumi", "portal_url": "https://banglarbhumi.gov.in", "ror_pct": 99.7, "cadastral_pct": 98.6, "ulpin_status": "Live (Integrated Mutation & Registry)", "svamitva_cards": "11.2 Lakh", "dispute_idx": 67, "research_count": 37, "lat": 22.9868, "lng": 87.855, "districts": [["Kolkata", "Urban Core"], ["South 24 Parganas", "Sundarbans Coastal Cadastre"], ["Darjeeling", "Himalayan Hill Terrains"], ["Paschim Bardhaman", "Mining & Industrial Zone"], ["Malda", "Agricultural Delta"]], "path_d": "M 6393.0 5572.0 L 6415.0 5529.0 L 6390.0 5653.0 L 6359.0 5661.0 L 6374.0 5620.0 L 6363.0 5582.0 L 6393.0 5572.0 Z M 6230.0 5538.0 L 6251.0 5598.0 L 6241.0 5640.0 L 6209.0 5634.0 L 6230.0 5538.0 Z M 6700.0 3916.0 L 6693.0 3910.0 L 6700.0 3909.0 L 6704.0 3916.0 L 6700.0 3916.0 Z M 6143.0 3873.0 L 6164.0 3808.0 L 6142.0 3714.0 L 6093.0 3671.0 L 6099.0 3631.0 L 6126.0 3658.0 L 6196.0 3658.0 L 6238.0 3672.0 L 6287.0 3628.0 L 6339.0 3642.0 L 6378.0 3654.0 L 6382.0 3708.0 L 6452.0 3725.0 L 6468.0 3756.0 L 6542.0 3732.0 L 6575.0 3750.0 L 6639.0 3758.0 L 6627.0 3776.0 L 6706.0 3778.0 L 6715.0 3811.0 L 6714.0 3894.0 L 6714.0 3894.0 L 6713.0 3895.0 L 6681.0 3919.0 L 6674.0 3976.0 L 6646.0 3959.0 L 6634.0 3980.0 L 6636.0 4046.0 L 6575.0 4027.0 L 6559.0 4039.0 L 6492.0 3997.0 L 6463.0 3905.0 L 6409.0 3921.0 L 6457.0 3945.0 L 6428.0 3964.0 L 6379.0 3947.0 L 6339.0 3956.0 L 6332.0 3909.0 L 6248.0 3864.0 L 6233.0 3840.0 L 6218.0 3888.0 L 6266.0 3895.0 L 6260.0 3927.0 L 6221.0 3989.0 L 6174.0 4013.0 L 6151.0 4094.0 L 6169.0 4148.0 L 6209.0 4133.0 L 6273.0 4183.0 L 6304.0 4236.0 L 6357.0 4246.0 L 6389.0 4226.0 L 6396.0 4267.0 L 6421.0 4295.0 L 6460.0 4303.0 L 6435.0 4353.0 L 6357.0 4341.0 L 6319.0 4356.0 L 6278.0 4346.0 L 6284.0 4411.0 L 6268.0 4442.0 L 6229.0 4463.0 L 6195.0 4446.0 L 6176.0 4506.0 L 6147.0 4548.0 L 6211.0 4618.0 L 6261.0 4647.0 L 6389.0 4669.0 L 6399.0 4726.0 L 6400.0 4806.0 L 6368.0 4827.0 L 6348.0 4881.0 L 6356.0 4922.0 L 6377.0 4918.0 L 6412.0 4962.0 L 6429.0 4956.0 L 6400.0 5031.0 L 6441.0 5056.0 L 6473.0 5049.0 L 6481.0 5082.0 L 6462.0 5098.0 L 6461.0 5149.0 L 6499.0 5188.0 L 6485.0 5228.0 L 6517.0 5337.0 L 6513.0 5375.0 L 6545.0 5422.0 L 6534.0 5458.0 L 6552.0 5495.0 L 6524.0 5526.0 L 6537.0 5577.0 L 6563.0 5621.0 L 6506.0 5626.0 L 6474.0 5574.0 L 6485.0 5623.0 L 6434.0 5609.0 L 6426.0 5554.0 L 6433.0 5505.0 L 6401.0 5514.0 L 6378.0 5565.0 L 6300.0 5622.0 L 6295.0 5661.0 L 6266.0 5649.0 L 6263.0 5577.0 L 6242.0 5522.0 L 6263.0 5477.0 L 6249.0 5438.0 L 6171.0 5408.0 L 6183.0 5433.0 L 6232.0 5440.0 L 6252.0 5466.0 L 6207.0 5502.0 L 6179.0 5572.0 L 6097.0 5641.0 L 6024.0 5659.0 L 6006.0 5600.0 L 5952.0 5589.0 L 5935.0 5534.0 L 5912.0 5528.0 L 5889.0 5570.0 L 5856.0 5554.0 L 5867.0 5525.0 L 5840.0 5492.0 L 5758.0 5473.0 L 5760.0 5448.0 L 5814.0 5432.0 L 5798.0 5381.0 L 5771.0 5373.0 L 5766.0 5318.0 L 5731.0 5319.0 L 5725.0 5291.0 L 5650.0 5250.0 L 5674.0 5173.0 L 5578.0 5175.0 L 5520.0 5123.0 L 5479.0 5130.0 L 5452.0 5108.0 L 5462.0 5006.0 L 5520.0 4996.0 L 5514.0 4965.0 L 5551.0 4971.0 L 5550.0 5002.0 L 5578.0 5016.0 L 5620.0 5005.0 L 5621.0 4976.0 L 5648.0 4943.0 L 5676.0 4943.0 L 5735.0 4916.0 L 5762.0 4919.0 L 5770.0 4874.0 L 5793.0 4848.0 L 5879.0 4875.0 L 5873.0 4849.0 L 5907.0 4853.0 L 5923.0 4815.0 L 5903.0 4791.0 L 5972.0 4805.0 L 6003.0 4764.0 L 6051.0 4739.0 L 6036.0 4705.0 L 6071.0 4683.0 L 6086.0 4645.0 L 6079.0 4589.0 L 6115.0 4580.0 L 6111.0 4530.0 L 6093.0 4517.0 L 6127.0 4452.0 L 6062.0 4397.0 L 6065.0 4353.0 L 6085.0 4327.0 L 6061.0 4311.0 L 6060.0 4271.0 L 6114.0 4236.0 L 6152.0 4255.0 L 6134.0 4217.0 L 6138.0 4177.0 L 6091.0 4153.0 L 6093.0 4124.0 L 6064.0 4118.0 L 6067.0 4056.0 L 6108.0 4040.0 L 6117.0 4019.0 L 6207.0 3937.0 L 6168.0 3888.0 L 6184.0 3866.0 L 6143.0 3873.0 Z M 6678.0 3925.0 L 6675.0 3923.0 L 6674.0 3924.0 L 6675.0 3926.0 L 6678.0 3925.0 Z", "cx": 6220.6, "cy": 4675.5}, "OD": {"name": "Odisha", "capital": "Bhubaneswar", "portal": "Bhulekh Odisha & Bhu-Naksha", "portal_url": "https://bhulekh.ori.nic.in", "ror_pct": 99.8, "cadastral_pct": 98.9, "ulpin_status": "Live (Jaga Slum Titling Integration)", "svamitva_cards": "10.7 Lakh", "dispute_idx": 52, "research_count": 34, "lat": 20.9517, "lng": 85.0985, "districts": [["Khordha (Bhubaneswar)", "Capital Urban"], ["Cuttack", "Riverine Mixed"], ["Koraput", "Tribal High Lands"], ["Mayurbhanj", "Similipal Forest CFR Area"], ["Ganjam", "Coastal Agricultural"]], "path_d": "M 6024.0 5659.0 L 5994.0 5686.0 L 5911.0 5698.0 L 5845.0 5756.0 L 5820.0 5804.0 L 5818.0 5850.0 L 5863.0 5933.0 L 5877.0 5996.0 L 5802.0 6054.0 L 5784.0 6109.0 L 5804.0 6127.0 L 5718.0 6187.0 L 5667.0 6268.0 L 5559.0 6309.0 L 5441.0 6345.0 L 5325.0 6408.0 L 5172.0 6534.0 L 5131.0 6593.0 L 5112.0 6568.0 L 5077.0 6585.0 L 5095.0 6601.0 L 5016.0 6617.0 L 5019.0 6652.0 L 4981.0 6701.0 L 4902.0 6715.0 L 4883.0 6695.0 L 4835.0 6694.0 L 4800.0 6623.0 L 4780.0 6634.0 L 4743.0 6575.0 L 4713.0 6625.0 L 4688.0 6602.0 L 4687.0 6647.0 L 4637.0 6631.0 L 4673.0 6678.0 L 4608.0 6712.0 L 4543.0 6785.0 L 4564.0 6796.0 L 4540.0 6827.0 L 4557.0 6847.0 L 4502.0 6860.0 L 4472.0 6831.0 L 4455.0 6869.0 L 4392.0 6892.0 L 4398.0 6855.0 L 4376.0 6849.0 L 4355.0 6797.0 L 4316.0 6842.0 L 4300.0 6927.0 L 4307.0 6974.0 L 4285.0 6994.0 L 4202.0 6969.0 L 4061.0 7056.0 L 3984.0 7060.0 L 4001.0 7035.0 L 4030.0 6935.0 L 4032.0 6898.0 L 4112.0 6843.0 L 4177.0 6780.0 L 4177.0 6747.0 L 4247.0 6707.0 L 4251.0 6670.0 L 4274.0 6664.0 L 4231.0 6481.0 L 4206.0 6440.0 L 4208.0 6350.0 L 4142.0 6312.0 L 4142.0 6267.0 L 4167.0 6240.0 L 4250.0 6283.0 L 4278.0 6285.0 L 4305.0 6335.0 L 4339.0 6309.0 L 4392.0 6323.0 L 4386.0 6354.0 L 4426.0 6335.0 L 4430.0 6279.0 L 4323.0 6257.0 L 4317.0 6223.0 L 4333.0 6175.0 L 4333.0 6122.0 L 4297.0 6077.0 L 4312.0 6049.0 L 4304.0 5959.0 L 4327.0 5979.0 L 4396.0 5903.0 L 4400.0 5863.0 L 4452.0 5866.0 L 4508.0 5852.0 L 4563.0 5878.0 L 4587.0 5864.0 L 4612.0 5817.0 L 4612.0 5779.0 L 4648.0 5791.0 L 4636.0 5739.0 L 4648.0 5694.0 L 4699.0 5628.0 L 4720.0 5586.0 L 4698.0 5535.0 L 4733.0 5473.0 L 4766.0 5467.0 L 4804.0 5429.0 L 4848.0 5419.0 L 4863.0 5385.0 L 4850.0 5365.0 L 4895.0 5383.0 L 4895.0 5400.0 L 4947.0 5429.0 L 4992.0 5423.0 L 5017.0 5399.0 L 5100.0 5387.0 L 5152.0 5394.0 L 5199.0 5371.0 L 5212.0 5429.0 L 5194.0 5503.0 L 5246.0 5519.0 L 5264.0 5541.0 L 5278.0 5512.0 L 5322.0 5484.0 L 5414.0 5519.0 L 5454.0 5496.0 L 5439.0 5533.0 L 5486.0 5542.0 L 5528.0 5467.0 L 5508.0 5446.0 L 5523.0 5424.0 L 5519.0 5381.0 L 5500.0 5371.0 L 5527.0 5331.0 L 5549.0 5357.0 L 5612.0 5378.0 L 5658.0 5416.0 L 5760.0 5448.0 L 5758.0 5473.0 L 5840.0 5492.0 L 5867.0 5525.0 L 5856.0 5554.0 L 5889.0 5570.0 L 5912.0 5528.0 L 5935.0 5534.0 L 5952.0 5589.0 L 6006.0 5600.0 L 6024.0 5659.0 Z", "cx": 4905.1, "cy": 6103.2}, "TG": {"name": "Telangana", "capital": "Hyderabad", "portal": "Dharani Integrated Land Records", "portal_url": "https://dharani.telangana.gov.in", "ror_pct": 100.0, "cadastral_pct": 96.2, "ulpin_status": "Live (Blockchain Registry Pilots)", "svamitva_cards": "8.5 Lakh", "dispute_idx": 63, "research_count": 31, "lat": 18.1124, "lng": 79.0193, "districts": [["Hyderabad", "Metro Urban"], ["Rangareddy", "High-Stakes Peri-Urban Sprawl"], ["Warangal", "Heritage Mixed"], ["Adilabad", "Gond Tribal Belt"], ["Nalgonda", "Krishna Basin Agriculture"]], "path_d": "M 3601.0 6735.0 L 3627.0 6782.0 L 3677.0 6767.0 L 3726.0 6806.0 L 3757.0 6860.0 L 3804.0 6944.0 L 3842.0 6931.0 L 3840.0 6976.0 L 3853.0 7049.0 L 3868.0 7068.0 L 3810.0 7093.0 L 3855.0 7165.0 L 3892.0 7164.0 L 3960.0 7212.0 L 3917.0 7231.0 L 3914.0 7257.0 L 3847.0 7284.0 L 3819.0 7276.0 L 3803.0 7330.0 L 3743.0 7324.0 L 3700.0 7299.0 L 3661.0 7342.0 L 3644.0 7321.0 L 3631.0 7359.0 L 3709.0 7375.0 L 3701.0 7433.0 L 3617.0 7394.0 L 3598.0 7344.0 L 3570.0 7332.0 L 3523.0 7360.0 L 3504.0 7397.0 L 3531.0 7415.0 L 3487.0 7479.0 L 3429.0 7444.0 L 3309.0 7496.0 L 3241.0 7518.0 L 3238.0 7614.0 L 3221.0 7626.0 L 3167.0 7616.0 L 3128.0 7635.0 L 3133.0 7659.0 L 3081.0 7694.0 L 3022.0 7667.0 L 3007.0 7682.0 L 2954.0 7672.0 L 2900.0 7691.0 L 2897.0 7723.0 L 2847.0 7762.0 L 2773.0 7736.0 L 2742.0 7747.0 L 2642.0 7725.0 L 2636.0 7608.0 L 2670.0 7580.0 L 2635.0 7562.0 L 2567.0 7552.0 L 2550.0 7528.0 L 2595.0 7523.0 L 2630.0 7488.0 L 2614.0 7460.0 L 2632.0 7419.0 L 2628.0 7372.0 L 2645.0 7337.0 L 2633.0 7302.0 L 2603.0 7289.0 L 2605.0 7260.0 L 2654.0 7210.0 L 2659.0 7182.0 L 2711.0 7171.0 L 2679.0 7139.0 L 2628.0 7131.0 L 2632.0 7092.0 L 2701.0 6985.0 L 2670.0 6969.0 L 2685.0 6952.0 L 2670.0 6878.0 L 2663.0 6860.0 L 2688.0 6786.0 L 2740.0 6772.0 L 2772.0 6695.0 L 2809.0 6683.0 L 2779.0 6643.0 L 2749.0 6632.0 L 2783.0 6518.0 L 2813.0 6504.0 L 2846.0 6530.0 L 2893.0 6541.0 L 2895.0 6486.0 L 2937.0 6465.0 L 2930.0 6382.0 L 2958.0 6349.0 L 2940.0 6302.0 L 2969.0 6330.0 L 3121.0 6359.0 L 3125.0 6396.0 L 3162.0 6399.0 L 3178.0 6438.0 L 3246.0 6466.0 L 3276.0 6421.0 L 3332.0 6455.0 L 3424.0 6418.0 L 3481.0 6458.0 L 3502.0 6490.0 L 3463.0 6596.0 L 3486.0 6618.0 L 3490.0 6684.0 L 3474.0 6694.0 L 3546.0 6749.0 L 3601.0 6735.0 Z", "cx": 3177.5, "cy": 7089.4}, "AP": {"name": "Andhra Pradesh", "capital": "Amaravati", "portal": "MeeBhoomi & YSR Jagananna Saswatha Bhu Hakku", "portal_url": "https://meebhoomi.ap.gov.in", "ror_pct": 99.8, "cadastral_pct": 95.8, "ulpin_status": "Live (Comprehensive Drone Resurvey)", "svamitva_cards": "12.0 Lakh", "dispute_idx": 60, "research_count": 30, "lat": 15.9129, "lng": 79.74, "districts": [["Visakhapatnam", "Coastal Metro/Port"], ["Krishna", "Fertile Delta Agriculture"], ["Anantapur", "Rainfed Drought-Prone"], ["Chittoor", "Rayalaseema Mixed"]], "path_d": "M 3868.0 7068.0 L 3906.0 7044.0 L 3984.0 7060.0 L 4061.0 7056.0 L 4202.0 6969.0 L 4285.0 6994.0 L 4307.0 6974.0 L 4300.0 6927.0 L 4316.0 6842.0 L 4355.0 6797.0 L 4376.0 6849.0 L 4398.0 6855.0 L 4392.0 6892.0 L 4455.0 6869.0 L 4472.0 6831.0 L 4502.0 6860.0 L 4557.0 6847.0 L 4540.0 6827.0 L 4564.0 6796.0 L 4543.0 6785.0 L 4608.0 6712.0 L 4673.0 6678.0 L 4637.0 6631.0 L 4687.0 6647.0 L 4688.0 6602.0 L 4713.0 6625.0 L 4743.0 6575.0 L 4780.0 6634.0 L 4800.0 6623.0 L 4835.0 6694.0 L 4883.0 6695.0 L 4902.0 6715.0 L 4981.0 6701.0 L 5019.0 6652.0 L 5016.0 6617.0 L 5095.0 6601.0 L 5077.0 6585.0 L 5112.0 6568.0 L 5131.0 6593.0 L 5069.0 6671.0 L 5060.0 6701.0 L 4992.0 6787.0 L 4920.0 6859.0 L 4915.0 6877.0 L 4774.0 6950.0 L 4696.0 7020.0 L 4677.0 7057.0 L 4615.0 7129.0 L 4533.0 7179.0 L 4385.0 7258.0 L 4297.0 7341.0 L 4279.0 7387.0 L 4323.0 7406.0 L 4302.0 7509.0 L 4099.0 7599.0 L 4040.0 7580.0 L 3938.0 7595.0 L 3902.0 7718.0 L 3864.0 7746.0 L 3851.0 7794.0 L 3781.0 7811.0 L 3785.0 7777.0 L 3764.0 7752.0 L 3683.0 7764.0 L 3622.0 7797.0 L 3585.0 7847.0 L 3570.0 7901.0 L 3537.0 7947.0 L 3517.0 8048.0 L 3540.0 8162.0 L 3567.0 8221.0 L 3545.0 8370.0 L 3586.0 8500.0 L 3593.0 8580.0 L 3583.0 8614.0 L 3527.0 8584.0 L 3490.0 8615.0 L 3477.0 8656.0 L 3417.0 8668.0 L 3427.0 8695.0 L 3350.0 8687.0 L 3312.0 8660.0 L 3300.0 8710.0 L 3275.0 8731.0 L 3239.0 8723.0 L 3205.0 8773.0 L 3145.0 8748.0 L 3047.0 8754.0 L 3016.0 8782.0 L 3020.0 8803.0 L 2992.0 8887.0 L 2973.0 8870.0 L 2960.0 8911.0 L 2928.0 8912.0 L 2877.0 8862.0 L 2884.0 8828.0 L 2961.0 8787.0 L 2959.0 8763.0 L 3000.0 8718.0 L 2984.0 8683.0 L 2926.0 8647.0 L 2935.0 8566.0 L 2866.0 8574.0 L 2857.0 8541.0 L 2825.0 8527.0 L 2844.0 8495.0 L 2818.0 8455.0 L 2791.0 8479.0 L 2790.0 8433.0 L 2735.0 8444.0 L 2743.0 8464.0 L 2634.0 8525.0 L 2608.0 8521.0 L 2601.0 8471.0 L 2537.0 8449.0 L 2509.0 8462.0 L 2510.0 8499.0 L 2449.0 8502.0 L 2441.0 8478.0 L 2465.0 8437.0 L 2429.0 8402.0 L 2443.0 8391.0 L 2416.0 8353.0 L 2461.0 8349.0 L 2462.0 8391.0 L 2500.0 8412.0 L 2563.0 8403.0 L 2575.0 8449.0 L 2600.0 8421.0 L 2568.0 8404.0 L 2591.0 8353.0 L 2633.0 8351.0 L 2622.0 8311.0 L 2593.0 8294.0 L 2580.0 8316.0 L 2553.0 8293.0 L 2508.0 8290.0 L 2493.0 8332.0 L 2433.0 8324.0 L 2414.0 8270.0 L 2446.0 8239.0 L 2410.0 8242.0 L 2373.0 8195.0 L 2399.0 8128.0 L 2411.0 8064.0 L 2376.0 8062.0 L 2388.0 8019.0 L 2416.0 8041.0 L 2497.0 8043.0 L 2517.0 7993.0 L 2499.0 7936.0 L 2474.0 7924.0 L 2472.0 7827.0 L 2506.0 7817.0 L 2480.0 7793.0 L 2491.0 7727.0 L 2551.0 7711.0 L 2642.0 7725.0 L 2742.0 7747.0 L 2773.0 7736.0 L 2847.0 7762.0 L 2897.0 7723.0 L 2900.0 7691.0 L 2954.0 7672.0 L 3007.0 7682.0 L 3022.0 7667.0 L 3081.0 7694.0 L 3133.0 7659.0 L 3128.0 7635.0 L 3167.0 7616.0 L 3221.0 7626.0 L 3238.0 7614.0 L 3241.0 7518.0 L 3309.0 7496.0 L 3429.0 7444.0 L 3487.0 7479.0 L 3531.0 7415.0 L 3504.0 7397.0 L 3523.0 7360.0 L 3570.0 7332.0 L 3598.0 7344.0 L 3617.0 7394.0 L 3701.0 7433.0 L 3709.0 7375.0 L 3631.0 7359.0 L 3644.0 7321.0 L 3661.0 7342.0 L 3700.0 7299.0 L 3743.0 7324.0 L 3803.0 7330.0 L 3819.0 7276.0 L 3847.0 7284.0 L 3914.0 7257.0 L 3917.0 7231.0 L 3960.0 7212.0 L 3892.0 7164.0 L 3855.0 7165.0 L 3810.0 7093.0 L 3868.0 7068.0 Z M 4269.0 7443.0 L 4284.0 7457.0 L 4301.0 7445.0 L 4275.0 7447.0 L 4269.0 7443.0 Z", "cx": 3513.6, "cy": 7742.1}, "KL": {"name": "Kerala", "capital": "Thiruvananthapuram", "portal": "ReLIS (Revenue Land Information System)", "portal_url": "https://revenue.kerala.gov.in", "ror_pct": 99.6, "cadastral_pct": 91.4, "ulpin_status": "Digital Survey Mission 'Ente Bhoomi'", "svamitva_cards": "5.6 Lakh", "dispute_idx": 45, "research_count": 29, "lat": 10.8505, "lng": 76.2711, "districts": [["Thiruvananthapuram", "Administrative Capital"], ["Ernakulam", "Port/Commercial Urban"], ["Wayanad", "Western Ghats Ecological Fragile"], ["Palakkad", "Paddy Granary"]], "path_d": "M 1918.0 9226.0 L 1862.0 9172.0 L 1817.0 9110.0 L 1807.0 9117.0 L 1767.0 9013.0 L 1691.0 8843.0 L 1737.0 8831.0 L 1734.0 8852.0 L 1796.0 8877.0 L 1817.0 8914.0 L 1867.0 8955.0 L 1889.0 9013.0 L 1989.0 9097.0 L 2016.0 9094.0 L 2045.0 9142.0 L 2088.0 9149.0 L 2127.0 9133.0 L 2126.0 9175.0 L 2153.0 9171.0 L 2206.0 9220.0 L 2232.0 9212.0 L 2237.0 9246.0 L 2190.0 9279.0 L 2166.0 9279.0 L 2171.0 9316.0 L 2204.0 9317.0 L 2276.0 9357.0 L 2240.0 9413.0 L 2328.0 9427.0 L 2345.0 9467.0 L 2315.0 9512.0 L 2373.0 9533.0 L 2401.0 9566.0 L 2377.0 9633.0 L 2372.0 9737.0 L 2425.0 9768.0 L 2494.0 9720.0 L 2536.0 9770.0 L 2502.0 9809.0 L 2528.0 9857.0 L 2506.0 9892.0 L 2508.0 9943.0 L 2489.0 9986.0 L 2555.0 9989.0 L 2575.0 10025.0 L 2528.0 10098.0 L 2522.0 10151.0 L 2479.0 10198.0 L 2517.0 10250.0 L 2487.0 10296.0 L 2526.0 10368.0 L 2487.0 10447.0 L 2414.0 10421.0 L 2288.0 10254.0 L 2256.0 10204.0 L 2192.0 10050.0 L 2161.0 9853.0 L 2092.0 9653.0 L 2045.0 9555.0 L 2022.0 9441.0 L 1990.0 9353.0 L 1949.0 9309.0 L 1921.0 9231.0 L 1923.0 9227.0 L 1918.0 9226.0 Z M 1921.0 9214.0 L 1921.0 9216.0 L 1920.0 9217.0 L 1918.0 9218.0 L 1918.0 9221.0 L 1920.0 9222.0 L 1920.0 9222.0 L 1920.0 9222.0 L 1922.0 9223.0 L 1924.0 9223.0 L 1925.0 9223.0 L 1925.0 9223.0 L 1926.0 9222.0 L 1927.0 9222.0 L 1927.0 9222.0 L 1927.0 9222.0 L 1928.0 9222.0 L 1929.0 9219.0 L 1925.0 9217.0 L 1924.0 9216.0 L 1924.0 9215.0 L 1925.0 9210.0 L 1924.0 9209.0 L 1924.0 9209.0 L 1925.0 9207.0 L 1921.0 9207.0 L 1920.0 9209.0 L 1921.0 9211.0 L 1921.0 9211.0 L 1921.0 9214.0 Z", "cx": 2107.4, "cy": 9423.7}, "PB": {"name": "Punjab", "capital": "Chandigarh", "portal": "Punjab Jamabandi (PLRS)", "portal_url": "https://jamabandi.punjab.gov.in", "ror_pct": 100.0, "cadastral_pct": 98.4, "ulpin_status": "Live (Agricultural Farmland Geo-coding)", "svamitva_cards": "8.1 Lakh", "dispute_idx": 71, "research_count": 28, "lat": 31.1471, "lng": 75.3412, "districts": [["Ludhiana", "Industrial Metro"], ["Amritsar", "Border Heritage"], ["Bathinda", "Cotton Belt Agriculture"], ["Hoshiarpur", "Kandi Sub-Himalayan"]], "path_d": "M 2558.0 2429.0 L 2585.0 2461.0 L 2584.0 2498.0 L 2584.0 2499.0 L 2578.0 2500.0 L 2588.0 2534.0 L 2558.0 2520.0 L 2467.0 2577.0 L 2494.0 2599.0 L 2460.0 2642.0 L 2416.0 2624.0 L 2373.0 2630.0 L 2354.0 2654.0 L 2356.0 2720.0 L 2355.0 2724.0 L 2355.0 2724.0 L 2353.0 2723.0 L 2352.0 2723.0 L 2350.0 2723.0 L 2348.0 2727.0 L 2347.0 2728.0 L 2346.0 2729.0 L 2341.0 2732.0 L 2301.0 2755.0 L 2245.0 2752.0 L 2232.0 2728.0 L 2193.0 2748.0 L 2151.0 2750.0 L 2115.0 2725.0 L 2072.0 2773.0 L 2062.0 2811.0 L 2040.0 2816.0 L 2026.0 2785.0 L 2047.0 2742.0 L 2039.0 2713.0 L 2019.0 2732.0 L 2009.0 2688.0 L 1973.0 2700.0 L 1952.0 2666.0 L 1917.0 2648.0 L 1864.0 2677.0 L 1827.0 2661.0 L 1631.0 2639.0 L 1660.0 2559.0 L 1635.0 2498.0 L 1671.0 2447.0 L 1714.0 2414.0 L 1814.0 2302.0 L 1893.0 2263.0 L 1901.0 2236.0 L 1860.0 2249.0 L 1853.0 2182.0 L 1893.0 2107.0 L 1889.0 2079.0 L 1851.0 2020.0 L 1913.0 1953.0 L 1957.0 1940.0 L 1978.0 1911.0 L 2029.0 1915.0 L 2104.0 1891.0 L 2135.0 1850.0 L 2125.0 1812.0 L 2186.0 1816.0 L 2245.0 1791.0 L 2296.0 1737.0 L 2290.0 1764.0 L 2310.0 1797.0 L 2250.0 1844.0 L 2214.0 1856.0 L 2219.0 1913.0 L 2292.0 1962.0 L 2313.0 2012.0 L 2298.0 2011.0 L 2320.0 2073.0 L 2363.0 2162.0 L 2367.0 2198.0 L 2407.0 2192.0 L 2426.0 2161.0 L 2452.0 2202.0 L 2490.0 2232.0 L 2503.0 2271.0 L 2497.0 2312.0 L 2545.0 2349.0 L 2562.0 2376.0 L 2561.0 2401.0 L 2553.0 2401.0 L 2553.0 2401.0 L 2519.0 2401.0 L 2536.0 2428.0 L 2542.0 2431.0 L 2549.0 2435.0 L 2555.0 2429.0 L 2558.0 2429.0 Z", "cx": 2230.8, "cy": 2390.8}, "HR": {"name": "Haryana", "capital": "Chandigarh", "portal": "Jamabandi Haryana & Web-HALRIS", "portal_url": "https://jamabandi.nic.in", "ror_pct": 100.0, "cadastral_pct": 99.3, "ulpin_status": "Live (Lal Dora Free Abadi Pioneer)", "svamitva_cards": "15.4 Lakh", "dispute_idx": 73, "research_count": 33, "lat": 29.0588, "lng": 76.0856, "districts": [["Gurugram", "NCR Corporate Urban Sprawl"], ["Faridabad", "Heavy Industrial Hub"], ["Karnal", "GT Road Agro-Belt"], ["Nuh (Mewat)", "Aravalli Rural Semi-Arid"]], "path_d": "M 2354.0 2654.0 L 2373.0 2630.0 L 2416.0 2624.0 L 2460.0 2642.0 L 2494.0 2599.0 L 2467.0 2577.0 L 2558.0 2520.0 L 2588.0 2534.0 L 2584.0 2498.0 L 2586.0 2494.0 L 2586.0 2488.0 L 2585.0 2461.0 L 2558.0 2429.0 L 2563.0 2419.0 L 2561.0 2401.0 L 2562.0 2376.0 L 2545.0 2349.0 L 2586.0 2354.0 L 2618.0 2411.0 L 2661.0 2432.0 L 2656.0 2470.0 L 2647.0 2475.0 L 2646.0 2475.0 L 2654.0 2486.0 L 2657.0 2487.0 L 2673.0 2498.0 L 2673.0 2500.0 L 2674.0 2507.0 L 2718.0 2515.0 L 2739.0 2535.0 L 2769.0 2522.0 L 2788.0 2545.0 L 2786.0 2572.0 L 2735.0 2642.0 L 2694.0 2660.0 L 2659.0 2714.0 L 2626.0 2822.0 L 2636.0 2863.0 L 2632.0 3001.0 L 2659.0 3036.0 L 2649.0 3086.0 L 2606.0 3082.0 L 2571.0 3100.0 L 2566.0 3166.0 L 2535.0 3193.0 L 2547.0 3206.0 L 2619.0 3219.0 L 2637.0 3250.0 L 2692.0 3216.0 L 2740.0 3272.0 L 2731.0 3303.0 L 2753.0 3309.0 L 2732.0 3384.0 L 2750.0 3403.0 L 2728.0 3438.0 L 2665.0 3467.0 L 2651.0 3474.0 L 2648.0 3471.0 L 2639.0 3461.0 L 2637.0 3463.0 L 2637.0 3469.0 L 2589.0 3460.0 L 2566.0 3518.0 L 2539.0 3493.0 L 2554.0 3454.0 L 2553.0 3395.0 L 2569.0 3343.0 L 2539.0 3313.0 L 2469.0 3356.0 L 2471.0 3384.0 L 2434.0 3400.0 L 2413.0 3350.0 L 2414.0 3351.0 L 2421.0 3351.0 L 2413.0 3333.0 L 2358.0 3329.0 L 2357.0 3331.0 L 2361.0 3332.0 L 2368.0 3377.0 L 2318.0 3364.0 L 2309.0 3388.0 L 2324.0 3440.0 L 2246.0 3431.0 L 2236.0 3412.0 L 2263.0 3363.0 L 2266.0 3363.0 L 2272.0 3359.0 L 2264.0 3356.0 L 2241.0 3349.0 L 2272.0 3321.0 L 2292.0 3328.0 L 2241.0 3249.0 L 2192.0 3229.0 L 2197.0 3216.0 L 2181.0 3200.0 L 2149.0 3166.0 L 2149.0 3162.0 L 2146.0 3160.0 L 2129.0 3156.0 L 2107.0 3038.0 L 2089.0 2994.0 L 2083.0 2978.0 L 2076.0 2963.0 L 2079.0 2960.0 L 2079.0 2953.0 L 2089.0 2921.0 L 2066.0 2908.0 L 1998.0 2929.0 L 1950.0 2893.0 L 1949.0 2888.0 L 1946.0 2886.0 L 1944.0 2876.0 L 1926.0 2868.0 L 1924.0 2864.0 L 1920.0 2861.0 L 1896.0 2875.0 L 1857.0 2869.0 L 1854.0 2875.0 L 1853.0 2883.0 L 1832.0 2855.0 L 1850.0 2731.0 L 1808.0 2732.0 L 1836.0 2689.0 L 1827.0 2661.0 L 1864.0 2677.0 L 1917.0 2648.0 L 1952.0 2666.0 L 1973.0 2700.0 L 2009.0 2688.0 L 2019.0 2732.0 L 2039.0 2713.0 L 2047.0 2742.0 L 2026.0 2785.0 L 2040.0 2816.0 L 2062.0 2811.0 L 2072.0 2773.0 L 2115.0 2725.0 L 2151.0 2750.0 L 2193.0 2748.0 L 2232.0 2728.0 L 2245.0 2752.0 L 2301.0 2755.0 L 2346.0 2729.0 L 2354.0 2724.0 L 2355.0 2724.0 L 2355.0 2724.0 L 2354.0 2654.0 Z", "cx": 2361.2, "cy": 2947.2}, "JH": {"name": "Jharkhand", "capital": "Ranchi", "portal": "Jharbhoomi & Bhu-Naksha", "portal_url": "https://jharbhoomi.jharkhand.gov.in", "ror_pct": 98.9, "cadastral_pct": 86.2, "ulpin_status": "Live (CNT/SPT Act Digitization)", "svamitva_cards": "6.2 Lakh", "dispute_idx": 76, "research_count": 27, "lat": 23.6102, "lng": 85.2799, "districts": [["Ranchi", "Plateau Urban Center"], ["East Singhbhum (Jamshedpur)", "Industrial Township"], ["Dumka", "Santhal Parganas Protected Area"], ["Dhanbad", "Coalfields Mining Concessions"]], "path_d": "M 4615.0 4804.0 L 4653.0 4706.0 L 4635.0 4661.0 L 4670.0 4651.0 L 4741.0 4657.0 L 4811.0 4640.0 L 4831.0 4608.0 L 4870.0 4663.0 L 4899.0 4635.0 L 4930.0 4631.0 L 4931.0 4672.0 L 4998.0 4729.0 L 5006.0 4697.0 L 5051.0 4690.0 L 5057.0 4667.0 L 5107.0 4646.0 L 5130.0 4695.0 L 5182.0 4678.0 L 5255.0 4636.0 L 5382.0 4607.0 L 5373.0 4574.0 L 5400.0 4525.0 L 5446.0 4531.0 L 5471.0 4555.0 L 5503.0 4536.0 L 5530.0 4596.0 L 5595.0 4603.0 L 5582.0 4647.0 L 5644.0 4676.0 L 5662.0 4618.0 L 5688.0 4596.0 L 5709.0 4607.0 L 5777.0 4602.0 L 5800.0 4574.0 L 5831.0 4579.0 L 5851.0 4495.0 L 5863.0 4493.0 L 5868.0 4419.0 L 5905.0 4408.0 L 5913.0 4360.0 L 5962.0 4367.0 L 5963.0 4331.0 L 5995.0 4310.0 L 6065.0 4353.0 L 6062.0 4397.0 L 6127.0 4452.0 L 6093.0 4517.0 L 6111.0 4530.0 L 6115.0 4580.0 L 6079.0 4589.0 L 6086.0 4645.0 L 6071.0 4683.0 L 6036.0 4705.0 L 6051.0 4739.0 L 6003.0 4764.0 L 5972.0 4805.0 L 5903.0 4791.0 L 5923.0 4815.0 L 5907.0 4853.0 L 5873.0 4849.0 L 5879.0 4875.0 L 5793.0 4848.0 L 5770.0 4874.0 L 5762.0 4919.0 L 5735.0 4916.0 L 5676.0 4943.0 L 5648.0 4943.0 L 5621.0 4976.0 L 5620.0 5005.0 L 5578.0 5016.0 L 5550.0 5002.0 L 5551.0 4971.0 L 5514.0 4965.0 L 5520.0 4996.0 L 5462.0 5006.0 L 5452.0 5108.0 L 5479.0 5130.0 L 5520.0 5123.0 L 5578.0 5175.0 L 5674.0 5173.0 L 5650.0 5250.0 L 5725.0 5291.0 L 5731.0 5319.0 L 5766.0 5318.0 L 5771.0 5373.0 L 5798.0 5381.0 L 5814.0 5432.0 L 5760.0 5448.0 L 5658.0 5416.0 L 5612.0 5378.0 L 5549.0 5357.0 L 5527.0 5331.0 L 5500.0 5371.0 L 5519.0 5381.0 L 5523.0 5424.0 L 5508.0 5446.0 L 5528.0 5467.0 L 5486.0 5542.0 L 5439.0 5533.0 L 5454.0 5496.0 L 5414.0 5519.0 L 5322.0 5484.0 L 5278.0 5512.0 L 5264.0 5541.0 L 5246.0 5519.0 L 5194.0 5503.0 L 5212.0 5429.0 L 5199.0 5371.0 L 5152.0 5394.0 L 5100.0 5387.0 L 5017.0 5399.0 L 4992.0 5423.0 L 4947.0 5429.0 L 4895.0 5400.0 L 4895.0 5383.0 L 4850.0 5365.0 L 4875.0 5323.0 L 4925.0 5303.0 L 4969.0 5200.0 L 4895.0 5206.0 L 4887.0 5162.0 L 4854.0 5138.0 L 4866.0 5075.0 L 4832.0 5060.0 L 4850.0 4991.0 L 4767.0 4981.0 L 4751.0 4925.0 L 4724.0 4893.0 L 4693.0 4886.0 L 4677.0 4830.0 L 4615.0 4804.0 Z M 5000.0 4738.0 L 5002.0 4736.0 L 4997.0 4731.0 L 4998.0 4736.0 L 5000.0 4738.0 Z", "cx": 5414.8, "cy": 4932.9}, "CG": {"name": "Chhattisgarh", "capital": "Raipur", "portal": "Bhuiyan & Bhu-Naksha", "portal_url": "https://bhuiyan.cg.nic.in", "ror_pct": 99.8, "cadastral_pct": 97.9, "ulpin_status": "Live (Community Forest Titles Integrated)", "svamitva_cards": "7.9 Lakh", "dispute_idx": 56, "research_count": 26, "lat": 21.2787, "lng": 81.8661, "districts": [["Raipur", "Urban Center"], ["Bastar", "Dandakaranya Forest Tribal"], ["Bilaspur", "Arpa Basin Mixed"], ["Korba", "Thermal Power & Coal Basin"]], "path_d": "M 4154.0 5013.0 L 4115.0 5015.0 L 4080.0 5017.0 L 4075.0 5015.0 L 4071.0 5014.0 L 4067.0 5014.0 L 4050.0 4990.0 L 4060.0 4968.0 L 4074.0 4938.0 L 4075.0 4936.0 L 4072.0 4933.0 L 4071.0 4933.0 L 4063.0 4930.0 L 4048.0 4886.0 L 4069.0 4873.0 L 4119.0 4914.0 L 4153.0 4891.0 L 4196.0 4910.0 L 4360.0 4918.0 L 4411.0 4871.0 L 4411.0 4870.0 L 4412.0 4870.0 L 4417.0 4871.0 L 4427.0 4871.0 L 4435.0 4865.0 L 4446.0 4856.0 L 4494.0 4888.0 L 4552.0 4881.0 L 4615.0 4804.0 L 4677.0 4830.0 L 4693.0 4886.0 L 4724.0 4893.0 L 4751.0 4925.0 L 4767.0 4981.0 L 4850.0 4991.0 L 4832.0 5060.0 L 4866.0 5075.0 L 4854.0 5138.0 L 4887.0 5162.0 L 4895.0 5206.0 L 4969.0 5200.0 L 4925.0 5303.0 L 4875.0 5323.0 L 4850.0 5365.0 L 4863.0 5385.0 L 4848.0 5419.0 L 4804.0 5429.0 L 4766.0 5467.0 L 4733.0 5473.0 L 4698.0 5535.0 L 4720.0 5586.0 L 4699.0 5628.0 L 4648.0 5694.0 L 4636.0 5739.0 L 4648.0 5791.0 L 4612.0 5779.0 L 4612.0 5817.0 L 4587.0 5864.0 L 4563.0 5878.0 L 4508.0 5852.0 L 4452.0 5866.0 L 4400.0 5863.0 L 4396.0 5903.0 L 4327.0 5979.0 L 4304.0 5959.0 L 4312.0 6049.0 L 4297.0 6077.0 L 4333.0 6122.0 L 4333.0 6175.0 L 4317.0 6223.0 L 4323.0 6257.0 L 4430.0 6279.0 L 4426.0 6335.0 L 4386.0 6354.0 L 4392.0 6323.0 L 4339.0 6309.0 L 4305.0 6335.0 L 4278.0 6285.0 L 4250.0 6283.0 L 4167.0 6240.0 L 4142.0 6267.0 L 4142.0 6312.0 L 4208.0 6350.0 L 4206.0 6440.0 L 4231.0 6481.0 L 4274.0 6664.0 L 4251.0 6670.0 L 4247.0 6707.0 L 4177.0 6747.0 L 4177.0 6780.0 L 4112.0 6843.0 L 4032.0 6898.0 L 4030.0 6935.0 L 4001.0 7035.0 L 3984.0 7060.0 L 3906.0 7044.0 L 3868.0 7068.0 L 3853.0 7049.0 L 3842.0 6940.0 L 3843.0 6935.0 L 3842.0 6931.0 L 3804.0 6944.0 L 3757.0 6862.0 L 3757.0 6860.0 L 3757.0 6860.0 L 3754.0 6853.0 L 3726.0 6806.0 L 3677.0 6767.0 L 3627.0 6782.0 L 3601.0 6735.0 L 3628.0 6701.0 L 3602.0 6638.0 L 3643.0 6547.0 L 3706.0 6492.0 L 3717.0 6523.0 L 3766.0 6532.0 L 3797.0 6507.0 L 3779.0 6482.0 L 3810.0 6449.0 L 3757.0 6417.0 L 3738.0 6387.0 L 3649.0 6309.0 L 3689.0 6302.0 L 3696.0 6238.0 L 3646.0 6225.0 L 3643.0 6190.0 L 3722.0 6161.0 L 3711.0 6137.0 L 3724.0 6061.0 L 3676.0 6056.0 L 3709.0 6034.0 L 3696.0 5946.0 L 3669.0 5945.0 L 3657.0 5916.0 L 3669.0 5858.0 L 3704.0 5846.0 L 3736.0 5801.0 L 3761.0 5751.0 L 3753.0 5680.0 L 3764.0 5649.0 L 3788.0 5653.0 L 3811.0 5541.0 L 3833.0 5520.0 L 3844.0 5545.0 L 3858.0 5480.0 L 3889.0 5457.0 L 3888.0 5405.0 L 3925.0 5401.0 L 3958.0 5375.0 L 3983.0 5404.0 L 3997.0 5385.0 L 4008.0 5386.0 L 4010.0 5386.0 L 4011.0 5386.0 L 4054.0 5370.0 L 4091.0 5320.0 L 4100.0 5330.0 L 4105.0 5324.0 L 4106.0 5320.0 L 4106.0 5294.0 L 4106.0 5249.0 L 4163.0 5219.0 L 4162.0 5176.0 L 4221.0 5166.0 L 4243.0 5086.0 L 4213.0 5061.0 L 4180.0 5055.0 L 4177.0 5054.0 L 4172.0 5053.0 L 4154.0 5013.0 Z", "cx": 4164.2, "cy": 5773.3}, "AS": {"name": "Assam", "capital": "Dispur", "portal": "Dharitree & Mission Basundhara 3.0", "portal_url": "https://landrevenue.assam.gov.in", "ror_pct": 99.2, "cadastral_pct": 89.1, "ulpin_status": "Mission Basundhara Geo-tagging", "svamitva_cards": "5.1 Lakh", "dispute_idx": 64, "research_count": 25, "lat": 26.2006, "lng": 92.9376, "districts": [["Kamrup Metro (Guwahati)", "Northeast Urban Gateway"], ["Dibrugarh", "Upper Assam Tea Cadastre"], ["Cachar (Silchar)", "Barak Valley Riverine"], ["Karbi Anglong", "Sixth Schedule Hill Tribal"]], "path_d": "M 6678.0 3925.0 L 6675.0 3926.0 L 6674.0 3924.0 L 6675.0 3923.0 L 6678.0 3925.0 Z M 7544.0 4515.0 L 7537.0 4451.0 L 7552.0 4410.0 L 7534.0 4383.0 L 7557.0 4363.0 L 7584.0 4380.0 L 7621.0 4375.0 L 7592.0 4318.0 L 7596.0 4317.0 L 7597.0 4315.0 L 7622.0 4276.0 L 7654.0 4282.0 L 7711.0 4240.0 L 7705.0 4215.0 L 7655.0 4166.0 L 7652.0 4167.0 L 7640.0 4173.0 L 7635.0 4152.0 L 7633.0 4140.0 L 7629.0 4125.0 L 7621.0 4117.0 L 7619.0 4115.0 L 7557.0 4058.0 L 7489.0 4095.0 L 7479.0 4043.0 L 7498.0 4005.0 L 7478.0 3987.0 L 7519.0 3943.0 L 7401.0 3976.0 L 7360.0 3941.0 L 7333.0 3965.0 L 7333.0 4003.0 L 7297.0 4011.0 L 7281.0 3981.0 L 7259.0 4039.0 L 7258.0 4043.0 L 7257.0 4043.0 L 7255.0 4045.0 L 7254.0 4045.0 L 7253.0 4044.0 L 7253.0 4044.0 L 7253.0 4044.0 L 7251.0 4046.0 L 7210.0 4055.0 L 7177.0 4100.0 L 7167.0 4058.0 L 7101.0 4070.0 L 7084.0 4030.0 L 7015.0 4027.0 L 6977.0 4044.0 L 6925.0 4013.0 L 6810.0 4042.0 L 6742.0 4130.0 L 6786.0 4170.0 L 6744.0 4191.0 L 6734.0 4221.0 L 6740.0 4171.0 L 6714.0 4099.0 L 6734.0 4054.0 L 6710.0 4037.0 L 6674.0 3976.0 L 6681.0 3919.0 L 6712.0 3895.0 L 6713.0 3895.0 L 6714.0 3895.0 L 6714.0 3894.0 L 6714.0 3894.0 L 6714.0 3894.0 L 6714.0 3894.0 L 6715.0 3811.0 L 6706.0 3778.0 L 6812.0 3747.0 L 6822.0 3714.0 L 6880.0 3694.0 L 6961.0 3734.0 L 7092.0 3722.0 L 7102.0 3707.0 L 7183.0 3715.0 L 7205.0 3693.0 L 7229.0 3707.0 L 7309.0 3692.0 L 7361.0 3650.0 L 7415.0 3670.0 L 7430.0 3652.0 L 7458.0 3651.0 L 7538.0 3618.0 L 7583.0 3614.0 L 7604.0 3584.0 L 7675.0 3588.0 L 7725.0 3617.0 L 7831.0 3590.0 L 7870.0 3595.0 L 7937.0 3576.0 L 7985.0 3532.0 L 7973.0 3506.0 L 8074.0 3376.0 L 8106.0 3355.0 L 8087.0 3328.0 L 8169.0 3336.0 L 8256.0 3287.0 L 8299.0 3254.0 L 8434.0 3190.0 L 8457.0 3198.0 L 8498.0 3179.0 L 8524.0 3147.0 L 8643.0 3129.0 L 8583.0 3224.0 L 8601.0 3268.0 L 8631.0 3285.0 L 8626.0 3331.0 L 8659.0 3322.0 L 8684.0 3346.0 L 8635.0 3380.0 L 8550.0 3414.0 L 8530.0 3402.0 L 8511.0 3454.0 L 8447.0 3500.0 L 8429.0 3497.0 L 8397.0 3534.0 L 8333.0 3549.0 L 8310.0 3598.0 L 8275.0 3629.0 L 8223.0 3645.0 L 8190.0 3681.0 L 8165.0 3740.0 L 8150.0 3704.0 L 8122.0 3745.0 L 8120.0 3790.0 L 8102.0 3797.0 L 8076.0 3851.0 L 8065.0 3930.0 L 8075.0 3947.0 L 8018.0 3993.0 L 8005.0 3939.0 L 7987.0 3982.0 L 7874.0 4105.0 L 7919.0 4139.0 L 7929.0 4187.0 L 7908.0 4206.0 L 7853.0 4378.0 L 7826.0 4379.0 L 7822.0 4439.0 L 7802.0 4530.0 L 7746.0 4537.0 L 7720.0 4494.0 L 7699.0 4560.0 L 7680.0 4566.0 L 7633.0 4643.0 L 7615.0 4601.0 L 7573.0 4605.0 L 7545.0 4608.0 L 7561.0 4556.0 L 7544.0 4515.0 Z M 6700.0 3916.0 L 6704.0 3916.0 L 6700.0 3909.0 L 6693.0 3910.0 L 6700.0 3916.0 Z", "cx": 7546.6, "cy": 3912.4}, "UK": {"name": "Uttarakhand", "capital": "Dehradun", "portal": "Uttarakhand Bhulekh (Devbhoomi)", "portal_url": "https://bhulekh.uk.gov.in", "ror_pct": 99.5, "cadastral_pct": 93.6, "ulpin_status": "Live (Hill Slope Terrain Mapping)", "svamitva_cards": "4.8 Lakh", "dispute_idx": 51, "research_count": 22, "lat": 30.0668, "lng": 79.0193, "districts": [["Dehradun", "Valley Urban Sprawl"], ["Haridwar", "Gangetic Plains Mixed"], ["Nainital", "Kumaon Hills Tourist Cadastre"], ["Chamoli", "High Himalayan Ecological"]], "path_d": "M 3209.0 2242.0 L 3257.0 2166.0 L 3279.0 2179.0 L 3314.0 2230.0 L 3329.0 2284.0 L 3364.0 2324.0 L 3391.0 2324.0 L 3418.0 2359.0 L 3464.0 2337.0 L 3499.0 2346.0 L 3518.0 2378.0 L 3576.0 2419.0 L 3593.0 2407.0 L 3617.0 2433.0 L 3599.0 2459.0 L 3609.0 2490.0 L 3693.0 2523.0 L 3727.0 2526.0 L 3795.0 2585.0 L 3851.0 2603.0 L 3862.0 2626.0 L 3829.0 2634.0 L 3749.0 2711.0 L 3715.0 2725.0 L 3689.0 2771.0 L 3652.0 2795.0 L 3669.0 2828.0 L 3646.0 2871.0 L 3613.0 2895.0 L 3634.0 2940.0 L 3620.0 3003.0 L 3594.0 3007.0 L 3554.0 3084.0 L 3555.0 3116.0 L 3533.0 3158.0 L 3512.0 3152.0 L 3466.0 3095.0 L 3428.0 3110.0 L 3351.0 3106.0 L 3336.0 3065.0 L 3276.0 3048.0 L 3268.0 3010.0 L 3234.0 2991.0 L 3223.0 3011.0 L 3193.0 2994.0 L 3177.0 2958.0 L 3135.0 2937.0 L 3194.0 2892.0 L 3130.0 2868.0 L 3074.0 2816.0 L 3067.0 2784.0 L 3019.0 2763.0 L 2924.0 2838.0 L 2889.0 2789.0 L 2858.0 2804.0 L 2823.0 2732.0 L 2832.0 2689.0 L 2898.0 2598.0 L 2785.0 2538.0 L 2859.0 2502.0 L 2862.0 2484.0 L 2829.0 2417.0 L 2860.0 2377.0 L 2845.0 2339.0 L 2894.0 2272.0 L 2934.0 2272.0 L 3022.0 2227.0 L 3074.0 2259.0 L 3114.0 2248.0 L 3174.0 2261.0 L 3200.0 2298.0 L 3236.0 2293.0 L 3209.0 2242.0 Z", "cx": 3318.1, "cy": 2641.9}, "HP": {"name": "Himachal Pradesh", "capital": "Shimla", "portal": "HimBhoomi (Revenue Department HP)", "portal_url": "https://himbhoomi.hp.gov.in", "ror_pct": 100.0, "cadastral_pct": 94.7, "ulpin_status": "Live (Section 118 Land Regulation)", "svamitva_cards": "3.9 Lakh", "dispute_idx": 47, "research_count": 21, "lat": 31.1048, "lng": 77.1734, "districts": [["Shimla", "State Capital Hill Cadastre"], ["Kangra", "Tea & Agro Mixed"], ["Mandi", "Beas Valley Mixed"], ["Lahaul and Spiti", "Cold Desert Trans-Himalayan"]], "path_d": "M 2661.0 2432.0 L 2618.0 2411.0 L 2586.0 2354.0 L 2545.0 2349.0 L 2497.0 2312.0 L 2503.0 2271.0 L 2490.0 2232.0 L 2452.0 2202.0 L 2426.0 2161.0 L 2407.0 2192.0 L 2367.0 2198.0 L 2363.0 2162.0 L 2320.0 2073.0 L 2298.0 2011.0 L 2313.0 2012.0 L 2292.0 1962.0 L 2219.0 1913.0 L 2214.0 1856.0 L 2250.0 1844.0 L 2310.0 1797.0 L 2290.0 1764.0 L 2296.0 1737.0 L 2313.0 1713.0 L 2312.0 1672.0 L 2276.0 1622.0 L 2301.0 1610.0 L 2321.0 1627.0 L 2371.0 1586.0 L 2415.0 1578.0 L 2462.0 1526.0 L 2512.0 1519.0 L 2535.0 1537.0 L 2597.0 1511.0 L 2588.0 1542.0 L 2645.0 1604.0 L 2686.0 1609.0 L 2692.0 1633.0 L 2751.0 1667.0 L 2822.0 1628.0 L 2861.0 1618.0 L 2874.0 1657.0 L 2920.0 1694.0 L 2915.0 1720.0 L 2936.0 1757.0 L 2973.0 1733.0 L 3000.0 1733.0 L 3058.0 1700.0 L 3062.0 1749.0 L 3033.0 1765.0 L 3037.0 1801.0 L 3059.0 1783.0 L 3099.0 1823.0 L 3074.0 1885.0 L 3121.0 1896.0 L 3114.0 1917.0 L 3173.0 1975.0 L 3148.0 2042.0 L 3159.0 2086.0 L 3187.0 2109.0 L 3154.0 2140.0 L 3170.0 2190.0 L 3209.0 2242.0 L 3236.0 2293.0 L 3200.0 2298.0 L 3174.0 2261.0 L 3114.0 2248.0 L 3074.0 2259.0 L 3022.0 2227.0 L 2934.0 2272.0 L 2894.0 2272.0 L 2845.0 2339.0 L 2860.0 2377.0 L 2829.0 2417.0 L 2862.0 2484.0 L 2859.0 2502.0 L 2785.0 2538.0 L 2789.0 2544.0 L 2788.0 2545.0 L 2769.0 2522.0 L 2739.0 2535.0 L 2718.0 2515.0 L 2674.0 2507.0 L 2657.0 2487.0 L 2646.0 2475.0 L 2661.0 2432.0 Z", "cx": 2726.8, "cy": 2021.1}, "JK": {"name": "Jammu & Kashmir", "capital": "Srinagar / Jammu", "portal": "J&K Land Records (Apki Zameen Apki Nigrani)", "portal_url": "https://landrecords.jk.gov.in", "ror_pct": 99.1, "cadastral_pct": 88.5, "ulpin_status": "Rollout under DILRMP Phase 2", "svamitva_cards": "3.2 Lakh", "dispute_idx": 62, "research_count": 24, "lat": 33.7782, "lng": 76.5762, "districts": [["Srinagar", "Kashmir Valley Urban"], ["Jammu", "Tawi River Urban Core"], ["Baramulla", "Horticultural Agri Belt"], ["Anantnag", "South Kashmir Mixed"], ["Leh and Kargil (Ladakh Division)", "High Altitude Trans-Himalayan"]], "path_d": "M 2125.0 1812.0 L 2063.0 1787.0 L 2035.0 1753.0 L 2007.0 1769.0 L 1987.0 1755.0 L 1927.0 1749.0 L 1917.0 1704.0 L 1941.0 1624.0 L 1919.0 1653.0 L 1843.0 1646.0 L 1783.0 1597.0 L 1727.0 1574.0 L 1719.0 1555.0 L 1673.0 1558.0 L 1640.0 1513.0 L 1622.0 1512.0 L 1634.0 1471.0 L 1608.0 1410.0 L 1632.0 1336.0 L 1615.0 1319.0 L 1630.0 1219.0 L 1611.0 1179.0 L 1610.0 1102.0 L 1590.0 1040.0 L 1609.0 972.0 L 1663.0 981.0 L 1696.0 909.0 L 1752.0 898.0 L 1802.0 855.0 L 1802.0 816.0 L 1824.0 795.0 L 1762.0 754.0 L 1703.0 744.0 L 1702.0 697.0 L 1733.0 662.0 L 1732.0 639.0 L 1689.0 619.0 L 1622.0 617.0 L 1546.0 555.0 L 1555.0 511.0 L 1482.0 500.0 L 1462.0 487.0 L 1419.0 503.0 L 1376.0 469.0 L 1398.0 431.0 L 1380.0 413.0 L 1405.0 345.0 L 1430.0 348.0 L 1526.0 285.0 L 1566.0 234.0 L 1573.0 206.0 L 1663.0 193.0 L 1738.0 220.0 L 1797.0 217.0 L 1788.0 187.0 L 1750.0 168.0 L 1742.0 138.0 L 1796.0 149.0 L 1843.0 184.0 L 1881.0 152.0 L 1906.0 160.0 L 1957.0 126.0 L 1999.0 144.0 L 2002.0 110.0 L 2039.0 100.0 L 2074.0 121.0 L 2095.0 164.0 L 2126.0 142.0 L 2145.0 155.0 L 2183.0 124.0 L 2222.0 121.0 L 2223.0 146.0 L 2256.0 211.0 L 2294.0 230.0 L 2329.0 294.0 L 2378.0 328.0 L 2420.0 339.0 L 2471.0 388.0 L 2500.0 385.0 L 2521.0 425.0 L 2580.0 452.0 L 2625.0 503.0 L 2601.0 536.0 L 2623.0 574.0 L 2661.0 599.0 L 2715.0 597.0 L 2730.0 621.0 L 2783.0 628.0 L 2806.0 656.0 L 2807.0 720.0 L 2888.0 718.0 L 2890.0 701.0 L 2939.0 723.0 L 2960.0 681.0 L 3009.0 700.0 L 3051.0 635.0 L 3096.0 614.0 L 3124.0 622.0 L 3165.0 591.0 L 3253.0 579.0 L 3305.0 599.0 L 3336.0 547.0 L 3378.0 545.0 L 3387.0 579.0 L 3482.0 616.0 L 3518.0 623.0 L 3556.0 603.0 L 3590.0 661.0 L 3642.0 688.0 L 3652.0 735.0 L 3608.0 844.0 L 3604.0 908.0 L 3575.0 965.0 L 3573.0 1006.0 L 3511.0 1015.0 L 3485.0 1038.0 L 3483.0 1089.0 L 3406.0 1090.0 L 3421.0 1113.0 L 3427.0 1175.0 L 3405.0 1185.0 L 3377.0 1255.0 L 3311.0 1241.0 L 3256.0 1240.0 L 3223.0 1267.0 L 3280.0 1397.0 L 3225.0 1389.0 L 3227.0 1461.0 L 3245.0 1498.0 L 3383.0 1526.0 L 3346.0 1612.0 L 3384.0 1648.0 L 3433.0 1714.0 L 3377.0 1786.0 L 3338.0 1765.0 L 3281.0 1807.0 L 3275.0 1838.0 L 3234.0 1853.0 L 3188.0 1817.0 L 3172.0 1724.0 L 3127.0 1759.0 L 3101.0 1754.0 L 3059.0 1783.0 L 3037.0 1801.0 L 3033.0 1765.0 L 3062.0 1749.0 L 3058.0 1700.0 L 3000.0 1733.0 L 2973.0 1733.0 L 2936.0 1757.0 L 2915.0 1720.0 L 2920.0 1694.0 L 2874.0 1657.0 L 2861.0 1618.0 L 2822.0 1628.0 L 2751.0 1667.0 L 2692.0 1633.0 L 2686.0 1609.0 L 2645.0 1604.0 L 2588.0 1542.0 L 2597.0 1511.0 L 2535.0 1537.0 L 2512.0 1519.0 L 2462.0 1526.0 L 2415.0 1578.0 L 2371.0 1586.0 L 2321.0 1627.0 L 2301.0 1610.0 L 2276.0 1622.0 L 2312.0 1672.0 L 2313.0 1713.0 L 2296.0 1737.0 L 2245.0 1791.0 L 2186.0 1816.0 L 2125.0 1812.0 Z", "cx": 2473.2, "cy": 1012.4}, "GA": {"name": "Goa", "capital": "Panaji", "portal": "Goa Bhulekh (Directorate of Land Survey)", "portal_url": "https://goabhulex.goa.gov.in", "ror_pct": 100.0, "cadastral_pct": 98.7, "ulpin_status": "Live (Communidade Land Records)", "svamitva_cards": "1.1 Lakh", "dispute_idx": 43, "research_count": 18, "lat": 15.2993, "lng": 74.124, "districts": [["North Goa", "Coastal Tourism & Heritage"], ["South Goa", "Mining & Coastal Mixed"]], "path_d": "M 1440.0 8066.0 L 1426.0 8033.0 L 1381.0 7995.0 L 1391.0 7964.0 L 1376.0 7905.0 L 1348.0 7889.0 L 1394.0 7881.0 L 1334.0 7845.0 L 1305.0 7762.0 L 1397.0 7760.0 L 1406.0 7800.0 L 1459.0 7795.0 L 1504.0 7795.0 L 1503.0 7854.0 L 1528.0 7929.0 L 1503.0 7943.0 L 1522.0 7964.0 L 1514.0 8016.0 L 1481.0 8058.0 L 1440.0 8066.0 Z", "cx": 1432.6, "cy": 7916.0}, "TR": {"name": "Tripura", "capital": "Agartala", "portal": "Tripura Jami (e-Jami Portal)", "portal_url": "https://jami.tripura.gov.in", "ror_pct": 99.4, "cadastral_pct": 91.2, "ulpin_status": "Live (TTAADC Autonomous Areas)", "svamitva_cards": "1.8 Lakh", "dispute_idx": 49, "research_count": 16, "lat": 23.9408, "lng": 91.9882, "districts": [["West Tripura (Agartala)", "Urban Core"], ["Dhalai", "Tribal Autonomous Hills"]], "path_d": "M 7573.0 4605.0 L 7584.0 4621.0 L 7593.0 4743.0 L 7573.0 4764.0 L 7579.0 4796.0 L 7562.0 4821.0 L 7548.0 4794.0 L 7517.0 4830.0 L 7484.0 4801.0 L 7471.0 4827.0 L 7489.0 4892.0 L 7430.0 4960.0 L 7447.0 5034.0 L 7384.0 5096.0 L 7357.0 5078.0 L 7321.0 4986.0 L 7298.0 5010.0 L 7304.0 5058.0 L 7280.0 5023.0 L 7273.0 4971.0 L 7245.0 4907.0 L 7214.0 4869.0 L 7210.0 4816.0 L 7231.0 4815.0 L 7229.0 4764.0 L 7244.0 4729.0 L 7278.0 4728.0 L 7273.0 4681.0 L 7331.0 4687.0 L 7360.0 4669.0 L 7366.0 4633.0 L 7398.0 4659.0 L 7391.0 4621.0 L 7449.0 4655.0 L 7462.0 4565.0 L 7512.0 4561.0 L 7523.0 4508.0 L 7544.0 4515.0 L 7561.0 4556.0 L 7545.0 4608.0 L 7573.0 4605.0 Z", "cx": 7414.8, "cy": 4777.1}, "ML": {"name": "Meghalaya", "capital": "Shillong", "portal": "Meghalaya Land Records Management", "portal_url": "https://megland.gov.in", "ror_pct": 94.2, "cadastral_pct": 74.5, "ulpin_status": "Customary Clan Land Mapping Pilot", "svamitva_cards": "0.8 Lakh", "dispute_idx": 55, "research_count": 15, "lat": 25.467, "lng": 91.3662, "districts": [["East Khasi Hills (Shillong)", "Hill Urban"], ["West Garo Hills", "Clan Community Lands"]], "path_d": "M 7705.0 4215.0 L 7711.0 4240.0 L 7654.0 4282.0 L 7622.0 4276.0 L 7592.0 4318.0 L 7526.0 4300.0 L 7472.0 4272.0 L 7365.0 4286.0 L 7332.0 4306.0 L 7317.0 4289.0 L 7275.0 4306.0 L 7201.0 4289.0 L 7089.0 4311.0 L 6958.0 4318.0 L 6826.0 4307.0 L 6724.0 4261.0 L 6734.0 4221.0 L 6744.0 4191.0 L 6786.0 4170.0 L 6742.0 4130.0 L 6810.0 4042.0 L 6925.0 4013.0 L 6977.0 4044.0 L 7015.0 4027.0 L 7084.0 4030.0 L 7101.0 4070.0 L 7167.0 4058.0 L 7177.0 4100.0 L 7210.0 4055.0 L 7253.0 4044.0 L 7253.0 4044.0 L 7257.0 4043.0 L 7261.0 4042.0 L 7262.0 4042.0 L 7271.0 4038.0 L 7259.0 4039.0 L 7255.0 4040.0 L 7281.0 3981.0 L 7297.0 4011.0 L 7333.0 4003.0 L 7333.0 3965.0 L 7360.0 3941.0 L 7401.0 3976.0 L 7519.0 3943.0 L 7478.0 3987.0 L 7498.0 4005.0 L 7479.0 4043.0 L 7489.0 4095.0 L 7557.0 4058.0 L 7618.0 4104.0 L 7618.0 4111.0 L 7619.0 4115.0 L 7620.0 4118.0 L 7621.0 4117.0 L 7650.0 4109.0 L 7633.0 4140.0 L 7629.0 4146.0 L 7635.0 4152.0 L 7652.0 4167.0 L 7705.0 4215.0 Z", "cx": 7315.6, "cy": 4126.0}, "MN": {"name": "Manipur", "capital": "Imphal", "portal": "Loucha Pathap (Directorate of Land Records)", "portal_url": "https://louchapathap.nic.in", "ror_pct": 93.8, "cadastral_pct": 71.2, "ulpin_status": "Valley & Hill Dual Cadastre Pilot", "svamitva_cards": "0.6 Lakh", "dispute_idx": 72, "research_count": 17, "lat": 24.6637, "lng": 93.9063, "districts": [["Imphal West", "Valley Urban Core"], ["Churachandpur", "Hill Tribal Territory"]], "path_d": "M 7802.0 4530.0 L 7822.0 4439.0 L 7826.0 4379.0 L 7853.0 4378.0 L 7908.0 4206.0 L 7929.0 4187.0 L 7977.0 4222.0 L 8035.0 4113.0 L 8020.0 4094.0 L 8096.0 4066.0 L 8141.0 4088.0 L 8196.0 4093.0 L 8233.0 4072.0 L 8248.0 4041.0 L 8286.0 4014.0 L 8280.0 4078.0 L 8323.0 4094.0 L 8302.0 4159.0 L 8306.0 4193.0 L 8356.0 4209.0 L 8355.0 4281.0 L 8332.0 4318.0 L 8327.0 4365.0 L 8306.0 4373.0 L 8231.0 4578.0 L 8229.0 4624.0 L 8208.0 4696.0 L 8157.0 4671.0 L 8087.0 4678.0 L 8067.0 4652.0 L 8020.0 4655.0 L 7988.0 4681.0 L 7951.0 4636.0 L 7925.0 4648.0 L 7899.0 4661.0 L 7861.0 4641.0 L 7803.0 4636.0 L 7818.0 4551.0 L 7802.0 4530.0 Z", "cx": 8084.7, "cy": 4372.6}, "NL": {"name": "Nagaland", "capital": "Kohima", "portal": "Nagaland Land Records & Survey", "portal_url": "https://landrevenue.nagaland.gov.in", "ror_pct": 91.5, "cadastral_pct": 68.4, "ulpin_status": "Article 371A Customary Mapping", "svamitva_cards": "0.5 Lakh", "dispute_idx": 68, "research_count": 14, "lat": 26.1584, "lng": 94.5624, "districts": [["Kohima", "State Capital Hills"], ["Dimapur", "Commercial Valley Plain"]], "path_d": "M 8458.0 3626.0 L 8411.0 3712.0 L 8436.0 3739.0 L 8445.0 3844.0 L 8465.0 3848.0 L 8417.0 3932.0 L 8434.0 3970.0 L 8399.0 4010.0 L 8365.0 4076.0 L 8323.0 4094.0 L 8280.0 4078.0 L 8286.0 4014.0 L 8248.0 4041.0 L 8233.0 4072.0 L 8196.0 4093.0 L 8141.0 4088.0 L 8096.0 4066.0 L 8020.0 4094.0 L 8035.0 4113.0 L 7977.0 4222.0 L 7929.0 4187.0 L 7919.0 4139.0 L 7874.0 4105.0 L 7987.0 3982.0 L 8005.0 3939.0 L 8018.0 3993.0 L 8075.0 3947.0 L 8065.0 3930.0 L 8076.0 3851.0 L 8102.0 3797.0 L 8120.0 3790.0 L 8122.0 3745.0 L 8150.0 3704.0 L 8165.0 3740.0 L 8190.0 3681.0 L 8223.0 3645.0 L 8275.0 3629.0 L 8310.0 3598.0 L 8333.0 3549.0 L 8397.0 3534.0 L 8429.0 3497.0 L 8447.0 3541.0 L 8433.0 3563.0 L 8456.0 3589.0 L 8458.0 3626.0 Z", "cx": 8227.2, "cy": 3867.4}, "AR": {"name": "Arunachal Pradesh", "capital": "Itanagar", "portal": "Arunachal e-Land Records Portal", "portal_url": "https://landrecords.arunachal.gov.in", "ror_pct": 89.2, "cadastral_pct": 64.1, "ulpin_status": "Cadastral Survey Pilot in Towns", "svamitva_cards": "0.4 Lakh", "dispute_idx": 50, "research_count": 16, "lat": 28.218, "lng": 94.7278, "districts": [["Papum Pare (Itanagar)", "Capital Foothills"], ["Tawang", "High Altitude Border"]], "path_d": "M 8458.0 3626.0 L 8456.0 3589.0 L 8433.0 3563.0 L 8447.0 3541.0 L 8429.0 3497.0 L 8447.0 3500.0 L 8511.0 3454.0 L 8530.0 3402.0 L 8550.0 3414.0 L 8635.0 3380.0 L 8684.0 3346.0 L 8659.0 3322.0 L 8626.0 3331.0 L 8631.0 3285.0 L 8601.0 3268.0 L 8583.0 3224.0 L 8643.0 3129.0 L 8524.0 3147.0 L 8498.0 3179.0 L 8457.0 3198.0 L 8434.0 3190.0 L 8299.0 3254.0 L 8256.0 3287.0 L 8169.0 3336.0 L 8087.0 3328.0 L 8106.0 3355.0 L 8074.0 3376.0 L 7973.0 3506.0 L 7985.0 3532.0 L 7937.0 3576.0 L 7870.0 3595.0 L 7831.0 3590.0 L 7725.0 3617.0 L 7675.0 3588.0 L 7604.0 3584.0 L 7583.0 3614.0 L 7538.0 3618.0 L 7458.0 3651.0 L 7430.0 3652.0 L 7425.0 3611.0 L 7395.0 3554.0 L 7420.0 3507.0 L 7400.0 3497.0 L 7383.0 3442.0 L 7358.0 3452.0 L 7265.0 3452.0 L 7232.0 3418.0 L 7247.0 3337.0 L 7218.0 3320.0 L 7258.0 3316.0 L 7311.0 3329.0 L 7343.0 3360.0 L 7446.0 3297.0 L 7466.0 3325.0 L 7524.0 3299.0 L 7546.0 3303.0 L 7598.0 3236.0 L 7574.0 3191.0 L 7620.0 3167.0 L 7677.0 3114.0 L 7732.0 3102.0 L 7724.0 3061.0 L 7751.0 3032.0 L 7766.0 2981.0 L 7852.0 2966.0 L 7925.0 2939.0 L 7951.0 2950.0 L 7968.0 2885.0 L 8015.0 2838.0 L 8029.0 2789.0 L 8092.0 2729.0 L 8132.0 2723.0 L 8149.0 2677.0 L 8198.0 2707.0 L 8211.0 2738.0 L 8234.0 2728.0 L 8358.0 2740.0 L 8360.0 2756.0 L 8427.0 2759.0 L 8448.0 2690.0 L 8515.0 2629.0 L 8572.0 2612.0 L 8607.0 2578.0 L 8667.0 2652.0 L 8710.0 2631.0 L 8706.0 2674.0 L 8636.0 2717.0 L 8663.0 2747.0 L 8661.0 2778.0 L 8713.0 2724.0 L 8768.0 2700.0 L 8757.0 2733.0 L 8808.0 2799.0 L 8805.0 2828.0 L 8769.0 2847.0 L 8779.0 2863.0 L 8729.0 2909.0 L 8746.0 2926.0 L 8718.0 2950.0 L 8770.0 2971.0 L 8778.0 2944.0 L 8842.0 2919.0 L 8882.0 2948.0 L 8922.0 2938.0 L 8957.0 2959.0 L 8997.0 2939.0 L 9084.0 2976.0 L 9071.0 3036.0 L 9107.0 3048.0 L 9105.0 3096.0 L 9061.0 3097.0 L 8991.0 3170.0 L 8958.0 3219.0 L 8971.0 3276.0 L 9071.0 3385.0 L 9037.0 3399.0 L 8968.0 3375.0 L 8971.0 3349.0 L 8940.0 3321.0 L 8880.0 3321.0 L 8851.0 3354.0 L 8758.0 3369.0 L 8697.0 3409.0 L 8677.0 3459.0 L 8632.0 3482.0 L 8618.0 3526.0 L 8591.0 3528.0 L 8574.0 3563.0 L 8552.0 3559.0 L 8518.0 3616.0 L 8480.0 3635.0 L 8458.0 3626.0 Z", "cx": 8295.2, "cy": 3189.9}, "MZ": {"name": "Mizoram", "capital": "Aizawl", "portal": "Mizoram Land Revenue & Settlement", "portal_url": "https://landrevenue.mizoram.gov.in", "ror_pct": 96.1, "cadastral_pct": 78.9, "ulpin_status": "Periodic Patta Modernization", "svamitva_cards": "0.9 Lakh", "dispute_idx": 42, "research_count": 13, "lat": 23.1645, "lng": 92.9376, "districts": [["Aizawl", "Steep Ridge Urban"], ["Lunglei", "Southern Hills Mixed"]], "path_d": "M 7579.0 4796.0 L 7573.0 4764.0 L 7593.0 4743.0 L 7584.0 4621.0 L 7573.0 4605.0 L 7615.0 4601.0 L 7633.0 4643.0 L 7680.0 4566.0 L 7699.0 4560.0 L 7720.0 4494.0 L 7746.0 4537.0 L 7802.0 4530.0 L 7818.0 4551.0 L 7803.0 4636.0 L 7861.0 4641.0 L 7899.0 4661.0 L 7925.0 4648.0 L 7950.0 4691.0 L 7972.0 4816.0 L 7957.0 4901.0 L 7971.0 4948.0 L 7956.0 5018.0 L 7930.0 5031.0 L 7891.0 5014.0 L 7899.0 5061.0 L 7886.0 5143.0 L 7907.0 5187.0 L 7906.0 5227.0 L 7927.0 5243.0 L 7937.0 5303.0 L 7924.0 5333.0 L 7887.0 5328.0 L 7878.0 5409.0 L 7859.0 5394.0 L 7844.0 5423.0 L 7829.0 5385.0 L 7771.0 5355.0 L 7766.0 5407.0 L 7750.0 5419.0 L 7724.0 5368.0 L 7739.0 5367.0 L 7693.0 5161.0 L 7663.0 5093.0 L 7638.0 5080.0 L 7641.0 5037.0 L 7623.0 4972.0 L 7639.0 4969.0 L 7609.0 4901.0 L 7579.0 4796.0 Z", "cx": 7780.6, "cy": 4966.9}, "SK": {"name": "Sikkim", "capital": "Gangtok", "portal": "Sikkim Land Revenue & Disaster Management", "portal_url": "https://sikkim.gov.in", "ror_pct": 98.4, "cadastral_pct": 85.3, "ulpin_status": "Live (Mountain Cadastre Pilot)", "svamitva_cards": "0.7 Lakh", "dispute_idx": 38, "research_count": 12, "lat": 27.533, "lng": 88.5122, "districts": [["East Sikkim (Gangtok)", "Himalayan Urban"], ["South Sikkim (Namchi)", "Organic Agro-Terraces"]], "path_d": "M 6099.0 3631.0 L 6112.0 3587.0 L 6103.0 3531.0 L 6133.0 3466.0 L 6145.0 3400.0 L 6123.0 3393.0 L 6124.0 3361.0 L 6205.0 3350.0 L 6275.0 3301.0 L 6345.0 3328.0 L 6364.0 3370.0 L 6358.0 3452.0 L 6335.0 3491.0 L 6352.0 3548.0 L 6390.0 3574.0 L 6353.0 3605.0 L 6339.0 3642.0 L 6287.0 3628.0 L 6238.0 3672.0 L 6196.0 3658.0 L 6126.0 3658.0 L 6099.0 3631.0 Z", "cx": 6231.9, "cy": 3512.6}, "DL": {"name": "NCT of Delhi", "capital": "New Delhi", "portal": "Delhi Land Records (DLRC)", "portal_url": "https://dlrc.delhigovt.nic.in", "ror_pct": 100.0, "cadastral_pct": 99.4, "ulpin_status": "Live (Urban Cadastre & Geospatial Delhi)", "svamitva_cards": "2.4 Lakh", "dispute_idx": 81, "research_count": 48, "lat": 28.7041, "lng": 77.1025, "districts": [["New Delhi", "Lutyens Administrative"], ["South Delhi", "High-Density Residential"], ["North West Delhi", "Urban Village Fringe (Lal Dora)"]], "path_d": "M 2649.0 3086.0 L 2653.0 3114.0 L 2690.0 3142.0 L 2692.0 3216.0 L 2637.0 3250.0 L 2619.0 3219.0 L 2547.0 3206.0 L 2535.0 3193.0 L 2566.0 3166.0 L 2571.0 3100.0 L 2606.0 3082.0 L 2649.0 3086.0 Z", "cx": 2617.8, "cy": 3155.0}, "CH": {"name": "Chandigarh", "capital": "Chandigarh", "portal": "Chandigarh Estate Office Land Portal", "portal_url": "https://chandigarh.gov.in", "ror_pct": 100.0, "cadastral_pct": 100.0, "ulpin_status": "Live (100% GIS Integrated Leases)", "svamitva_cards": "0.3 Lakh", "dispute_idx": 44, "research_count": 15, "lat": 30.7333, "lng": 76.7794, "districts": [["Chandigarh Master Plan Sectors", "Planned Urban Grid"]], "path_d": "M 2563.0 2419.0 L 2558.0 2425.0 L 2557.0 2427.0 L 2558.0 2429.0 L 2549.0 2435.0 L 2536.0 2428.0 L 2532.0 2427.0 L 2531.0 2424.0 L 2529.0 2424.0 L 2528.0 2421.0 L 2529.0 2420.0 L 2525.0 2418.0 L 2526.0 2415.0 L 2526.0 2414.0 L 2519.0 2401.0 L 2524.0 2397.0 L 2527.0 2398.0 L 2531.0 2395.0 L 2534.0 2392.0 L 2534.0 2391.0 L 2534.0 2390.0 L 2535.0 2390.0 L 2535.0 2390.0 L 2535.0 2390.0 L 2536.0 2389.0 L 2540.0 2388.0 L 2546.0 2393.0 L 2545.0 2393.0 L 2545.0 2393.0 L 2544.0 2394.0 L 2543.0 2396.0 L 2543.0 2396.0 L 2545.0 2396.0 L 2547.0 2397.0 L 2547.0 2397.0 L 2549.0 2395.0 L 2552.0 2393.0 L 2552.0 2393.0 L 2554.0 2396.0 L 2550.0 2399.0 L 2553.0 2401.0 L 2553.0 2401.0 L 2553.0 2401.0 L 2556.0 2400.0 L 2561.0 2401.0 L 2559.0 2410.0 L 2560.0 2413.0 L 2563.0 2419.0 Z", "cx": 2542.7, "cy": 2404.5}, "PY": {"name": "Puducherry", "capital": "Puducherry", "portal": "Nilam (Puducherry Land Records)", "portal_url": "https://nilam.py.gov.in", "ror_pct": 100.0, "cadastral_pct": 99.1, "ulpin_status": "Live", "svamitva_cards": "0.8 Lakh", "dispute_idx": 46, "research_count": 12, "lat": 11.9416, "lng": 79.8083, "districts": [["Puducherry", "Coastal French Quarter & Urban"], ["Karaikal", "Cauvery Coastal Delta"]], "path_d": "M 4269.0 7443.0 L 4275.0 7447.0 L 4301.0 7445.0 L 4284.0 7457.0 L 4269.0 7443.0 Z M 3458.0 9113.0 L 3447.0 9137.0 L 3419.0 9235.0 L 3347.0 9214.0 L 3339.0 9150.0 L 3366.0 9095.0 L 3458.0 9113.0 Z M 3443.0 9501.0 L 3442.0 9539.0 L 3442.0 9558.0 L 3397.0 9508.0 L 3443.0 9501.0 Z M 1921.0 9231.0 L 1920.0 9229.0 L 1918.0 9226.0 L 1923.0 9227.0 L 1921.0 9231.0 Z M 1928.0 9222.0 L 1921.0 9214.0 L 1922.0 9213.0 L 1922.0 9213.0 L 1924.0 9215.0 L 1925.0 9217.0 L 1928.0 9222.0 Z M 1920.0 9209.0 L 1922.0 9212.0 L 1922.0 9213.0 L 1922.0 9213.0 L 1921.0 9211.0 L 1920.0 9209.0 Z", "cx": 2771.4, "cy": 8995.0}, "AN": {"name": "Andaman & Nicobar", "capital": "Port Blair", "portal": "A&N Land Revenue Portal", "portal_url": "https://andssw1.and.nic.in", "ror_pct": 99.3, "cadastral_pct": 92.4, "ulpin_status": "Live (Island Coastal Regulation GIS)", "svamitva_cards": "0.5 Lakh", "dispute_idx": 35, "research_count": 11, "lat": 11.7401, "lng": 92.6586, "districts": [["South Andaman (Port Blair)", "Urban Port Island"], ["Nicobar", "Tribal Reserved Islands"]], "path_d": "M 8319.0 10439.0 Z M 7945.0 9455.0 L 7971.0 9494.0 L 7967.0 9572.0 L 7943.0 9596.0 L 7901.0 9588.0 L 7914.0 9559.0 L 7902.0 9500.0 L 7945.0 9455.0 Z M 8122.0 8961.0 L 8132.0 9009.0 L 8104.0 9045.0 L 8122.0 9080.0 L 8075.0 9048.0 L 8094.0 9028.0 L 8086.0 8992.0 L 8122.0 8961.0 Z M 8073.0 8940.0 L 8032.0 9010.0 L 7993.0 8938.0 L 7987.0 8833.0 L 7996.0 8781.0 L 7961.0 8737.0 L 7985.0 8695.0 L 7987.0 8745.0 L 8013.0 8734.0 L 8011.0 8652.0 L 8018.0 8531.0 L 8085.0 8472.0 L 8103.0 8581.0 L 8095.0 8651.0 L 8036.0 8719.0 L 8055.0 8716.0 L 8081.0 8785.0 L 8084.0 8849.0 L 8073.0 8940.0 Z M 7949.0 9164.0 L 7929.0 9108.0 L 7945.0 9072.0 L 7963.0 9083.0 L 7971.0 8987.0 L 7991.0 8961.0 L 8012.0 8985.0 L 8006.0 9058.0 L 8025.0 9073.0 L 8021.0 9140.0 L 7990.0 9188.0 L 8019.0 9172.0 L 8006.0 9241.0 L 7967.0 9290.0 L 7982.0 9226.0 L 7940.0 9210.0 L 7977.0 9192.0 L 7949.0 9164.0 Z", "cx": 8018.0, "cy": 9063.1}, "LD": {"name": "Lakshadweep", "capital": "Kavaratti", "portal": "Lakshadweep Land Cadastre", "portal_url": "https://lakshadweep.gov.in", "ror_pct": 99.0, "cadastral_pct": 90.2, "ulpin_status": "Live (Atoll Cadastral Mapping)", "svamitva_cards": "0.2 Lakh", "dispute_idx": 30, "research_count": 9, "lat": 10.5667, "lng": 72.6417, "districts": [["Kavaratti Island", "Atoll Settlement"]], "path_d": "M 1376.0 9382.0 L 1370.0 9341.0 L 1414.0 9376.0 L 1401.0 9396.0 L 1376.0 9382.0 Z", "cx": 1387.4, "cy": 9375.4}, "DD": {"name": "Daman & Diu", "capital": "Daman", "portal": "Daman & Diu Land Records", "portal_url": "https://daman.nic.in", "ror_pct": 100.0, "cadastral_pct": 99.2, "ulpin_status": "Live", "svamitva_cards": "0.4 Lakh", "dispute_idx": 40, "research_count": 10, "lat": 20.4283, "lng": 72.8397, "districts": [["Daman", "Industrial Coastal Enclave"], ["Diu", "Coastal Island Tourist Cadastre"]], "path_d": "M 1075.0 6075.0 L 1085.0 6048.0 L 1091.0 6039.0 L 1102.0 6078.0 L 1075.0 6075.0 Z M 474.0 5908.0 L 474.0 5908.0 L 474.0 5908.0 L 474.0 5908.0 Z M 448.0 5909.0 L 462.0 5915.0 L 466.0 5911.0 L 471.0 5906.0 L 474.0 5908.0 L 460.0 5921.0 L 448.0 5909.0 Z M 521.0 5900.0 L 523.0 5904.0 L 519.0 5905.0 L 519.0 5902.0 L 521.0 5900.0 Z", "cx": 626.5, "cy": 5944.6}, "DN": {"name": "Dadra & Nagar Haveli", "capital": "Silvassa", "portal": "DNH Land Revenue Administration", "portal_url": "https://dnh.gov.in", "ror_pct": 100.0, "cadastral_pct": 98.9, "ulpin_status": "Live", "svamitva_cards": "0.6 Lakh", "dispute_idx": 42, "research_count": 11, "lat": 20.1809, "lng": 73.0169, "districts": [["Silvassa", "Industrial Hub"], ["Khanvel", "Tribal Forest Belt"]], "path_d": "M 1167.0 6152.0 L 1170.0 6156.0 L 1171.0 6157.0 L 1174.0 6157.0 L 1175.0 6157.0 L 1176.0 6157.0 L 1177.0 6158.0 L 1178.0 6158.0 L 1178.0 6158.0 L 1179.0 6157.0 L 1187.0 6152.0 L 1184.0 6142.0 L 1188.0 6142.0 L 1192.0 6143.0 L 1193.0 6143.0 L 1195.0 6143.0 L 1198.0 6143.0 L 1201.0 6144.0 L 1203.0 6145.0 L 1207.0 6145.0 L 1213.0 6153.0 L 1210.0 6155.0 L 1209.0 6156.0 L 1203.0 6160.0 L 1202.0 6161.0 L 1202.0 6165.0 L 1203.0 6169.0 L 1208.0 6172.0 L 1209.0 6178.0 L 1209.0 6181.0 L 1207.0 6184.0 L 1201.0 6188.0 L 1201.0 6193.0 L 1195.0 6197.0 L 1192.0 6192.0 L 1189.0 6189.0 L 1183.0 6187.0 L 1180.0 6184.0 L 1176.0 6187.0 L 1174.0 6186.0 L 1171.0 6183.0 L 1168.0 6181.0 L 1164.0 6180.0 L 1156.0 6179.0 L 1155.0 6179.0 L 1155.0 6178.0 L 1155.0 6178.0 L 1154.0 6178.0 L 1154.0 6179.0 L 1154.0 6189.0 L 1149.0 6188.0 L 1147.0 6185.0 L 1145.0 6183.0 L 1142.0 6178.0 L 1141.0 6175.0 L 1138.0 6173.0 L 1138.0 6171.0 L 1140.0 6166.0 L 1141.0 6164.0 L 1138.0 6162.0 L 1137.0 6165.0 L 1137.0 6166.0 L 1137.0 6169.0 L 1136.0 6170.0 L 1136.0 6170.0 L 1132.0 6171.0 L 1129.0 6171.0 L 1127.0 6167.0 L 1125.0 6165.0 L 1130.0 6156.0 L 1131.0 6151.0 L 1131.0 6149.0 L 1127.0 6147.0 L 1127.0 6144.0 L 1126.0 6136.0 L 1128.0 6131.0 L 1126.0 6128.0 L 1111.0 6112.0 L 1126.0 6112.0 L 1127.0 6113.0 L 1128.0 6114.0 L 1128.0 6114.0 L 1130.0 6115.0 L 1134.0 6112.0 L 1134.0 6108.0 L 1134.0 6107.0 L 1142.0 6108.0 L 1144.0 6108.0 L 1144.0 6108.0 L 1145.0 6102.0 L 1144.0 6099.0 L 1153.0 6108.0 L 1159.0 6096.0 L 1161.0 6096.0 L 1166.0 6096.0 L 1166.0 6095.0 L 1167.0 6096.0 L 1167.0 6097.0 L 1169.0 6096.0 L 1171.0 6094.0 L 1172.0 6090.0 L 1180.0 6095.0 L 1177.0 6105.0 L 1177.0 6105.0 L 1180.0 6105.0 L 1182.0 6105.0 L 1184.0 6105.0 L 1184.0 6104.0 L 1185.0 6103.0 L 1186.0 6101.0 L 1194.0 6102.0 L 1198.0 6103.0 L 1198.0 6107.0 L 1198.0 6109.0 L 1198.0 6112.0 L 1194.0 6113.0 L 1194.0 6112.0 L 1193.0 6112.0 L 1192.0 6111.0 L 1191.0 6111.0 L 1191.0 6113.0 L 1190.0 6115.0 L 1189.0 6115.0 L 1189.0 6115.0 L 1189.0 6115.0 L 1188.0 6114.0 L 1187.0 6114.0 L 1186.0 6116.0 L 1186.0 6117.0 L 1185.0 6119.0 L 1185.0 6119.0 L 1184.0 6121.0 L 1181.0 6122.0 L 1179.0 6122.0 L 1179.0 6122.0 L 1175.0 6127.0 L 1175.0 6127.0 L 1175.0 6128.0 L 1174.0 6131.0 L 1172.0 6131.0 L 1166.0 6130.0 L 1163.0 6131.0 L 1160.0 6134.0 L 1158.0 6140.0 L 1158.0 6142.0 L 1161.0 6143.0 L 1161.0 6150.0 L 1160.0 6155.0 L 1163.0 6158.0 L 1164.0 6157.0 L 1167.0 6152.0 Z", "cx": 1168.4, "cy": 6140.8}};
window.BHUMI_PAPERS = [{"id": "DOC-GOI-001", "title": "Model Conclusive Land Titling Act and Rules: Transitioning from Presumptive to Conclusive Titles in India", "agency": "NITI Aayog, Government of India", "authors": "Working Group on Land Titling (Chaired by Vice Chairman, NITI Aayog)", "year": 2020, "type": "Act / Model Legislation", "category": "Titling & Land Rights", "state": "National", "quality": 98, "verified": true, "doi_url": "https://www.niti.gov.in/sites/default/files/2020-11/Model-Act-and-Rules-for-States-on-Conclusive-Land-Titling.pdf", "abstract": "Proposes a landmark legislative template for Indian states to transition from the current presumptive titling regime (caveat emptor) to a Torrens-style conclusive title system guaranteed by the State. Anchored on the tri-fold principles of Mirror (records reflect ground truth), Curtain (registered title ends historical deed tracing), and Insurance/Indemnity (State compensates any title defect loss).", "key_findings": ["Presumptive titling is the root cause behind 66% of subordinate civil litigation in India.", "Mandates the creation of a State Land Authority and Title Registration Officers (TRO) to eliminate overlapping jurisdiction of revenue and registration departments.", "Proposes a dedicated Land Dispute Adjudication Tribunal with strict 3-year sunset clauses to permanently resolve title ambiguity."], "methodology": "Comparative jurisprudence of Torrens systems across Australia, Singapore, and UK adapted to the Seventh Schedule constitutional framework of India.", "policy_takeaway": "States should establish an initial Land Title Indemnity Fund (recommended at 0.5% of annual stamp duty collections) to operationalize conclusive guarantees without fiscal vulnerability."}, {"id": "DOC-GOI-002", "title": "NCAER Land Records and Services Index (N-LRSI 2021): Evaluating the Digitization and Quality of Land Records", "agency": "National Council of Applied Economic Research (NCAER)", "authors": "Dr. Shekhar Shah, Deepak Sanan, Devender Singh (Property Rights Research Consortium)", "year": 2021, "type": "Evaluation Study / Index", "category": "Digitization & Cadastre", "state": "National", "quality": 96, "verified": true, "doi_url": "https://www.ncaer.org/research/ncaer-land-records-and-services-index-2021", "abstract": "The definitive empirical assessment measuring performance of 32 States and Union Territories across two critical pillars: (1) Digitization of Land Records (RoRs, Cadastral Maps, Spatial Integration), and (2) Quality of Land Governance Services (timeliness, mutation transparency, accessibility). Evaluates ground-level fidelity via Real-Time Mirror (RTM) tests.", "key_findings": ["Madhya Pradesh, West Bengal, Odisha, Maharashtra, and Tamil Nadu emerged as top-tier performers with comprehensive spatial integration.", "Spatial synchronization between textual RoRs and spatial cadastral maps is lagging at 68% nationwide, creating a 'synchronization deficit'.", "Digital mutation without automatic RoR update accounts for over 22% of citizen grievances in district offices."], "methodology": "Multi-dimensional scoring methodology spanning 44 parameters across 32 States/UTs, triangulated with ground verification of 2,400+ citizen mutation requests.", "policy_takeaway": "Direct integration of ULPIN with e-Courts and State Sub-Registrar Offices (SROs) is the single most urgent priority to halt duplicate registrations."}, {"id": "DOC-GOI-003", "title": "DILRMP 3.0 Strategic Framework (2026-2031): Next-Generation Evidence-Based Land Governance and Applied Research", "agency": "Department of Land Resources (DoLR), Ministry of Rural Development", "authors": "PME Division & Technical Steering Committee, DoLR, GoI", "year": 2025, "type": "Government Guideline", "category": "Digitization & Cadastre", "state": "National", "quality": 97, "verified": true, "doi_url": "https://dilrmp.gov.in/guidelines-3.0", "abstract": "Outlines the official roadmap for the third phase of DILRMP (2026-2031), formally shifting from basic record computerization to an AI-driven, research-enabled Land Intelligence Ecosystem. Establishes dedicated institutional grant funding for universities, AI-based cadastral anomaly detection, and cross-state policy sandboxing.", "key_findings": ["Over 99.8% of rural RoRs computerised; priority must pivot to data analytics and predictive policy modelling.", "Allocates dedicated funding for university research fellowships and hackathons to build open-source GIS tools.", "Codifies nationwide standards for ULPIN (Bhu-Aadhaar) integration with PM Gati Shakti, SVAMITVA, and banking APIs."], "methodology": "Inter-ministerial consultations across 28 states, incorporating feedback from Survey of India, NIC, and international land portals.", "policy_takeaway": "Centralized National Digital Land Knowledge Platform mandated to bridge the gap between academic research and executive administrative action."}, {"id": "DOC-GOI-004", "title": "National Impact Evaluation of SVAMITVA Scheme: Drone Photogrammetry and Rural Property Card Monetization", "agency": "Ministry of Panchayati Raj / Indian Institute of Management (IIM) Ahmedabad", "authors": "Prof. R. Banerjee, Centre for Management in Agriculture, IIM Ahmedabad", "year": 2023, "type": "Evaluation Study / Impact Report", "category": "SVAMITVA & Titling", "state": "National", "quality": 95, "verified": true, "doi_url": "https://svamitva.nic.in/impact-study-2023", "abstract": "Independent evaluation of 1,200 Gram Panchayats across 10 states studying the socio-economic empowerment generated through high-resolution UAV drone mapping of populated village areas (Abadi) and subsequent issuance of legal Property Cards (Sampatti Patra).", "key_findings": ["Documented a 34.2% increase in institutional bank mortgage loans availed by rural homeowners post-issuance of property cards.", "Boundary and encroachment disputes reduced by 41.6% within participating Gram Panchayats.", "Gram Panchayats achieved a 28% increase in own-source property tax revenues, strengthening rural local self-governance."], "methodology": "Difference-in-differences (DiD) econometric analysis comparing 600 treated villages against 600 control villages over 24 months.", "policy_takeaway": "Commercial banks must integrate automated digital validation of SVAMITVA Property Cards to eliminate physical title search delays."}, {"id": "DOC-GOI-005", "title": "State of Land Conflicts in India: Macro-Economic Analysis of 700+ Contested Projects Impacting \u20b913.8 Lakh Crore", "agency": "Land Conflict Watch (LCW) & Centre for Policy Research (CPR)", "authors": "K. Kumar, M. Joseph, P. Rathod (LCW Investigative Team)", "year": 2024, "type": "Research Paper", "category": "Land Disputes", "state": "National", "quality": 94, "verified": true, "doi_url": "https://www.landconflictwatch.org/reports/state-of-land-conflicts-2024", "abstract": "First-of-its-kind comprehensive empirical database tracking 700+ ongoing land and resource conflicts across 2.5 million hectares in India. Examines root structural causes, affected populations (7.4 million citizens), and stalled developmental investments.", "key_findings": ["Over 66% of ongoing conflicts involve 'Common Lands' (Panchayat pastures, grazing grounds, water bodies, and forest lands).", "Lack of formal cadastral demarcation of common property resources leaves marginalized pastoral and tribal communities dispossessed.", "Stalled investments due to land acquisition litigation average 5.8 years of procedural delays."], "methodology": "Field investigation, GIS spatial mapping of conflict boundaries, and analysis of 1,500+ High Court and Supreme Court case files.", "policy_takeaway": "National Cadastral Map specifications must introduce a distinct, immutable GIS layer for Gram Panchayat commons and FRA Community Forest Resources."}, {"id": "DOC-GOI-006", "title": "Decadal Land Use / Land Cover (LULC) Dynamics Atlas of India (1:50,000 Scale) using Multi-Temporal Satellite Datasets", "agency": "National Remote Sensing Centre (NRSC), ISRO", "authors": "Geospatial Applications Directorate, NRSC / ISRO, Hyderabad", "year": 2022, "type": "Dataset / Atlas", "category": "Geospatial & Bhuvan", "state": "National", "quality": 99, "verified": true, "doi_url": "https://bhuvan-app1.nrsc.gov.in/thematic/thematic/index.php", "abstract": "National geospatial atlas tracking spatial land use transitions across 328.7 million hectares over 2005-2020. Leverages multi-temporal Resourcesat AWiFS and LISS-III imagery to quantify urban sprawl, crop rotations, water body fluctuations, and wasteland reclamation.", "key_findings": ["Peri-urban agricultural land conversion has expanded at 3.8% annually around Tier-1 and Tier-2 metropolitan areas.", "Wasteland reclamation initiatives successfully transitioned 1.45 million hectares into productive agro-forestry between 2010 and 2020.", "Water bodies experienced an 8.2% reduction in surface area in arid and semi-arid tracts, exacerbating agricultural vulnerability."], "methodology": "Satellite remote sensing classification using hybrid supervised machine learning algorithms, calibrated against 30,000+ ground truth survey points.", "policy_takeaway": "Bhuvan WMS layers must be embedded directly into State Revenue Portals to auto-flag unauthorized farmland-to-commercial conversions before registration."}, {"id": "DOC-GOI-007", "title": "Subordinate Judiciary Survey: Analysis of Civil Court Backlogs and Land/Property Litigation in India", "agency": "DAKSH Center for Law and Policy Research", "authors": "Harish Narasappa, Surya Prakash B. S., Justice Access Group", "year": 2023, "type": "Research Paper", "category": "Land Disputes", "state": "National", "quality": 95, "verified": true, "doi_url": "https://dakshindia.org/access-to-justice-survey/", "abstract": "Rigorous quantitative investigation across 300 subordinate district courts in 24 states evaluating court pendency and litigation lifecycles. Reveals that land and property disputes represent the single largest bottleneck in the Indian judicial architecture.", "key_findings": ["Land and property disputes constitute approximately 66.2% of all civil litigation pending in district and subordinate courts.", "Average disposal time for a contested land title suit stands at 6.2 years in subordinate courts and 14.5 years through final appellate stages.", "80% of property litigation involves inheritance partitions and boundary discrepancies arising from un-surveyed ancestral land."], "methodology": "Empirical survey of 9,320 litigants and quantitative analysis of over 2.4 million e-Courts case records.", "policy_takeaway": "Mandatory geo-tagging (ULPIN) of all registered deeds coupled with algorithmic boundary verification would prevent over 50% of new property suits."}, {"id": "DOC-GOI-008", "title": "Report on the Model Agricultural Land Leasing Act: Unlocking Farmland Productivity and Protecting Landowner Rights", "agency": "NITI Aayog High-Level Expert Committee", "authors": "Dr. T. Haque Committee on Agricultural Land Leasing", "year": 2016, "type": "Policy Brief / Draft Bill", "category": "Climate & Agriculture", "state": "National", "quality": 94, "verified": true, "doi_url": "https://www.niti.gov.in/model-agricultural-land-leasing-act", "abstract": "Proposes a modern legal framework for formalizing agricultural tenancy contracts. Removes the fear of land loss among absentee landowners while conferring legal status on tenant cultivators to access institutional credit, disaster relief, and crop insurance.", "key_findings": ["Informal oral leasing prevails across 25-30% of Indian cultivated land, preventing tenant farmers from obtaining KCC credit or crop insurance.", "Existing outdated tenancy laws induce landowners to keep fertile land fallow rather than risk leasing, reducing national food productivity.", "States adopting modified leasing acts (AP, MP, UP) demonstrated a 19% uptick in formal short-term crop credit disbursement."], "methodology": "Field surveys across Punjab, Bihar, Andhra Pradesh, and West Bengal assessing informal tenancy terms, rental yields, and legal risk premiums.", "policy_takeaway": "Digital lease registry module must be integrated into State RoR platforms (Bhoomi, Bhulekh) enabling time-bound, self-expiring digital lease certificates."}, {"id": "DOC-GOI-009", "title": "NGDRS Architecture: One Nation One Registration Software for Real-Time Registry-Revenue Interoperability", "agency": "National Informatics Centre (NIC) & Ministry of Rural Development", "authors": "Software Development Unit, NIC Pune & DoLR Nodal Team", "year": 2023, "type": "Government Guideline / Tech Architecture", "category": "Digitization & Cadastre", "state": "National", "quality": 96, "verified": true, "doi_url": "https://ngdrs.gov.in/NGDRS_Website/", "abstract": "Defines the unified enterprise architecture of the National Generic Document Registration System (NGDRS). Eliminates manual registry bottlenecks via online document submission, Aadhaar e-KYC, automated valuation, and instantaneous bidirectional sync with State land record databases.", "key_findings": ["Implemented across 14+ States/UTs, slashing average deed registration time from 3 days to under 45 minutes.", "Automated API integration with RoRs prevents the sale of mortgaged, encroached, or government-notified parcels in real-time.", "Standardizes 15 distinct state deed categorization schemas into an interoperable national data taxonomy."], "methodology": "Microservices-based cloud deployment evaluated across 8.5 million registered transaction records on NIC MeghRaj cloud.", "policy_takeaway": "All states must enforce mandatory ULPIN validation before allowing deed upload on NGDRS to completely stamp out duplicate conveyances."}, {"id": "DOC-GOI-010", "title": "Spatial Demarcation and Cadastral Integration of Forest Rights Act (FRA 2006) Community Titles", "agency": "Ministry of Tribal Affairs (MoTA) & Centre for Policy Research", "authors": "Taskforce on Forest Governance and Rights Recognition", "year": 2022, "type": "Research Paper", "category": "Forest Rights (FRA)", "state": "Odisha, Chhattisgarh, MP, MH", "quality": 93, "verified": true, "doi_url": "https://tribal.nic.in/FRA-Evaluation-Report", "abstract": "Investigates the critical institutional gap between Forest Rights Act (FRA 2006) title recognition and State Revenue Cadastres. Demonstrates that while millions of Community Forest Resource (CFR) titles have been granted on paper, their spatial boundaries remain missing from official GIS cadastral layers.", "key_findings": ["Over 74% of approved CFR titles in Odisha, MP, and Chhattisgarh lack geo-referenced digital polygon coordinates.", "Absence of CFR spatial overlays leads to accidental double-allotment of community forests for linear infrastructure or mining concessions.", "Pilot participatory GPS boundary mapping in Mayurbhanj (Odisha) and Gadchiroli (Maharashtra) prevented 100% of inter-village boundary conflicts."], "methodology": "Field spatial audits of 450 Gram Sabha CFR titles using handheld DGPS receivers and comparative overlay against Survey of India toposheets.", "policy_takeaway": "DoLR and MoTA must co-mandate a dedicated 'FRA-CFR Layer' within Bhu-Naksha to confer inviolable spatial protection to tribal community forests."}, {"id": "DOC-GOI-011", "title": "District-Level Climate Vulnerability Assessment for Indian Agriculture: Land Degradation and Soil Moisture Depletion", "agency": "ICAR - Central Research Institute for Dryland Agriculture (CRIDA)", "authors": "Dr. C. A. Rama Rao, Dr. B. M. K. Raju, National Innovation on Climate Resilient Agriculture (NICRA)", "year": 2022, "type": "Research Paper / Atlas", "category": "Climate & Agriculture", "state": "National", "quality": 97, "verified": true, "doi_url": "https://crida.in/vulnerability-atlas", "abstract": "Comprehensive climate vulnerability index ranking 651 rural districts on their susceptibility to climate shocks, topsoil erosion, groundwater depletion, and drought cycles. Establishes the spatial empirical baseline for climate-resilient land-use zoning.", "key_findings": ["109 districts classified as 'Very High' vulnerability, predominantly in Vidarbha (MH), Rayalaseema (AP), Bundelkhand (UP/MP), and Western Rajasthan.", "Land degradation and unsustainable monoculture conversions have reduced soil organic carbon (SOC) below 0.4% in 40% of surveyed districts.", "Recommends targeted land-use conversion moratoriums on high-risk dryland aquifers to avert irreversible land desertification."], "methodology": "Composite indicator framework analyzing 30-year meteorological datasets, NRSC LULC layers, and Census 2011 socio-economic indicators.", "policy_takeaway": "Spatial integration of CRIDA vulnerability maps into Watershed Development Component (WDC-PMKSY) enables algorithmic budget prioritization."}, {"id": "DOC-GOI-012", "title": "Peri-Urban Dynamics and Urban Sprawl Governance in Indian Metros: Cadastral Boundary Harmonization", "agency": "National Institute of Urban Affairs (NIUA) & TCPO", "authors": "Urban Governance Research Team, NIUA, New Delhi", "year": 2023, "type": "Policy Brief", "category": "Peri-Urban & Infra", "state": "Karnataka, Maharashtra, NCR", "quality": 94, "verified": true, "doi_url": "https://niua.in/peri-urban-governance-2023", "abstract": "Examines the severe administrative vacuum in peri-urban transition zones (urban-rural fringes) across Bengaluru, Hyderabad, Pune, and Delhi-NCR. Analyzes jurisdictional friction between Municipal Town Planning and Rural Revenue Panchayats.", "key_findings": ["Over 45% of unapproved layout developments occur within the 5 km buffer zone surrounding municipal corporation boundaries.", "Rural revenue officials continue issuing agricultural RoRs while developers construct unauthorized residential plots, generating catastrophic title ambiguity.", "Proposes a unified 'Peri-Urban Cadastral Zone' subject to joint digital sign-off from both Municipal Planners and Revenue Tehsildars."], "methodology": "Satellite remote sensing change-detection around Bengaluru and Hyderabad outer ring roads coupled with 400 buyer title verification audits.", "policy_takeaway": "Mandate high-frequency satellite monitoring (Bhuvan 15-day cadence) to auto-flag unauthorized land plotting in peri-urban tracts."}, {"id": "DOC-GOI-013", "title": "Empirical Review of RFCTLARR Act 2013: Section 24(2) Retrospective Lapsing Litigation and Compensation Delivery", "agency": "Vidhi Centre for Legal Policy", "authors": "Debanshu Mukherjee, Arghya Sengupta, Law & Economy Division", "year": 2021, "type": "Legal Analysis / Case Study", "category": "Land Disputes", "state": "National", "quality": 95, "verified": true, "doi_url": "https://vidhilegalpolicy.in/research/evaluating-rfctlarr-act/", "abstract": "Examines statutory bottlenecks in the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act (RFCTLARR 2013). Focuses on the constitutional controversy surrounding Section 24(2) lapsing provisions.", "key_findings": ["Over 1,200 infrastructure acquisition projects faced indefinite stays in High Courts due to disputes over compensation deposit mechanisms.", "Five-judge Constitution Bench ruling in Indore Development Authority (2020) stabilized Section 24(2) jurisprudence, reducing new lapsing pleas by 62%.", "Direct digital compensation transfer into Aadhaar-linked bank accounts reduced land acquisition payment disputes from 38% to under 6%."], "methodology": "Comprehensive legal taxonomy analyzing 840 Supreme Court and High Court judgments delivered between 2014 and 2021.", "policy_takeaway": "LACRRIS (Land Acquisition Monitoring System) must link compensation escrow records directly with ULPIN land parcels for transparent clearance."}, {"id": "DOC-GOI-014", "title": "Linear Infrastructure Cadastral GIS Integration Case Study: PM Gati Shakti National Master Plan", "agency": "Department of Land Resources & Logistics Division, DPIIT", "authors": "PM Gati Shakti Technical Implementation Group", "year": 2023, "type": "Case Study / Technical Paper", "category": "Peri-Urban & Infra", "state": "National", "quality": 98, "verified": true, "doi_url": "https://gati.gov.in/case-studies/cadastral-integration", "abstract": "Documents the integration of over 25 state cadastral datasets into the PM Gati Shakti National Master Plan (NMP) 500+ layer GIS platform. Demonstrates dramatic reductions in DPR project design timelines and right-of-way (RoW) acquisition friction.", "key_findings": ["Alignment planning for national highway and freight rail corridors shortened from 18 months to under 4 months by overlaying digital land parcels early.", "Avoided encroachment into ecologically fragile wetlands and disputed tribal holdings in over 34 major linear corridor alignments.", "Real-time visibility into land ownership enabled early public consultation, dropping land acquisition injunctions by 70%."], "methodology": "Before-and-after operational benchmarking across 12 flagship multi-modal logistics corridor projects spanning 4,200 km.", "policy_takeaway": "All state cadastral portals must publish standardized OGC WMS/WFS map services to sustain national multi-sectoral planning interoperability."}, {"id": "DOC-GOI-015", "title": "Standard Operating Procedures for Large Scale Mapping (LSM) using UAV Drone Technology", "agency": "Survey of India (SoI), Department of Science & Technology", "authors": "Surveyor General of India, Dehradun", "year": 2023, "type": "Government Guideline / Standard", "category": "Digitization & Cadastre", "state": "National", "quality": 96, "verified": true, "doi_url": "https://surveyofindia.gov.in/pages/svamitva-drone-sop", "abstract": "Defines the rigorous national technical standard for drone-based cadastral photogrammetry. Mandates Ground Sampling Distance (GSD) under 5 cm, spatial accuracy within \u00b110 cm, and mandatory tying with Continuously Operating Reference Stations (CORS).", "key_findings": ["Over 1,000 CORS reference stations deployed across India provide instantaneous centimetre-level GNSS differential corrections.", "Automated orthorectification pipelines reduce image processing time per village from 5 days to 6 hours.", "Standardized Ground Control Point (GCP) density guidelines ensure legal evidentiary admissibility in civil courts."], "methodology": "Field calibration trials across 50,000 km\u00b2 of varied topography: Indo-Gangetic plains, coastal estuaries, Western Ghats, and arid Rajasthan.", "policy_takeaway": "Drone-derived Cadastral Map vector boundaries should be legally codified as conclusive prima-facie boundary evidence under state survey laws."}, {"id": "DOC-GOI-016", "title": "Bhoomi 2.0 & ULPIN Integration: Impact of Geo-Referenced Cadastral Parcel Identifiers in Karnataka", "agency": "Revenue Department, Government of Karnataka & IIT Bombay", "authors": "Karnataka Land Records Directorate & CSRE, IIT Bombay", "year": 2024, "type": "Case Study / Research Paper", "category": "Titling & Land Rights", "state": "Karnataka", "quality": 96, "verified": true, "doi_url": "https://bhoomi.karnataka.gov.in/ulpin-impact-2024", "abstract": "Investigates the implementation of 14-digit ULPIN (Bhu-Aadhaar) across 31 districts of Karnataka. Tracks the synchronization of Dishaank mobile GIS application with the central Bhoomi engine for instant citizen-led parcel validation.", "key_findings": ["Citizen verification via Dishaank app surpassed 4.2 million queries, unmasking over 14,000 fraudulent attempts to sell government/lake buffer lands.", "ULPIN linkage slashed title verification certificates for bank home loans from 18 days to instant online clearance.", "Boundary resurvey appeals dropped by 38% after landowners received georeferenced maps with polygon corner coordinates."], "methodology": "Analysis of 12 million spatial land records integrated with Bhoomi mutation logs between 2021 and 2024.", "policy_takeaway": "Mobile-first citizen GIS tools empower grassroots transparency and deter localized surveyor corruption."}, {"id": "DOC-GOI-017", "title": "Drone Resurvey Precision and Citizen Grievance Redressal in Gujarat: An Analysis of AnyRoR", "agency": "Revenue Department, Government of Gujarat & CEPT University", "authors": "Centre for Urban Equity, CEPT University, Ahmedabad", "year": 2023, "type": "Evaluation Study", "category": "Digitization & Cadastre", "state": "Gujarat", "quality": 92, "verified": true, "doi_url": "https://anyror.gujarat.gov.in/resurvey-evaluation", "abstract": "Critically examines the statewide modern resurvey project executed via aerial photography and DGPS in Gujarat. Evaluates why initial data errors caused public protests and how subsequent AI quality checks and Camp-mode corrections resolved discrepancies.", "key_findings": ["Early resurvey phases suffered from a 12.4% discrepancy rate due to inadequate village-level Ground Control Points and lack of farmer participation.", "Transition to mandatory on-site farmer sign-offs with digital tablet confirmation reduced subsequent rectification petitions by 88%.", "Demonstrates that technological modernization fails without robust institutional trust and transparent public review camps (Shibirs)."], "methodology": "Survey of 1,800 farmers across 6 districts and audit of 45,000 resurvey objection petitions filed under the Gujarat Land Revenue Code.", "policy_takeaway": "No cadastral resurvey should be gazetted without a mandatory 90-day transparent public display and community validation shibir."}, {"id": "DOC-GOI-018", "title": "Slum Land Titling and Geospatial Documentation: Empirical Learnings from Odisha's Jaga Mission", "agency": "Housing & Urban Development Department, Govt of Odisha & Tata Trusts", "authors": "Jaga Mission Project Directorate, Bhubaneswar", "year": 2023, "type": "Case Study / Impact Report", "category": "Titling & Land Rights", "state": "Odisha", "quality": 95, "verified": true, "doi_url": "https://urban.odisha.gov.in/jaga-mission-report", "abstract": "Winner of the UN-Habitat World Habitat Award, the Jaga Mission represents the world's largest slum land titling initiative. Documents the grant of secure, heritable, inalienable land rights to over 240,000 urban poor households using drone mapping and Slum Dwellers Associations.", "key_findings": ["Secured tenure spurred an immediate 3.4x private investment in household sanitation, brick housing, and municipal water connections.", "Zero evictions or violent confrontations recorded across 2,900 surveyed slums due to participatory community boundary demarcation.", "Integrates slum land rights into Municipal GIS registries, eliminating the 'informal invisible city' dichotomy."], "methodology": "High-resolution drone mapping covering 175 urban local bodies (ULBs), paired with 100% biometric household enumeration.", "policy_takeaway": "Conclusive land titling must include explicit pro-poor statutory frameworks to integrate urban informal settlements into the formal city."}, {"id": "DOC-GOI-019", "title": "Real-Time Mirror Check & Spatial Mutation Synchronization: Lessons from Maharashtra Mahabhulekh", "agency": "Settlement Commissioner & Director of Land Records, Maharashtra", "authors": "e-Governance Land Records Project Unit, Pune", "year": 2024, "type": "Research Paper", "category": "Digitization & Cadastre", "state": "Maharashtra", "quality": 94, "verified": true, "doi_url": "https://mahabhumi.gov.in/research/rtm-study", "abstract": "Technical audit of the automated linkage between Maharashtra's registration software (i-SARITA) and land record portal (Mahabhulekh / 7/12 extract). Evaluates how e-Mutation (e-Ferfar) eliminated the historical multi-month lag in updating title records.", "key_findings": ["Automated notice generation under Section 149 of MLRC cut mutation processing time from 94 days to an average of 14 days.", "Direct digital submission of registered sale deeds into the Talathi's digital mutation ledger prevented 99.4% of duplicate parallel registrations.", "Identifies remaining bottleneck: manual spatial map splitting (Tippan) remains un-synchronized for 31% of sub-divided parcels."], "methodology": "Performance metrics extracted from 4.8 million digital mutation transactions across 358 talukas over a 36-month monitoring window.", "policy_takeaway": "Automated CAD-based boundary sub-division tools must be provided to licensed private surveyors to clear spatial mutation backlogs."}, {"id": "DOC-GOI-020", "title": "Agricultural Land Leasing Reforms in Telangana: Dharani Portal Transition and Tenancy Friction", "agency": "Centre for Economic and Social Studies (CESS), Hyderabad", "authors": "Prof. E. Revathi, Land Studies Division, CESS", "year": 2023, "type": "Research Paper", "category": "Climate & Agriculture", "state": "Telangana", "quality": 91, "verified": true, "doi_url": "https://cess.ac.in/dharani-tenancy-study", "abstract": "Examines the systemic impact of Telangana's Dharani integrated portal on agricultural land governance. Analyzes the balance between swift, corruption-free buyer-seller registration and the unintended exclusion of non-pattadar tenant farmers (kauldars).", "key_findings": ["Pattadar registration achieved unprecedented 15-minute slot-based completion with zero middleman interference.", "However, the digital removal of the 'Cultivator Column' (Pahani Column 12) rendered 1.4 million tenant farmers ineligible for Rythu Bandhu and crop insurance.", "Recommends the addition of an authenticated 'Licensed Cultivator Register' module to safeguard tenant livelihoods without compromising landowner title security."], "methodology": "Field surveys of 900 tenant farmer households across 4 agro-ecological zones of Telangana, cross-verified with Mandal Revenue records.", "policy_takeaway": "Digital land registries must balance landowner title protection with verifiable tenant operational rights to avoid agrarian distress."}];
window.BHUMI_AI = {"titling": {"title": "Conclusive Titling (Torrens System) vs Presumptive Titling in India", "badge": "Policy Blueprint", "source": "NITI Aayog Model Act 2020 & NCAER N-LRSI", "confidence": "99.4%", "summary": "India currently operates under a presumptive titling system governed by the Registration Act, 1908 and Transfer of Property Act, 1882. Registration only records transaction details, not ownership verification. The buyer assumes all risk (caveat emptor). In contrast, NITI Aayog's Model Conclusive Land Titling Act proposes a Torrens system where the State guarantees title based on three foundational principles:", "points": ["**Mirror Principle**: The land register accurately mirrors all current legal facts, rights, charges, and boundaries of a parcel.", "**Curtain Principle**: A registered title eliminates the requirement to trace historical ownership deeds beyond the register.", "**Insurance / Indemnity Principle**: The State guarantees the title and compensates any rightful party suffering loss due to administrative error.", "**Key Enabler**: Integration of 14-digit ULPIN (Bhu-Aadhaar) with conclusive state tribunals to resolve disputes within a 3-year sunset window."], "takeaway": "Transitioning to conclusive titling requires establishing an initial State Land Title Indemnity Fund (recommended at 0.5% of annual stamp duty) to manage compensation liability."}, "ulpin": {"title": "Impact of ULPIN (Bhu-Aadhaar) on Civil Dispute Reduction", "badge": "Technological Reform", "source": "DoLR Guidelines & DAKSH Subordinate Court Survey", "confidence": "98.7%", "summary": "ULPIN (Unique Land Parcel Identification Number) is a 14-digit alphanumeric geo-referenced identifier for land parcels based on their polygon vertex coordinates (longitude and latitude). Developed under DILRMP by DoLR and NIC:", "points": ["**Prevents Fraudulent Multi-Sales**: SRO registry systems query the ULPIN database in real-time, instantly blocking any attempt to re-register an already sold parcel.", "**Direct Link with e-Courts NJDG**: ULPIN allows automatic flagging of sub-judice land parcels, preventing innocent citizens from buying litigated properties.", "**De-clutters Court Dockets**: Over 28% of subordinate civil court property suits stem from boundary ambiguities and double registration; ULPIN eliminates coordinate overlap by design.", "**Bank Mortgage Validation**: Empowers institutional lenders to place a digital lien directly on the ULPIN record, preventing double-mortgage frauds."], "takeaway": "ULPIN adoption is live in 29+ States/UTs. Full statutory enforcement in registration acts is the vital next step to realize complete dispute prevention."}, "cadastre": {"title": "NCAER N-LRSI Cadastral Map Accuracy & Synchronization Deficit", "badge": "Empirical Finding", "source": "NCAER Land Records and Services Index (N-LRSI)", "confidence": "97.9%", "summary": "The NCAER N-LRSI reports reveal that while Record of Rights (RoRs) text computerization has exceeded 99.8%, the spatial digitization and synchronization of cadastral maps lags critically behind:", "points": ["**The 'Synchronization Deficit'**: Textual land registers and spatial cadastral maps frequently reflect conflicting parcel extents and names due to unsynchronized manual mutations.", "**Un-digitized Sub-divisions**: When ancestral land is partitioned among heirs, the text records are updated, but the spatial cadastral map (Bhu-Naksha) remains un-split, triggering future boundary suits.", "**Accuracy Gaps in Legacy Maps**: Over 60% of cadastral maps in central and eastern India date back to British or early post-independence chain surveys with substantial distortion.", "**The Drone Solution**: Standardized UAV drone mapping with CORS network corrections (as mandated in SVAMITVA) achieves \u00b15cm relative accuracy, solving legacy discrepancies."], "takeaway": "States must deploy automated CAD tools and licensed GIS surveyors to clear the cadastral map-splitting backlog."}, "svamitva": {"title": "SVAMITVA Scheme Impact on Rural Credit & Abadi Governance", "badge": "Evaluation Finding", "source": "IIM Ahmedabad Impact Assessment & MoPR", "confidence": "98.2%", "summary": "The SVAMITVA scheme, launched by the Ministry of Panchayati Raj, utilizes drone survey technology to map rural populated abadi areas and issue legal Property Cards (Sampatti Patra):", "points": ["**Financial Inclusion Boost**: IIM Ahmedabad's study identified a 34.2% surge in formal institutional loans secured by rural households utilizing their property card as legal collateral.", "**41% Drop in Village Boundary Suits**: High-resolution 5cm GSD ortho-rectified drone imagery provided incontrovertible boundary proof, resolving age-old village disputes peacefully.", "**Local Government Revenue**: Gram Panchayats witnessed an average 28% expansion in own-source property tax revenues, enabling localized infrastructural self-reliance.", "**Evidence-Based GPDPs**: GIS village maps empower Panchayats to construct accurate Gram Panchayat Development Plans for drainage, street lighting, and school expansion."], "takeaway": "SVAMITVA property cards must be formally recognized across all schedule commercial banks on the IBA portal to accelerate rural mortgage liquidity."}, "fra": {"title": "Forest Rights Act (FRA 2006) Spatial Demarcation Challenges", "badge": "Tribal Governance", "source": "Ministry of Tribal Affairs & CPR Research", "confidence": "96.5%", "summary": "Under the Forest Rights Act, 2006, Individual (IFR) and Community Forest Resource (CFR) rights have been granted to forest-dwelling Scheduled Tribes and traditional forest dwellers. However:", "points": ["**Spatial Invisibility**: 74% of CFR titles granted on paper have never been digitized into official State Revenue and Forest GIS cadastral databases.", "**Overlapping Concessions**: Because CFR boundaries are missing from Bhuvan and state GIS layers, mining leases or infrastructure alignments are frequently approved on top of community forests.", "**Conflict Generation**: Lack of clear geo-coordinates between adjacent village Gram Sabhas creates localized inter-community friction over non-timber forest produce (NTFP).", "**Recommended Action**: Co-mandating a dedicated 'FRA Spatial Layer' in Bhu-Naksha and DILRMP with participatory DGPS boundary validation."], "takeaway": "Spatial integration of CFR polygons into the national land stack is both a human rights imperative and an environmental protection necessity."}, "ngdrs": {"title": "Solving the SRO-Revenue Synchronization Deficit with NGDRS", "badge": "Digital Architecture", "source": "NIC Architecture Whitepaper & DoLR", "confidence": "97.8%", "summary": "Historically, Registration (under the Registration Act, 1908 in Sub-Registrar Offices) and Mutation (under Land Revenue Codes in Tehsils) operated as disconnected silos. This lag allowed fraudulent owners to sell the same plot multiple times before mutation was posted:", "points": ["**Automatic e-Mutation Initiation**: NGDRS triggers an automated mutation notice to the concerned Circle Officer/Tehsildar the exact second a sale deed is registered.", "**Instant Encumbrance Certificate**: The deed details are mirrored into the public land portal, warning any subsequent prospective buyer within seconds.", "**Aadhaar e-KYC Verification**: Biometric authentication eliminates impersonation frauds during land sales.", "**Full Interoperability**: Built on open REST/GraphQL APIs conforming to NIC MeghRaj and DigiLocker interoperability standards."], "takeaway": "Complete adoption of NGDRS across all 36 States/UTs coupled with mandatory ULPIN validation will eradicate over 90% of deed-mutation fraudulent disputes."}};
