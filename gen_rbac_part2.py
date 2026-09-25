# -*- coding: utf-8 -*-
"""
gen_rbac_part2.py
Generates the comprehensive JavaScript logic for authentication, RBAC data filtering, and UI rendering.
"""

js_logic = r"""
// Definitive Stakeholder Personas & Permissions
const ROLES = {
  Officer: {
    id: "Officer",
    title: "Government Officer (DoLR / State Revenue)",
    name: "Sh. S. Sharma, IAS",
    designation: "Joint Secretary, Department of Land Resources (DoLR), MoRD",
    clearance: "Level 4: National Executive Full Access",
    badgeColor: "tag-verified",
    avatar: "🏛️",
    desc: "Full unrestricted access: Raw dispute analytics, policy simulation engine, state evidence pack generation, administrative controls."
  },
  Reviewer: {
    id: "Reviewer",
    title: "State Evidence Reviewer",
    name: "Dr. K. N. Rao",
    designation: "Chairperson, State Evidence Review & Cadastral Audit Board",
    clearance: "Level 3: State Validation & Evidence Review",
    badgeColor: "tag-saffron",
    avatar: "📋",
    desc: "Authorized to audit state-level evidence packs, validate drone resurvey metrics, inspect discrepancy reports, and grant statutory clearances."
  },
  Institution: {
    id: "Institution",
    title: "Research Institution / University",
    name: "Prof. M. K. Iyer",
    designation: "Dean of Research, IIT Bombay & CEPT Consortium",
    clearance: "Level 3: Institutional Grantee & Academia",
    badgeColor: "tag-blue",
    avatar: "🏫",
    desc: "Authorized to administer DILRMP 3.0 ₹50 Cr research grants, manage university working groups, access full publications repository, and submit institutional pilot evaluations."
  },
  Researcher: {
    id: "Researcher",
    title: "Academic Researcher",
    name: "Dr. Ananya Verma",
    designation: "Senior Research Fellow, Land Governance & Policy Analytics",
    clearance: "Level 2: Certified Academic Researcher",
    badgeColor: "tag-purple",
    avatar: "🔬",
    desc: "Authorized to read full unredacted research papers, download empirical methodology datasets, access the AI Research Copilot, and submit draft papers."
  },
  Public: {
    id: "Public",
    title: "Citizen / Student (Public User)",
    name: "Guest Citizen",
    designation: "Public Open Data Viewer",
    clearance: "Level 1: Public Open Data (Limited Access)",
    badgeColor: "tag-gray",
    avatar: "👥",
    desc: "Limited public open data access. Sensitive dispute litigation risk indices, policy simulation sandbox, full empirical papers, and evidence packs are restricted."
  }
};

// Global Application State
let appState = {
  currentRole: 'Officer', // Default to Officer for complete demonstration, easily switched
  currentTab: 'map',
  selectedState: 'UP',
  selectedDistrict: null,
  mapMetric: 'research',
  mapMode: 'svg',
  searchQuery: '',
  filterCategory: 'All',
  filterType: 'All',
  filterState: 'All',
  theme: 'dark',
  leafletMap: null,
  leafletMarkers: [],
  auditLog: [
    { time: new Date().toLocaleTimeString(), user: 'Sh. S. Sharma, IAS', action: 'Session started. National DILRMP 3.0 Executive Workspace active.' },
    { time: new Date(Date.now() - 120000).toLocaleTimeString(), user: 'System Gateway', action: 'Bhuvan OGC WMS Layer synchronization complete.' },
    { time: new Date(Date.now() - 360000).toLocaleTimeString(), user: 'System Gateway', action: 'e-Courts NJDG dispute database mirror check verified.' }
  ],
  userSubmissions: [
    { id: 'SUB-101', title: 'Machine Learning for Cadastral Parcel Boundary Reconstruction', author: 'Dr. P. Nair (IIT Roorkee)', state: 'Uttarakhand', status: 'Pending Review' },
    { id: 'SUB-102', title: 'Spatial Socio-Economic Analysis of SVAMITVA in Bundelkhand', author: 'Centre for Rural Policy', state: 'Uttar Pradesh', status: 'Approved' }
  ],
  chatMessages: [
    { sender: 'bot', text: 'Namaste! I am the **Bhumi AI Research Copilot**. I synthesize evidence from over 20 government publications, DILRMP benchmarks, NITI Aayog model acts, and Land Conflict Watch datasets. How can I assist your land governance research today?' }
  ]
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  updateAuthHeader();
  updateClearanceBanner();
  renderTabNav();
  switchTab('map');
});

// Authentication & Persona Management
function updateAuthHeader() {
  const container = document.getElementById('auth-header-container');
  if (!container) return;
  
  const role = ROLES[appState.currentRole];
  if (appState.currentRole === 'Public') {
    container.innerHTML = `
      <button class="btn btn-sm btn-primary" onclick="openLoginModal()" style="box-shadow:0 0 12px rgba(16,185,129,0.35);">
        🔒 Sign In / Government SSO
      </button>
    `;
  } else {
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <div class="user-profile-badge" onclick="openLoginModal()" title="Click to switch persona or clearance tier">
          <span class="user-avatar">${role.avatar}</span>
          <div style="text-align:left;">
            <div style="font-weight:700; font-size:12.5px; color:var(--text-main); line-height:1.2;">${role.name}</div>
            <div style="font-size:10.5px; color:var(--text-muted);">${role.title.split(' ')[0]} · <span style="color:var(--gov-green); font-weight:700;">${role.clearance.split(':')[0]}</span></div>
          </div>
          <span style="font-size:10px; opacity:0.6;">▼</span>
        </div>
        <button class="btn btn-sm" onclick="logoutToPublic()" title="Log out to Public Open Data Mode">
          Log Out
        </button>
      </div>
    `;
  }
}

function updateClearanceBanner() {
  const pill = document.getElementById('clearance-pill-tag');
  const text = document.getElementById('clearance-summary-text');
  if (!pill || !text) return;
  
  const r = ROLES[appState.currentRole];
  pill.textContent = r.clearance.split(':')[0] + ' · ' + r.title.split(' ')[0];
  
  if (appState.currentRole === 'Officer') {
    pill.style.background = 'rgba(16,185,129,0.2)';
    pill.style.color = '#10b981';
    text.textContent = 'Active Session: Sh. S. Sharma, IAS (DoLR) · Full Unrestricted Administrative, Analytical & Judicial Access';
  } else if (appState.currentRole === 'Reviewer') {
    pill.style.background = 'rgba(245,158,11,0.2)';
    pill.style.color = '#f59e0b';
    text.textContent = 'Active Session: Dr. K. N. Rao · State Evidence Review Board · Authorized to Validate Drone Audits & Issue Clearances';
  } else if (appState.currentRole === 'Institution') {
    pill.style.background = 'rgba(59,130,246,0.2)';
    pill.style.color = '#60a5fa';
    text.textContent = 'Active Session: Prof. M. K. Iyer · IIT Bombay Consortium · Institutional Grant Management & Working Groups';
  } else if (appState.currentRole === 'Researcher') {
    pill.style.background = 'rgba(168,85,247,0.2)';
    pill.style.color = '#c084fc';
    text.textContent = 'Active Session: Dr. Ananya Verma · Senior Fellow · Unrestricted Research Publications, Datasets & AI Copilot';
  } else {
    pill.style.background = 'rgba(156,163,175,0.2)';
    pill.style.color = '#9ca3af';
    text.textContent = 'Public Open Data Tier: Limited Access · Sensitive Dispute Risk Indices, Policy Simulation & Evidence Packs Restricted';
  }
}

function openLoginModal() {
  document.getElementById('login-modal').classList.add('open');
}

function switchAuthTab(tab) {
  const btn1 = document.getElementById('auth-tab-btn1');
  const btn2 = document.getElementById('auth-tab-btn2');
  const p1 = document.getElementById('auth-pane-personas');
  const p2 = document.getElementById('auth-pane-otp');
  
  if (tab === 'personas') {
    btn1.style.borderBottom = '2px solid var(--gov-green)';
    btn1.style.opacity = '1';
    btn2.style.borderBottom = 'none';
    btn2.style.opacity = '0.7';
    p1.style.display = 'flex';
    p2.style.display = 'none';
  } else {
    btn2.style.borderBottom = '2px solid var(--gov-green)';
    btn2.style.opacity = '1';
    btn1.style.borderBottom = 'none';
    btn1.style.opacity = '0.7';
    p2.style.display = 'flex';
    p1.style.display = 'none';
  }
}

function loginAs(roleKey) {
  appState.currentRole = roleKey;
  updateAuthHeader();
  updateClearanceBanner();
  renderTabNav();
  closeModal('login-modal');
  
  const role = ROLES[roleKey];
  showToast(`Authenticated as ${role.name} (${role.clearance.split(':')[0]})`);
  logAudit(`Authenticated via Government SSO as ${role.title} (${role.name})`);
  
  // Refresh current view with appropriate permissions
  switchTab(appState.currentTab);
}

function logoutToPublic() {
  appState.currentRole = 'Public';
  updateAuthHeader();
  updateClearanceBanner();
  renderTabNav();
  showToast('Logged out to Public Open Data Tier (Limited Access)');
  logAudit('User logged out. Switched to Public Guest session.');
  switchTab(appState.currentTab);
}

function simulateSendOtp() {
  const idInput = document.getElementById('sso-id-input');
  if (!idInput.value.trim()) {
    alert('Please enter your Government Email, Aadhaar, or Mobile Number.');
    return;
  }
  document.getElementById('sso-otp-input').value = '526019';
  showToast('One-Time Password (OTP) sent: 526019');
}

function simulateVerifyOtp() {
  const otp = document.getElementById('sso-otp-input').value.trim();
  if (otp !== '526019') {
    alert('Invalid OTP. Please enter the simulated OTP: 526019');
    return;
  }
  loginAs('Officer');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3500);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  appState.theme = next;
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
  if (appState.currentTab === 'map' && appState.mapMode === 'svg') applySvgMapColors();
}

function logAudit(action) {
  appState.auditLog.unshift({
    time: new Date().toLocaleTimeString(),
    user: ROLES[appState.currentRole].name.split(',')[0],
    action: action
  });
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Navigation & Tab Permissions
function renderTabNav() {
  const tabs = document.querySelectorAll('.nav-tab');
  const role = appState.currentRole;
  
  // Set tab locks
  const lockSim = document.getElementById('tab-lock-sim');
  const lockRev = document.getElementById('tab-lock-review');
  const lockAdm = document.getElementById('tab-lock-admin');
  
  if (lockSim) lockSim.innerHTML = (role === 'Public' || role === 'Researcher' || role === 'Institution') ? '🔒' : '';
  if (lockRev) lockRev.innerHTML = (role === 'Public' || role === 'Researcher' || role === 'Institution') ? '🔒' : '';
  if (lockAdm) lockAdm.innerHTML = (role !== 'Officer') ? '🔒' : '';
  
  tabs.forEach(t => {
    t.setAttribute('aria-selected', t.dataset.tab === appState.currentTab);
  });
}

function checkTabAccess(tabId) {
  const role = appState.currentRole;
  if (tabId === 'sim') {
    return role === 'Officer' || role === 'Reviewer';
  }
  if (tabId === 'review') {
    return role === 'Officer' || role === 'Reviewer';
  }
  if (tabId === 'admin') {
    return role === 'Officer';
  }
  return true;
}

function renderRestrictedBanner(container, tabName, requiredClearance) {
  container.innerHTML = `
    <div class="restricted-zone-card">
      <div style="font-size:52px; margin-bottom:12px;">🔒</div>
      <span class="tag tag-saffron" style="font-size:12px; margin-bottom:8px;">Restricted Clearance Required</span>
      <h2 style="font-size:22px; font-weight:800; color:var(--text-main); margin-top:4px;">
        ${tabName} is Restricted
      </h2>
      <div style="font-size:13.5px; color:var(--text-muted); margin:10px auto; max-width:500px; line-height:1.6;">
        This administrative module contains confidential policy modeling, statutory evidence audits, or root system configurations.
        Access is restricted to <b>${requiredClearance}</b>.
      </div>
      <div style="margin-top:22px; display:flex; justify-content:center; gap:12px;">
        <button class="btn btn-primary" onclick="openLoginModal()">
          Sign In with Government SSO / Credentials
        </button>
        <button class="btn" onclick="switchTab('map')">
          Return to Public Map
        </button>
      </div>
    </div>
  `;
}

function switchTab(tabId) {
  appState.currentTab = tabId;
  renderTabNav();
  const ws = document.getElementById('workspace');
  ws.innerHTML = '';
  
  // Check tab access
  if (!checkTabAccess(tabId)) {
    if (tabId === 'sim') {
      renderRestrictedBanner(ws, "Policy Simulation Sandbox", "Government Officers (DoLR / State Revenue) & Evidence Reviewers");
    } else if (tabId === 'review') {
      renderRestrictedBanner(ws, "State Evidence Review Portal", "State Evidence Reviewers & Government Officers");
    } else if (tabId === 'admin') {
      renderRestrictedBanner(ws, "RBAC & System Governance Console", "Government Officers (DoLR National Executive)");
    }
    return;
  }
  
  if (tabId === 'map') renderMapView(ws);
  else if (tabId === 'repo') renderRepoView(ws);
  else if (tabId === 'copilot') renderCopilotView(ws);
  else if (tabId === 'sim') renderSimView(ws);
  else if (tabId === 'bench') renderBenchView(ws);
  else if (tabId === 'review') renderEvidenceReviewView(ws);
  else if (tabId === 'innovate') renderInnovateView(ws);
  else if (tabId === 'admin') renderAdminView(ws);
}

/* ==========================================================
   1. NATIONAL GIS & INTERACTIVE MAP VIEW (ROLE-FILTERED)
========================================================== */
function renderMapView(container) {
  const isPublic = appState.currentRole === 'Public';

  container.innerHTML = `
    ${isPublic ? `
      <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:10px; padding:10px 16px; margin-bottom:16px; font-size:12.5px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <span style="font-weight:700; color:var(--gov-saffron);">👁️ Public Open Tier:</span>
          Viewing general computerization milestones. Sensitive land dispute risk indices and official state evidence packs are restricted.
        </div>
        <button class="btn btn-sm btn-primary" onclick="openLoginModal()">Sign in as Government Officer →</button>
      </div>
    ` : ''}

    <div class="card" style="margin-bottom:20px; padding:16px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
            <span>🗺️</span> National Geospatial Land Governance Atlas
          </h2>
          <div style="font-size:12.5px; color:var(--text-muted);">
            Official administrative boundaries with verified state cadastral portals and DILRMP 2.0 progress.
          </div>
        </div>
        
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Heatmap Theme:</span>
          <div class="chips-wrapper" style="margin:0;">
            <button class="chip ${appState.mapMetric === 'research' ? 'active' : ''}" onclick="setMapMetric('research')">Research Volume</button>
            <button class="chip ${appState.mapMetric === 'ror' ? 'active' : ''}" onclick="setMapMetric('ror')">RoR Digitization %</button>
            <button class="chip ${appState.mapMetric === 'cadastral' ? 'active' : ''}" onclick="setMapMetric('cadastral')">Cadastral Maps %</button>
            <button class="chip ${appState.mapMetric === 'dispute' ? 'active' : ''}" onclick="setMapMetric('dispute')">Dispute Risk</button>
            <button class="chip ${appState.mapMetric === 'svamitva' ? 'active' : ''}" onclick="setMapMetric('svamitva')">SVAMITVA Cards</button>
          </div>
          
          <div style="border-left:1px solid var(--border-card); height:24px; margin:0 4px;"></div>
          
          <button class="btn btn-sm ${appState.mapMode === 'svg' ? 'btn-primary' : ''}" onclick="toggleMapMode('svg')">
            🇮🇳 Vector Map
          </button>
          <button class="btn btn-sm ${appState.mapMode === 'leaflet' ? 'btn-primary' : ''}" onclick="toggleMapMode('leaflet')">
            🛰️ Satellite GIS (Bhuvan/Leaflet)
          </button>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <!-- Left Column: Map Viewport -->
      <div class="map-viewport-wrapper">
        <div class="map-floating-controls">
          <span class="tag tag-verified">Official Boundaries (Survey of India)</span>
          <span class="tag tag-saffron" id="active-metric-tag">Metric: Research Volume</span>
        </div>
        
        <div class="map-floating-legend" id="map-legend">
          <span style="font-weight:700;" id="legend-title">Research Volume (Publications)</span>
          <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted);">
            <span id="legend-low">Low (&lt; 15)</span>
            <span id="legend-high">High (50+)</span>
          </div>
          <div class="legend-bar" id="legend-gradient-bar" style="background: linear-gradient(90deg, #103622, #2ecc71);"></div>
        </div>
        
        <div id="svg-map-container"></div>
        <div id="leaflet-map"></div>
        <div id="map-hover-tooltip"></div>
      </div>
      
      <!-- Right Column: State Drilldown & Evidence Panel -->
      <div class="card" id="state-detail-panel"></div>
    </div>
  `;

  renderSvgMap();
  updateStateDetailPanel();
}

function toggleMapMode(mode) {
  appState.mapMode = mode;
  const svgCont = document.getElementById('svg-map-container');
  const leafCont = document.getElementById('leaflet-map');
  const leg = document.getElementById('map-legend');
  
  if (mode === 'svg') {
    svgCont.style.display = 'flex';
    leafCont.style.display = 'none';
    leg.style.display = 'flex';
  } else {
    svgCont.style.display = 'none';
    leafCont.style.display = 'block';
    leg.style.display = 'none';
    initLeafletMap();
  }
}

function setMapMetric(metric) {
  appState.mapMetric = metric;
  const tag = document.getElementById('active-metric-tag');
  const legTitle = document.getElementById('legend-title');
  const legBar = document.getElementById('legend-gradient-bar');
  const legLow = document.getElementById('legend-low');
  const legHigh = document.getElementById('legend-high');
  
  if (metric === 'research') {
    tag.textContent = 'Metric: Research Volume';
    legTitle.textContent = 'Research Volume (Publications)';
    legBar.style.background = 'linear-gradient(90deg, #103622, #2ecc71)';
    legLow.textContent = 'Low (< 15)';
    legHigh.textContent = 'High (50+)';
  } else if (metric === 'ror') {
    tag.textContent = 'Metric: RoR Computerization %';
    legTitle.textContent = 'Record of Rights Digitization (%)';
    legBar.style.background = 'linear-gradient(90deg, #1e3a8a, #3b82f6)';
    legLow.textContent = '90%';
    legHigh.textContent = '100%';
  } else if (metric === 'cadastral') {
    tag.textContent = 'Metric: Cadastral Map Digitization %';
    legTitle.textContent = 'Cadastral Maps Digitized (%)';
    legBar.style.background = 'linear-gradient(90deg, #065f46, #10b981)';
    legLow.textContent = '65%';
    legHigh.textContent = '100%';
  } else if (metric === 'dispute') {
    tag.textContent = 'Metric: Land Dispute Risk Index';
    legTitle.textContent = 'Civil Dispute Pressure (DAKSH / LCW)';
    legBar.style.background = 'linear-gradient(90deg, #78350f, #f59e0b)';
    legLow.textContent = 'Low (30)';
    legHigh.textContent = 'Severe (85)';
  } else if (metric === 'svamitva') {
    tag.textContent = 'Metric: SVAMITVA Property Cards';
    legTitle.textContent = 'Rural Property Cards Distributed';
    legBar.style.background = 'linear-gradient(90deg, #581c87, #c084fc)';
    legLow.textContent = '0.2 Lakh';
    legHigh.textContent = '50+ Lakh';
  }

  const ws = document.getElementById('workspace');
  ws.querySelectorAll('.chip').forEach(c => {
    c.classList.remove('active');
    if (c.getAttribute('onclick')?.includes(metric)) c.classList.add('active');
  });

  applySvgMapColors();
}

function renderSvgMap() {
  const container = document.getElementById('svg-map-container');
  if (!container) return;
  
  let pathsHtml = '';
  for (const [code, st] of Object.entries(window.BHUMI_STATES)) {
    if (!st.path_d) continue;
    pathsHtml += `<path class="map-state-path ${appState.selectedState === code ? 'selected' : ''}" 
      id="svg-state-${code}" 
      data-code="${code}" 
      d="${st.path_d}">
      <title>${st.name}</title>
    </path>`;
  }

  container.innerHTML = `
    <svg id="india-svg-map" viewBox="0 0 9207 10547" xmlns="http://www.w3.org/2000/svg">
      <g id="india-states-group">
        ${pathsHtml}
      </g>
    </svg>
  `;

  const paths = container.querySelectorAll('.map-state-path');
  const tip = document.getElementById('map-hover-tooltip');
  
  paths.forEach(p => {
    p.addEventListener('pointerenter', (e) => {
      const code = p.dataset.code;
      const st = window.BHUMI_STATES[code];
      if (!st) return;
      tip.style.display = 'block';
      tip.innerHTML = `
        <div style="font-weight:700; font-size:13px; color:var(--text-main);">${st.name} (${code})</div>
        <div style="font-size:11.5px; color:var(--gov-green); font-weight:600; margin-bottom:4px;">Portal: ${st.portal.split(' ')[0]}</div>
        <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); gap:8px;">
          <span>Research: <b>${st.research_count}</b></span>
          <span>RoR: <b>${st.ror_pct}%</b></span>
          <span>Dispute: <b>${appState.currentRole === 'Public' ? '🔒 Masked' : st.dispute_idx}</b></span>
        </div>
      `;
    });
    
    p.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      tip.style.left = (e.clientX - rect.left + 15) + 'px';
      tip.style.top = (e.clientY - rect.top + 15) + 'px';
    });
    
    p.addEventListener('pointerleave', () => { tip.style.display = 'none'; });
    p.addEventListener('click', () => { selectState(p.dataset.code); });
  });

  applySvgMapColors();
}

function applySvgMapColors() {
  const container = document.getElementById('svg-map-container');
  if (!container) return;
  const paths = container.querySelectorAll('.map-state-path');
  const m = appState.mapMetric;
  
  paths.forEach(p => {
    const code = p.dataset.code;
    const st = window.BHUMI_STATES[code];
    if (!st) return;
    
    let color = '#1a3826';
    if (m === 'research') {
      const frac = Math.min(1, Math.max(0, (st.research_count - 10) / 45));
      color = interpolateColor('#122f20', '#2ecc71', frac);
    } else if (m === 'ror') {
      const frac = Math.min(1, Math.max(0, (st.ror_pct - 90) / 10));
      color = interpolateColor('#1e3a8a', '#60a5fa', frac);
    } else if (m === 'cadastral') {
      const frac = Math.min(1, Math.max(0, (st.cadastral_pct - 65) / 35));
      color = interpolateColor('#064e3b', '#10b981', frac);
    } else if (m === 'dispute') {
      const frac = Math.min(1, Math.max(0, (st.dispute_idx - 30) / 55));
      color = interpolateColor('#78350f', '#f59e0b', frac);
    } else if (m === 'svamitva') {
      const num = parseFloat(st.svamitva_cards) || 1;
      const frac = Math.min(1, Math.max(0, num / 50));
      color = interpolateColor('#4c1d95', '#c084fc', frac);
    }
    
    if (code === appState.selectedState) {
      p.style.fill = '#f59e0b';
    } else {
      p.style.fill = color;
    }
  });
}

function interpolateColor(color1, color2, factor) {
  let c1 = parseInt(color1.slice(1), 16);
  let c2 = parseInt(color2.slice(1), 16);
  let r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
  let r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
  let r = Math.round(r1 + factor * (r2 - r1));
  let g = Math.round(g1 + factor * (g2 - g1));
  let b = Math.round(b1 + factor * (b2 - b1));
  return `rgb(${r}, ${g}, ${b})`;
}

function selectState(code) {
  appState.selectedState = code;
  appState.selectedDistrict = null;
  
  const container = document.getElementById('svg-map-container');
  if (container) {
    container.querySelectorAll('.map-state-path').forEach(p => {
      p.classList.remove('selected');
      if (p.dataset.code === code) p.classList.add('selected');
    });
    applySvgMapColors();
  }
  
  updateStateDetailPanel();
  logAudit(`State drilldown: ${window.BHUMI_STATES[code]?.name || code}`);
}

function updateStateDetailPanel() {
  const panel = document.getElementById('state-detail-panel');
  if (!panel) return;
  
  const code = appState.selectedState;
  const st = window.BHUMI_STATES[code];
  if (!st) return;
  
  const isPublic = appState.currentRole === 'Public';
  const isOfficerOrReviewer = appState.currentRole === 'Officer' || appState.currentRole === 'Reviewer';
  
  const statePapers = window.BHUMI_PAPERS.filter(p => p.state === 'National' || p.state.includes(st.name) || p.state.includes(code));
  
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <h3 style="font-size:20px; font-weight:800; color:var(--text-main); margin:0;">${st.name}</h3>
          <span class="tag tag-saffron">${code}</span>
        </div>
        <div style="font-size:12.5px; color:var(--text-muted); margin-top:2px;">
          Capital: <b>${st.capital}</b> · Nodal Revenue Portal: 
          <a href="${st.portal_url}" target="_blank" style="color:var(--gov-green); font-weight:700; text-decoration:underline;">
            ${st.portal} ↗
          </a>
        </div>
      </div>
      
      ${isOfficerOrReviewer ? `
        <button class="btn btn-primary btn-sm" onclick="exportStateEvidencePack('${code}')">
          📥 State Evidence Pack
        </button>
      ` : `
        <button class="btn btn-sm" style="opacity:0.6; cursor:not-allowed;" title="Requires Government Officer or Reviewer login" onclick="openLoginModal()">
          🔒 Evidence Pack (Sign In Needed)
        </button>
      `}
    </div>
    
    <!-- Key Indicators Grid -->
    <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; margin-top:8px;">
      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); padding:12px; border-radius:10px;">
        <div class="kpi-label">RoR Computerized</div>
        <div style="font-size:22px; font-weight:800; color:var(--gov-green); font-family:var(--font-mono);">${st.ror_pct}%</div>
        <div class="stat-bar-track" style="margin-top:4px;">
          <div class="stat-bar-fill" style="width:${st.ror_pct}%;"></div>
        </div>
      </div>
      
      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); padding:12px; border-radius:10px;">
        <div class="kpi-label">Cadastral Maps Digitized</div>
        <div style="font-size:22px; font-weight:800; color:var(--gov-blue); font-family:var(--font-mono);">${st.cadastral_pct}%</div>
        <div class="stat-bar-track" style="margin-top:4px;">
          <div class="stat-bar-fill" style="width:${st.cadastral_pct}%; background:var(--gov-blue);"></div>
        </div>
      </div>
      
      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); padding:12px; border-radius:10px;">
        <div class="kpi-label">Dispute Risk Score</div>
        ${isPublic ? `
          <div style="margin-top:4px;">
            <span class="tag tag-saffron" style="font-size:11px;">🔒 Restricted to Officers</span>
            <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">DAKSH / e-Courts Data Masked</div>
          </div>
        ` : `
          <div style="font-size:22px; font-weight:800; color:${st.dispute_idx > 65 ? 'var(--gov-saffron)' : 'var(--gov-green)'}; font-family:var(--font-mono);">
            ${st.dispute_idx} <small style="font-size:11px; color:var(--text-muted);">/100</small>
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
            ${st.dispute_idx > 65 ? 'High Litigation Pressure' : 'Moderate Backlog'}
          </div>
        `}
      </div>
      
      <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); padding:12px; border-radius:10px;">
        <div class="kpi-label">SVAMITVA Property Cards</div>
        <div style="font-size:22px; font-weight:800; color:var(--text-main); font-family:var(--font-mono);">${st.svamitva_cards}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">ULPIN: <b>${st.ulpin_status.split(' ')[0]}</b></div>
      </div>
    </div>
    
    <!-- Representative Districts Drilldown -->
    <div style="margin-top:8px;">
      <div style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:6px;">
        Districts & Cadastral Zones (${st.districts.length} Sample Profiles):
      </div>
      <div class="chips-wrapper">
        <button class="chip ${!appState.selectedDistrict ? 'active' : ''}" onclick="selectDistrict(null)">All Districts</button>
        ${st.districts.map(d => `
          <button class="chip ${appState.selectedDistrict === d[0] ? 'active' : ''}" onclick="selectDistrict('${d[0]}')">
            ${d[0]} <span style="font-size:10px; opacity:0.7;">· ${d[1].split('/')[0]}</span>
          </button>
        `).join('')}
      </div>
    </div>
    
    <!-- Government Publications for this State -->
    <div style="margin-top:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div style="font-size:13px; font-weight:700; color:var(--text-main);">
          Government Publications & Studies (${statePapers.length})
        </div>
        <a onclick="switchTab('repo')" style="font-size:12px; color:var(--gov-green); font-weight:600; cursor:pointer;">
          View Knowledge Hub →
        </a>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${statePapers.slice(0, 3).map(p => `
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); padding:10px 14px; border-radius:8px;">
            <div style="font-size:13px; font-weight:700; color:var(--text-main); line-height:1.3;">
              ${p.title}
            </div>
            <div style="font-size:11.5px; color:var(--text-muted); margin-top:3px; display:flex; justify-content:space-between;">
              <span>${p.agency} · ${p.year}</span>
              <a onclick="openPaperModal('${p.id}')" style="color:var(--gov-green); font-weight:700; cursor:pointer;">
                ${isPublic ? 'Read Abstract (🔒)' : 'Read Brief →'}
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectDistrict(distName) {
  appState.selectedDistrict = distName;
  updateStateDetailPanel();
}

function initLeafletMap() {
  if (appState.leafletMap) {
    setTimeout(() => { appState.leafletMap.invalidateSize(); }, 200);
    return;
  }
  
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;
  
  const map = L.map('leaflet-map', {
    center: [22.5, 82.0],
    zoom: 4.5,
    minZoom: 4,
    maxZoom: 14
  });
  
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors | Bhuvan NRSC'
  });
  
  const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
  });
  
  osmLayer.addTo(map);
  
  L.control.layers({
    "OpenStreetMap (Admin)": osmLayer,
    "Satellite Imagery (Bhuvan/Esri)": satLayer
  }, null, { position: 'topright' }).addTo(map);
  
  for (const [code, st] of Object.entries(window.BHUMI_STATES)) {
    if (!st.lat || !st.lng) continue;
    
    const isPublic = appState.currentRole === 'Public';
    const marker = L.circleMarker([st.lat, st.lng], {
      radius: 7 + Math.min(10, st.research_count / 5),
      fillColor: st.dispute_idx > 65 ? "#f59e0b" : "#10b981",
      color: "#ffffff",
      weight: 1.5,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(map);
    
    marker.bindPopup(`
      <div style="font-family:Plus Jakarta Sans, sans-serif; font-size:12px; color:#111;">
        <strong style="font-size:14px;">${st.name} (${code})</strong><br>
        <span style="color:#047857; font-weight:600;">Portal: ${st.portal}</span><br>
        RoR Digitization: <b>${st.ror_pct}%</b><br>
        Cadastral Maps: <b>${st.cadastral_pct}%</b><br>
        Dispute Risk: <b>${isPublic ? '🔒 Masked' : st.dispute_idx + '/100'}</b><br>
        Research Papers: <b>${st.research_count}</b><br>
        <button style="margin-top:6px; padding:4px 8px; background:#10b981; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:600;" 
          onclick="selectState('${code}'); toggleMapMode('svg');">
          Inspect State Analytics
        </button>
      </div>
    `);
  }
  
  appState.leafletMap = map;
  setTimeout(() => { map.invalidateSize(); }, 250);
}

/* ==========================================================
   2. UNIFIED KNOWLEDGE HUB (PUBLIC = ABSTRACT ONLY)
========================================================== */
function renderRepoView(container) {
  const isPublic = appState.currentRole === 'Public';
  const catOptions = ['All', 'Digitization & Cadastre', 'Titling & Land Rights', 'Land Disputes', 'SVAMITVA & Titling', 'Climate & Agriculture', 'Peri-Urban & Infra', 'Forest Rights (FRA)'];
  const typeOptions = ['All', 'Research Paper', 'Act / Model Legislation', 'Evaluation Study / Index', 'Dataset / Atlas', 'Government Guideline', 'Case Study / Research Paper'];

  container.innerHTML = `
    ${isPublic ? `
      <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:10px; padding:12px 18px; margin-bottom:16px; font-size:12.5px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-weight:700; color:var(--gov-saffron);">👁️ Public Open Tier:</span>
          Executive Abstracts are publicly accessible. Empirical findings, survey datasets, and actionable policy directives are restricted to verified Researchers & Government Officers.
        </div>
        <button class="btn btn-sm btn-primary" onclick="openLoginModal()">Sign in with Gov SSO / Academic ID</button>
      </div>
    ` : ''}

    <div class="search-filter-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="repo-search-input" placeholder="Search 20+ government papers, acts, guidelines, authors, or topics..." value="${appState.searchQuery}" oninput="handleRepoSearch(this.value)">
      </div>
      
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <select class="btn btn-sm" id="repo-cat-select" onchange="handleRepoFilter('category', this.value)">
          ${catOptions.map(c => `<option value="${c}" ${appState.filterCategory === c ? 'selected' : ''}>Category: ${c}</option>`).join('')}
        </select>
        
        <select class="btn btn-sm" id="repo-type-select" onchange="handleRepoFilter('type', this.value)">
          ${typeOptions.map(t => `<option value="${t}" ${appState.filterType === t ? 'selected' : ''}>Type: ${t}</option>`).join('')}
        </select>
        
        <select class="btn btn-sm" id="repo-state-select" onchange="handleRepoFilter('state', this.value)">
          <option value="All">Scope: All / National</option>
          ${Object.keys(window.BHUMI_STATES).map(k => `<option value="${window.BHUMI_STATES[k].name}">${window.BHUMI_STATES[k].name}</option>`).join('')}
        </select>
      </div>
    </div>
    
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
      <div style="font-size:13.5px; color:var(--text-muted);">
        Showing <b style="color:var(--text-main);" id="papers-filtered-count">0</b> verified policy publications & reports
      </div>
      ${!isPublic ? `
        <button class="btn btn-primary btn-sm" onclick="openUploadModal()">
          📤 Submit Research Draft
        </button>
      ` : ''}
    </div>

    <div class="grid-3" id="repo-cards-grid"></div>
  `;

  updateRepoCards();
}

function handleRepoSearch(query) {
  appState.searchQuery = query.toLowerCase();
  updateRepoCards();
}

function handleRepoFilter(key, val) {
  if (key === 'category') appState.filterCategory = val;
  if (key === 'type') appState.filterType = val;
  if (key === 'state') appState.filterState = val;
  updateRepoCards();
}

function updateRepoCards() {
  const grid = document.getElementById('repo-cards-grid');
  const countEl = document.getElementById('papers-filtered-count');
  if (!grid) return;
  
  const isPublic = appState.currentRole === 'Public';
  let papers = window.BHUMI_PAPERS;
  
  if (appState.searchQuery) {
    const q = appState.searchQuery;
    papers = papers.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.agency.toLowerCase().includes(q) ||
      p.abstract.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  
  if (appState.filterCategory !== 'All') {
    papers = papers.filter(p => p.category === appState.filterCategory);
  }
  if (appState.filterType !== 'All') {
    papers = papers.filter(p => p.type.includes(appState.filterType));
  }
  if (appState.filterState !== 'All') {
    papers = papers.filter(p => p.state === 'National' || p.state.includes(appState.filterState));
  }
  
  if (countEl) countEl.textContent = papers.length;
  
  if (papers.length === 0) {
    grid.innerHTML = `
      <div class="card" style="grid-column:1/-1; text-align:center; padding:40px;">
        <h4 style="font-size:16px;">No research publications found matching your filters</h4>
        <div style="font-size:13px; color:var(--text-muted); margin-top:6px;">Try adjusting the keyword or clearing category filters.</div>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = papers.map(p => `
    <div class="paper-card">
      <div>
        <div class="paper-top">
          <span class="tag tag-verified">${p.category}</span>
          <span class="tag tag-gray">${p.year}</span>
        </div>
        <div class="paper-title" style="margin-top:10px;">${p.title}</div>
        <div class="paper-agency">🏛️ ${p.agency}</div>
        <div class="paper-abstract" style="margin-top:8px;">${p.abstract}</div>
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-card); padding-top:12px; margin-top:8px;">
        <span style="font-size:11.5px; color:var(--text-dim); font-weight:600;">
          ⭐ Quality: <b>${p.quality}/100</b>
        </span>
        <button class="btn btn-sm ${isPublic ? '' : 'btn-primary'}" onclick="openPaperModal('${p.id}')">
          ${isPublic ? 'Read Abstract (🔒)' : 'Read Document'}
        </button>
      </div>
    </div>
  `).join('');
}

function openPaperModal(paperId) {
  const p = window.BHUMI_PAPERS.find(x => x.id === paperId);
  if (!p) return;
  
  const isPublic = appState.currentRole === 'Public';
  
  document.getElementById('modal-tag').textContent = p.type;
  document.getElementById('modal-year').textContent = p.year;
  
  const body = document.getElementById('modal-body-content');
  body.innerHTML = `
    <h2 style="font-size:20px; font-weight:800; line-height:1.35; color:var(--text-main); margin-bottom:6px;">
      ${p.title}
    </h2>
    <div style="font-size:13px; color:var(--gov-green); font-weight:600; margin-bottom:16px;">
      Publishing Authority: ${p.agency} · Authors/Division: ${p.authors}
    </div>
    
    <div style="background:var(--bg-card-subtle); border-left:3px solid var(--gov-green); padding:12px 16px; border-radius:0 8px 8px 0; margin-bottom:18px;">
      <strong style="color:var(--gov-green); font-size:12.5px; text-transform:uppercase; letter-spacing:0.04em;">Executive Summary</strong>
      <p style="font-size:13.5px; color:var(--text-main); margin-top:4px; line-height:1.5;">${p.abstract}</p>
    </div>
    
    ${isPublic ? `
      <!-- Restricted preview overlay for Public users -->
      <div class="locked-preview-overlay">
        <div style="font-size:24px; margin-bottom:4px;">🔒</div>
        <div style="font-weight:700; color:var(--gov-saffron); font-size:14px;">Restricted Clearance Section (Level 2+)</div>
        <div style="font-size:12.5px; color:var(--text-muted); margin:6px auto 14px; max-width:480px;">
          Detailed empirical findings, quantitative survey datasets, and official policy directives are restricted to verified <b>Academic Researchers</b> and <b>Government Officers</b>.
        </div>
        <button class="btn btn-sm btn-primary" onclick="closeModal('paper-modal'); openLoginModal();">
          Sign In with Gov SSO / Academic ID
        </button>
      </div>
    ` : `
      <!-- Full Access for Researcher / Officer -->
      <div style="margin-bottom:16px;">
        <h4 style="font-size:14px; font-weight:700; margin-bottom:6px;">Key Empirical Findings:</h4>
        <ul style="padding-left:20px; font-size:13.5px; color:var(--text-muted); display:flex; flex-direction:column; gap:6px;">
          ${p.key_findings.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-bottom:16px;">
        <h4 style="font-size:14px; font-weight:700; margin-bottom:4px;">Data & Research Methodology:</h4>
        <p style="font-size:13px; color:var(--text-muted);">${p.methodology}</p>
      </div>
      
      <div style="background:rgba(245, 158, 11, 0.1); border:1px solid rgba(245, 158, 11, 0.3); padding:12px; border-radius:8px;">
        <h4 style="font-size:13px; font-weight:700; color:var(--gov-saffron); margin-bottom:4px;">Actionable Policy Recommendation:</h4>
        <p style="font-size:13px; color:var(--text-main);">${p.policy_takeaway}</p>
      </div>
    `}
  `;
  
  const footer = document.getElementById('modal-footer-actions');
  if (isPublic) {
    footer.innerHTML = `
      <button class="btn btn-sm btn-primary" onclick="closeModal('paper-modal'); openLoginModal();">
        🔒 Sign in to Unlock Full Paper
      </button>
    `;
  } else {
    footer.innerHTML = `
      <button class="btn btn-sm" onclick="window.open('${p.doi_url}', '_blank')">Open Government Source</button>
      <button class="btn btn-primary btn-sm" onclick="addToEvidencePack('${p.id}')">Add to Evidence Pack</button>
    `;
  }
  
  document.getElementById('paper-modal').classList.add('open');
}

function addToEvidencePack(paperId) {
  logAudit(`Added publication to Evidence Pack: ${paperId}`);
  showToast('Publication added to your Active Evidence Dossier');
}

/* ==========================================================
   3. STATE EVIDENCE REVIEW PORTAL (REVIEWER & OFFICER ONLY)
========================================================== */
function renderEvidenceReviewView(container) {
  const isOfficer = appState.currentRole === 'Officer';
  
  container.innerHTML = `
    <div class="card" style="margin-bottom:20px; background:linear-gradient(135deg, rgba(245,158,11,0.1), rgba(15,29,22,0.8));">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
        <div>
          <span class="tag tag-saffron" style="margin-bottom:6px;">Clearance Tier: Level 3+ Validation</span>
          <h2 style="font-size:20px; font-weight:800; color:var(--text-main);">
            State Evidence Review & Cadastral Audit Board
          </h2>
          <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">
            Statutory review of state drone surveys, pilot datasets, boundary discrepancy notes, and issuance of evidence clearances.
          </div>
        </div>
        
        <div style="display:flex; gap:10px;">
          <button class="btn btn-saffron btn-sm" onclick="showToast('Exporting State Evidence Dossier for all 28 states...')">
            📥 Export Review Dossier
          </button>
        </div>
      </div>
    </div>

    <!-- Review Items List -->
    <div style="display:flex; flex-direction:column; gap:16px;">
      ${window.BHUMI_REVIEWS.map(r => `
        <div class="evidence-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="tag ${r.status === 'Clearance Granted' ? 'tag-verified' : 'tag-saffron'}">${r.status}</span>
                <span class="tag tag-gray">${r.id}</span>
                <span class="tag tag-purple">Priority: ${r.priority}</span>
              </div>
              <h3 style="font-size:16px; font-weight:800; color:var(--text-main); margin-top:6px;">
                ${r.project}
              </h3>
              <div style="font-size:12.5px; color:var(--text-muted); margin-top:2px;">
                State: <b>${r.state}</b> · District: <b>${r.district}</b> · Submitted By: <b>${r.submitted_by}</b> (${r.date})
              </div>
            </div>
            
            <div style="display:flex; gap:8px;">
              ${r.status !== 'Clearance Granted' ? `
                <button class="btn btn-primary btn-sm" onclick="approveEvidenceReview('${r.id}')">
                  ✔ Grant Clearance
                </button>
                <button class="btn btn-sm" onclick="flagDiscrepancy('${r.id}')">
                  ⚠️ Flag Discrepancy
                </button>
              ` : `
                <span class="tag tag-verified" style="font-size:12px;">Clearance Certificate Issued</span>
              `}
            </div>
          </div>
          
          <p style="font-size:13px; color:var(--text-main); line-height:1.5; margin-top:4px;">
            ${r.summary}
          </p>
          
          <div style="background:var(--bg-card); padding:10px 14px; border-radius:8px; border:1px solid var(--border-card); font-size:12px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <span>Verified Metrics: <b>${r.metrics}</b></span>
            <span style="color:var(--gov-saffron);">Discrepancy Notes: <b>${r.discrepancies}</b></span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function approveEvidenceReview(id) {
  const rev = window.BHUMI_REVIEWS.find(x => x.id === id);
  if (!rev) return;
  rev.status = 'Clearance Granted';
  logAudit(`Granted State Evidence Clearance for ${rev.state} (${rev.id})`);
  showToast(`Evidence Clearance Certificate issued for ${rev.state}!`);
  renderEvidenceReviewView(document.getElementById('workspace'));
}

function flagDiscrepancy(id) {
  const note = prompt("Enter cadastral or survey discrepancy notes for rectification:");
  if (!note) return;
  const rev = window.BHUMI_REVIEWS.find(x => x.id === id);
  if (rev) {
    rev.discrepancies = note;
    rev.status = 'Under Rectification';
    logAudit(`Flagged discrepancy on ${rev.id}: ${note}`);
    showToast(`Survey discrepancy flagged on ${rev.id}`);
    renderEvidenceReviewView(document.getElementById('workspace'));
  }
}

/* ==========================================================
   4. AI RESEARCH COPILOT ("ASK BHUMI AI")
========================================================== */
function renderCopilotView(container) {
  container.innerHTML = `
    <div class="copilot-container">
      <div class="copilot-sidebar">
        <div>
          <h3 style="font-size:16px; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>🤖</span> Bhumi AI Copilot
          </h3>
          <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
            RAG-based literature synthesis powered by verified DoLR, NITI Aayog, and ISRO datasets.
          </div>
        </div>
        
        <div style="font-size:12.5px; font-weight:700; color:var(--text-main);">
          Key Land Governance Prompts:
        </div>
        
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('titling')">
            🏛️ Conclusive vs Presumptive Titling
          </button>
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('ulpin')">
            🆔 ULPIN & Civil Dispute Reduction
          </button>
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('cadastre')">
            🗺️ Cadastral Synchronization Deficit
          </button>
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('svamitva')">
            🏡 SVAMITVA Rural Credit Impact
          </button>
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('fra')">
            🌲 Forest Rights (FRA) Cadastre
          </button>
          <button class="btn btn-sm" style="text-align:left; justify-content:flex-start;" onclick="askPreset('ngdrs')">
            ⚡ NGDRS SRO-Revenue Sync
          </button>
        </div>
        
        <div style="margin-top:auto; background:var(--bg-card-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-card); font-size:11.5px; color:var(--text-dim);">
          🔒 Strict Hallucination Guard: Responses cite only indexed government publications and official statutes.
        </div>
      </div>
      
      <div class="copilot-chat-window">
        <div class="chat-messages" id="copilot-messages">
          ${appState.chatMessages.map(m => `
            <div class="chat-bubble ${m.sender}">
              ${formatMarkdown(m.text)}
            </div>
          `).join('')}
        </div>
        
        <div class="chat-input-bar">
          <input type="text" id="copilot-input" placeholder="Ask any question on land records, policy acts, disputes, or GIS..." onkeydown="if(event.key==='Enter') sendCopilotQuery()">
          <button class="btn btn-primary" onclick="sendCopilotQuery()">
            Ask AI Copilot
          </button>
        </div>
      </div>
    </div>
  `;
}

function askPreset(key) {
  const k = window.BHUMI_AI[key];
  if (!k) return;
  
  appState.chatMessages.push({
    sender: 'user',
    text: `Summarize official evidence on: **${k.title}**`
  });
  
  const botText = `
### ${k.title}
<span class="tag tag-verified">${k.badge}</span> <span class="tag tag-saffron">Source: ${k.source}</span> <span class="tag tag-blue">Confidence: ${k.confidence}</span>

${k.summary}

**Key Findings:**
${k.points.map(p => `• ${p}`).join('\n')}

> **Policy Takeaway:** ${k.takeaway}
  `;
  
  appState.chatMessages.push({ sender: 'bot', text: botText });
  
  const chatCont = document.getElementById('copilot-messages');
  if (chatCont) {
    chatCont.innerHTML = appState.chatMessages.map(m => `
      <div class="chat-bubble ${m.sender}">
        ${formatMarkdown(m.text)}
      </div>
    `).join('');
    chatCont.scrollTop = chatCont.scrollHeight;
  }
  logAudit(`AI Copilot queried: ${k.title}`);
}

function sendCopilotQuery() {
  const input = document.getElementById('copilot-input');
  const query = input.value.trim();
  if (!query) return;
  
  appState.chatMessages.push({ sender: 'user', text: query });
  input.value = '';
  
  let matchedKey = Object.keys(window.BHUMI_AI).find(k => query.toLowerCase().includes(k));
  let responseText = "";
  
  if (matchedKey) {
    const k = window.BHUMI_AI[matchedKey];
    responseText = `
### ${k.title}
<span class="tag tag-verified">${k.badge}</span> <span class="tag tag-saffron">Source: ${k.source}</span>

${k.summary}

${k.points.map(p => `• ${p}`).join('\n')}

> **Policy Recommendation:** ${k.takeaway}
    `;
  } else {
    responseText = `
**Synthesis for: "${query}"**
<span class="tag tag-verified">DoLR Knowledge Base v3.0</span>

Based on the National Land Governance Repository:
1. **Administrative Context**: Under the Seventh Schedule (State List, Entry 18), land governance is primarily state-administered, leading to distinct schemas across state portals (e.g. *Bhoomi*, *Bhulekh*, *Dharani*).
2. **Technological Interoperability**: DILRMP 3.0 addresses this fragmentation via open government APIs, establishing ULPIN (Bhu-Aadhaar) as the national unique cadastral identifier.
3. **Judicial Relief**: DAKSH subordinate court surveys prove that synchronizing SRO deed registration with revenue records prevents fraudulent multiple sales, which historically drove 66% of civil litigation.

*Sources: DoLR Strategic Framework 2026-2031, NITI Aayog Land Reforms Report, NCAER N-LRSI.*
    `;
  }
  
  appState.chatMessages.push({ sender: 'bot', text: responseText });
  
  const chatCont = document.getElementById('copilot-messages');
  if (chatCont) {
    chatCont.innerHTML = appState.chatMessages.map(m => `
      <div class="chat-bubble ${m.sender}">
        ${formatMarkdown(m.text)}
      </div>
    `).join('');
    chatCont.scrollTop = chatCont.scrollHeight;
  }
}

function formatMarkdown(text) {
  return text
    .replace(/^### (.*$)/gim, '<h4 style="font-size:15px; font-weight:800; margin-bottom:4px;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid var(--gov-saffron); padding-left:10px; margin:8px 0; color:var(--text-muted);">$1</blockquote>')
    .replace(/\n/g, '<br>');
}

/* ==========================================================
   5. POLICY SIMULATION SANDBOX (OFFICER & REVIEWER ONLY)
========================================================== */
function renderSimView(container) {
  container.innerHTML = `
    <div class="card" style="margin-bottom:20px;">
      <h2 style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
        <span>🧪</span> Policy Innovation Sandbox (Algorithmic Scenario Modeling)
      </h2>
      <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
        Simulate macro-economic, agricultural, and judicial outcomes of proposed legislative reforms before gazette enactment.
      </div>
    </div>

    <div class="grid-3">
      <!-- Model 1 -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span class="tag tag-verified">Model 1: Land Use</span>
          <span class="tag tag-gray">ICAR / LULC</span>
        </div>
        <h3 style="font-size:15px; font-weight:700;">Farmland Conversion & Food Security</h3>
        <p style="font-size:12px; color:var(--text-muted); margin:4px 0 14px;">
          Regulate agricultural land conversion buffer zones around metropolitan expanding fringes.
        </p>
        
        <div class="sim-slider-row">
          <div class="sim-slider-label">
            <span>Protected Farmland Share:</span>
            <b id="sim1-val1">45%</b>
          </div>
          <input type="range" id="sim1-s1" min="10" max="80" value="45" oninput="calcSim1()">
        </div>
        
        <div class="sim-slider-row" style="margin-top:10px;">
          <div class="sim-slider-label">
            <span>Projection Horizon:</span>
            <b id="sim1-val2">10 Years</b>
          </div>
          <input type="range" id="sim1-s2" min="2" max="25" value="10" oninput="calcSim1()">
        </div>
        
        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:8px; margin-top:16px;">
          <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
            <span>Retained Farmland:</span>
            <b style="color:var(--gov-green);" id="sim1-res1">82.4%</b>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12.5px;">
            <span>Peri-Urban Disputes Avoided:</span>
            <b style="color:var(--gov-blue);" id="sim1-res2">~14,200</b>
          </div>
        </div>
        
        <button class="btn btn-sm btn-primary" style="width:100%; margin-top:14px;" onclick="saveSimEvidence(1)">
          Save Scenario EP-1
        </button>
      </div>
      
      <!-- Model 2 -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span class="tag tag-saffron">Model 2: Titling</span>
          <span class="tag tag-gray">NGDRS / e-Courts</span>
        </div>
        <h3 style="font-size:15px; font-weight:700;">Mandatory ULPIN in Deed Registry</h3>
        <p style="font-size:12px; color:var(--text-muted); margin:4px 0 14px;">
          Assess dispute reduction by requiring 14-digit geo-coordinates before deed registration.
        </p>
        
        <div class="sim-slider-row">
          <div class="sim-slider-label">
            <span>ULPIN Adoption Rate:</span>
            <b id="sim2-val1">85%</b>
          </div>
          <input type="range" id="sim2-s1" min="20" max="100" value="85" oninput="calcSim2()">
        </div>
        
        <div class="sim-slider-row" style="margin-top:10px;">
          <div class="sim-slider-label">
            <span>API Sync Speed:</span>
            <b id="sim2-val2">Instant (&lt; 2s)</b>
          </div>
          <input type="range" id="sim2-s2" min="1" max="5" value="1" oninput="calcSim2()">
        </div>
        
        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:8px; margin-top:16px;">
          <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
            <span>Duplicate Sales Blocked:</span>
            <b style="color:var(--gov-green);" id="sim2-res1">98.2%</b>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12.5px;">
            <span>Civil Court Relief:</span>
            <b style="color:var(--gov-blue);" id="sim2-res2">-32.4% Pending Suits</b>
          </div>
        </div>
        
        <button class="btn btn-sm btn-primary" style="width:100%; margin-top:14px;" onclick="saveSimEvidence(2)">
          Save Scenario EP-2
        </button>
      </div>
      
      <!-- Model 3 -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span class="tag tag-blue">Model 3: Monetization</span>
          <span class="tag tag-gray">IIM Ahmedabad</span>
        </div>
        <h3 style="font-size:15px; font-weight:700;">SVAMITVA Credit Saturation</h3>
        <p style="font-size:12px; color:var(--text-muted); margin:4px 0 14px;">
          Project formal bank loan liquidity unlocked by issuing rural Abadi property cards.
        </p>
        
        <div class="sim-slider-row">
          <div class="sim-slider-label">
            <span>Village Saturation:</span>
            <b id="sim3-val1">70%</b>
          </div>
          <input type="range" id="sim3-s1" min="10" max="100" value="70" oninput="calcSim3()">
        </div>
        
        <div class="sim-slider-row" style="margin-top:10px;">
          <div class="sim-slider-label">
            <span>Bank Lending Readiness:</span>
            <b id="sim3-val2">High (IBA Integrated)</b>
          </div>
          <input type="range" id="sim3-s2" min="1" max="3" value="3" oninput="calcSim3()">
        </div>
        
        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:8px; margin-top:16px;">
          <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
            <span>Credit Unlocked:</span>
            <b style="color:var(--gov-green);" id="sim3-res1">₹ 42,500 Crore</b>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12.5px;">
            <span>Gram Panchayat Tax Gain:</span>
            <b style="color:var(--gov-blue);" id="sim3-res2">+26.5% Own Revenue</b>
          </div>
        </div>
        
        <button class="btn btn-sm btn-primary" style="width:100%; margin-top:14px;" onclick="saveSimEvidence(3)">
          Save Scenario EP-3
        </button>
      </div>
    </div>
  `;

  calcSim1();
  calcSim2();
  calcSim3();
}

function calcSim1() {
  const p = +document.getElementById('sim1-s1').value;
  const h = +document.getElementById('sim1-s2').value;
  document.getElementById('sim1-val1').textContent = p + '%';
  document.getElementById('sim1-val2').textContent = h + ' Years';
  const retained = (100 - (1.9 * h * (1 - p * 0.009))).toFixed(1);
  const disputes = Math.round(p * h * 28.5);
  document.getElementById('sim1-res1').textContent = retained + '%';
  document.getElementById('sim1-res2').textContent = `~${disputes.toLocaleString()} Avoided`;
}

function calcSim2() {
  const ad = +document.getElementById('sim2-s1').value;
  document.getElementById('sim2-val1').textContent = ad + '%';
  const blocked = (ad * 0.99).toFixed(1);
  const relief = (ad * 0.38).toFixed(1);
  document.getElementById('sim2-res1').textContent = blocked + '%';
  document.getElementById('sim2-res2').textContent = `-${relief}% Pending Suits`;
}

function calcSim3() {
  const sat = +document.getElementById('sim3-s1').value;
  document.getElementById('sim3-val1').textContent = sat + '%';
  const credit = Math.round(sat * 610);
  const tax = (sat * 0.36).toFixed(1);
  document.getElementById('sim3-res1').textContent = `₹ ${credit.toLocaleString()} Crore`;
  document.getElementById('sim3-res2').textContent = `+${tax}% Own Revenue`;
}

function saveSimEvidence(id) {
  const epCode = `EP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  logAudit(`Saved Policy Simulation Model ${id} as ${epCode}`);
  showToast(`Scenario archived as official Evidence Pack: ${epCode}`);
}

/* ==========================================================
   6. STATE BENCHMARKING & EXECUTIVE DASHBOARD
========================================================== */
function renderBenchView(container) {
  const sortedStates = Object.keys(window.BHUMI_STATES).sort((a,b) => window.BHUMI_STATES[b].research_count - window.BHUMI_STATES[a].research_count);

  container.innerHTML = `
    <div class="grid-4" style="margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">RoR Computerization</div>
        <div class="kpi-val" style="color:var(--gov-green);">99.8%</div>
        <div class="kpi-sub"><span class="tag tag-verified">DoLR Verified</span> 6.4 Lakh Villages</div>
      </div>
      
      <div class="kpi-card blue">
        <div class="kpi-label">Cadastral Maps Digitized</div>
        <div class="kpi-val" style="color:var(--gov-blue);">97.4%</div>
        <div class="kpi-sub"><span class="tag tag-verified">Bhu-Naksha</span> 2.5 Crore Geo-Parcels</div>
      </div>
      
      <div class="kpi-card saffron">
        <div class="kpi-label">ULPIN Bhu-Aadhaar Adoption</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">29+</div>
        <div class="kpi-sub"><span class="tag tag-verified">States & UTs</span> 14-Digit Geo-Code</div>
      </div>
      
      <div class="kpi-card red">
        <div class="kpi-label">Civil Court Disputes</div>
        <div class="kpi-val" style="color:var(--gov-red);">66.2%</div>
        <div class="kpi-sub"><span class="tag tag-verified">DAKSH Survey</span> Property & Land Titles</div>
      </div>
    </div>

    <div class="grid-2">
      <!-- 2-State Direct Comparison Matrix -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Side-by-Side State Benchmarking Matrix</h3>
            <div class="card-subtitle">Select two States/UTs to compare land administration indicators</div>
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
          <div>
            <label style="font-size:12px; font-weight:600; color:var(--text-muted);">State A:</label>
            <select class="btn btn-sm" id="bench-state-a" style="width:100%; margin-top:4px;" onchange="updateBenchMatrix()">
              ${sortedStates.map(c => `<option value="${c}" ${c === 'UP' ? 'selected' : ''}>${window.BHUMI_STATES[c].name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:12px; font-weight:600; color:var(--text-muted);">State B:</label>
            <select class="btn btn-sm" id="bench-state-b" style="width:100%; margin-top:4px;" onchange="updateBenchMatrix()">
              ${sortedStates.map(c => `<option value="${c}" ${c === 'MH' ? 'selected' : ''}>${window.BHUMI_STATES[c].name}</option>`).join('')}
            </select>
          </div>
        </div>
        
        <div id="bench-matrix-table"></div>
      </div>
      
      <!-- Dispute Causes -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Root Causes of Subordinate Land Litigation</h3>
            <div class="card-subtitle">Based on DAKSH & Land Conflict Watch empirical surveys</div>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:10px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Inheritance & Partition Ambiguity</span>
              <b>42%</b>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill red" style="width:42%;"></div></div>
          </div>
          
          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Cadastral Boundary Inaccuracies (Tippan Lags)</span>
              <b>28%</b>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill saffron" style="width:28%;"></div></div>
          </div>
          
          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Fraudulent Double Sales (SRO-Revenue Lag)</span>
              <b>18%</b>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:18%;"></div></div>
          </div>
          
          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Tenancy / Informal Leasing Evictions</span>
              <b>12%</b>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:12%; background:var(--gov-blue);"></div></div>
          </div>
        </div>
        
        <div style="margin-top:20px; background:var(--bg-card-subtle); padding:12px; border-radius:8px; border:1px solid var(--border-card);">
          <div style="font-size:12px; font-weight:700; color:var(--text-main); margin-bottom:4px;">NCAER N-LRSI Leading States:</div>
          <div style="font-size:12px; color:var(--text-muted);">
            🥇 Madhya Pradesh (94.2) · 🥈 West Bengal (91.8) · 🥉 Odisha (89.5) · 4. Maharashtra (88.1) · 5. Tamil Nadu (87.4)
          </div>
        </div>
      </div>
    </div>
  `;

  updateBenchMatrix();
}

function updateBenchMatrix() {
  const sa = document.getElementById('bench-state-a')?.value || 'UP';
  const sb = document.getElementById('bench-state-b')?.value || 'MH';
  const tableCont = document.getElementById('bench-matrix-table');
  if (!tableCont) return;
  
  const A = window.BHUMI_STATES[sa];
  const B = window.BHUMI_STATES[sb];
  const isPublic = appState.currentRole === 'Public';
  
  tableCont.innerHTML = `
    <table style="width:100%; border-collapse:collapse; font-size:13px;">
      <thead>
        <tr style="border-bottom:2px solid var(--border-card); text-align:left;">
          <th style="padding:8px 6px; color:var(--text-muted);">Metric / Pillar</th>
          <th style="padding:8px 6px; color:var(--gov-green);">${A.name} (${sa})</th>
          <th style="padding:8px 6px; color:var(--gov-blue);">${B.name} (${sb})</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">Land Record Portal</td>
          <td style="padding:8px 6px;">${A.portal}</td>
          <td style="padding:8px 6px;">${B.portal}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">RoR Computerization</td>
          <td style="padding:8px 6px; font-weight:700; color:var(--gov-green);">${A.ror_pct}%</td>
          <td style="padding:8px 6px; font-weight:700; color:var(--gov-green);">${B.ror_pct}%</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">Cadastral Map Digitization</td>
          <td style="padding:8px 6px;">${A.cadastral_pct}%</td>
          <td style="padding:8px 6px;">${B.cadastral_pct}%</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">ULPIN Rollout Status</td>
          <td style="padding:8px 6px;">${A.ulpin_status}</td>
          <td style="padding:8px 6px;">${B.ulpin_status}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">SVAMITVA Property Cards</td>
          <td style="padding:8px 6px;">${A.svamitva_cards}</td>
          <td style="padding:8px 6px;">${B.svamitva_cards}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-card);">
          <td style="padding:8px 6px; font-weight:600;">Dispute Risk Index</td>
          <td style="padding:8px 6px;">${isPublic ? '🔒 Masked' : A.dispute_idx + '/100'}</td>
          <td style="padding:8px 6px;">${isPublic ? '🔒 Masked' : B.dispute_idx + '/100'}</td>
        </tr>
        <tr>
          <td style="padding:8px 6px; font-weight:600;">Indexed Research Papers</td>
          <td style="padding:8px 6px; font-weight:700;">${A.research_count}</td>
          <td style="padding:8px 6px; font-weight:700;">${B.research_count}</td>
        </tr>
      </tbody>
    </table>
  `;
}

/* ==========================================================
   7. INNOVATION & COLLABORATIVE WORKSPACES
========================================================== */
function renderInnovateView(container) {
  const isPublic = appState.currentRole === 'Public';

  container.innerHTML = `
    <div class="card" style="margin-bottom:20px; background:linear-gradient(135deg, rgba(6,78,59,0.4), rgba(15,29,22,0.8));">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
        <div>
          <span class="tag tag-saffron" style="margin-bottom:6px;">Smart India Hackathon 2026 · PS 26019</span>
          <h2 style="font-size:20px; font-weight:800; color:var(--text-main);">
            National Land Governance Innovation Hub & Research Grants
          </h2>
          <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">
            Supporting applied policy experimentation, hackathons, institutional fellowships, and state sandbox pilots.
          </div>
        </div>
        
        <button class="btn btn-saffron" onclick="${isPublic ? "openLoginModal()" : "alert('DILRMP 3.0 Institutional Grant Application Form staged in your Institutional Workspace.')"}">
          ${isPublic ? 'Sign in to Apply for ₹50 Cr Grant →' : 'Apply for DILRMP 3.0 Grant →'}
        </button>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Live Field Pilots & Policy Experimentation</h3>
        <p class="card-subtitle">Active multi-institutional trial deployments across states</p>
        
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tag tag-verified">Live Pilot</span>
              <span class="tag tag-gray">Pune, Maharashtra</span>
            </div>
            <div style="font-size:14px; font-weight:700; margin-top:6px;">3D Cadastre High-Rise Property Titling</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:3px;">
              BIM and LiDAR integration to define volumetric vertical apartment titles in multi-storey urban developments.
            </div>
          </div>
          
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tag tag-verified">Live Pilot</span>
              <span class="tag tag-gray">Hyderabad, Telangana</span>
            </div>
            <div style="font-size:14px; font-weight:700; margin-top:6px;">Blockchain Immutable Deed Mutation Network</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:3px;">
              Decentralized ledger consensus between Sub-Registrars and Revenue Tehsildars preventing retrospective title manipulation.
            </div>
          </div>
          
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tag tag-saffron">Scaling Phase</span>
              <span class="tag tag-gray">Bhopal & Ujjain, MP</span>
            </div>
            <div style="font-size:14px; font-weight:700; margin-top:6px;">AI Computer Vision Cadastral Boundary Extraction</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:3px;">
              Deep learning models predicting bund and parcel boundaries directly from 5cm drone orthomosaics.
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">Inter-Institutional Collaborative Working Groups</h3>
        <p class="card-subtitle">Shared workspace for drafts, annotations, and legislative feedback</p>
        
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="font-weight:700; font-size:14px;">National Conclusive Titling Guidelines Taskforce</div>
            <div style="font-size:12px; color:var(--gov-green); font-weight:600; margin-top:2px;">Participants: NITI Aayog, DoLR, NCAER, NLSIU Bengaluru</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">
              Finalizing the statutory indemnity fund rules and Title Registration Officer qualification norms.
            </div>
          </div>
          
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="font-weight:700; font-size:14px;">Peri-Urban Geospatial Cadastre Harmonization</div>
            <div style="font-size:12px; color:var(--gov-blue); font-weight:600; margin-top:2px;">Participants: TCPO, NIUA, CEPT, State Town Planning</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">
              Drafting a unified zoning protocol for agricultural-to-urban conversion along industrial corridors.
            </div>
          </div>
          
          <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; padding:14px;">
            <div style="font-weight:700; font-size:14px;">Forest Rights (FRA) Digital Boundary Integration</div>
            <div style="font-size:12px; color:var(--gov-saffron); font-weight:600; margin-top:2px;">Participants: MoTA, DoLR, Survey of India, CPR</div>
            <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">
              Standardizing participatory DGPS workflows for mapping Community Forest Resource (CFR) titles.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================
   8. RBAC & ADMIN GOVERNANCE CONSOLE (OFFICER ONLY)
========================================================== */
function renderAdminView(container) {
  container.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Role-Based Access Control (RBAC) Matrix</h3>
        <p class="card-subtitle">Enforcing the Digital Personal Data Protection (DPDP) Act 2023</p>
        
        <table style="width:100%; border-collapse:collapse; font-size:12.5px; margin-top:14px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-card); text-align:left;">
              <th style="padding:6px;">Role</th>
              <th style="padding:6px;">GIS Map</th>
              <th style="padding:6px;">Full Papers</th>
              <th style="padding:6px;">AI Copilot</th>
              <th style="padding:6px;">Policy Sim</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:7px 6px; font-weight:700;">Public / Citizen</td>
              <td>✔ Open</td>
              <td>🔒 Abstract</td>
              <td>🔒 Basic</td>
              <td>🔒 View</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:7px 6px; font-weight:700;">Researcher</td>
              <td>✔ Full</td>
              <td>✔ Full Text</td>
              <td>✔ Unrestricted</td>
              <td>🔒 Locked</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:7px 6px; font-weight:700;">Institution / Uni</td>
              <td>✔ Full</td>
              <td>✔ Full Text</td>
              <td>✔ Unrestricted</td>
              <td>🔒 Locked</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-card);">
              <td style="padding:7px 6px; font-weight:700; color:var(--gov-saffron);">State Reviewer</td>
              <td>✔ Full</td>
              <td>✔ Full Text</td>
              <td>✔ Unrestricted</td>
              <td>✔ Review Mode</td>
            </tr>
            <tr>
              <td style="padding:7px 6px; font-weight:700; color:var(--gov-green);">Govt Officer</td>
              <td>✔ Raw GIS</td>
              <td>✔ Full Text</td>
              <td>✔ Unrestricted</td>
              <td>✔ Full + Export</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="card">
        <h3 class="card-title">National Government Data Connectors</h3>
        <p class="card-subtitle">Real-time API gateway health monitoring</p>
        
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px;">
            <span>DILRMP / State Portals (28 States)</span>
            <span class="tag tag-verified">Online (99.8%)</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px;">
            <span>ULPIN (Bhu-Aadhaar Gateway)</span>
            <span class="tag tag-verified">Online (14-Digit)</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px;">
            <span>ISRO Bhuvan OGC WMS Server</span>
            <span class="tag tag-verified">Connected (LISS-III)</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px;">
            <span>e-Courts NJDG Dispute Sync</span>
            <span class="tag tag-saffron">Syncing (Subordinate Courts)</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px;">
            <span>data.gov.in (OGD Platform)</span>
            <span class="tag tag-verified">Active</span>
          </div>
        </div>
      </div>
      
      <div class="card" style="grid-column:1/-1;">
        <h3 class="card-title">System Audit Log (DPDP & Information Security Compliance)</h3>
        <p class="card-subtitle">Immutable access ledger tracking analytical operations</p>
        
        <div style="overflow-x:auto; margin-top:12px;">
          <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-card); text-align:left;">
                <th style="padding:6px;">Timestamp</th>
                <th style="padding:6px;">Operator</th>
                <th style="padding:6px;">Operation / Event Details</th>
              </tr>
            </thead>
            <tbody>
              ${appState.auditLog.map(l => `
                <tr style="border-bottom:1px solid var(--border-card);">
                  <td style="padding:6px; color:var(--text-dim); font-family:var(--font-mono);">${l.time}</td>
                  <td style="padding:6px; font-weight:700; color:var(--gov-green);">${l.user}</td>
                  <td style="padding:6px;">${l.action}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================
   9. STATE EVIDENCE PACK GENERATOR
========================================================== */
function exportStateEvidencePack(code) {
  if (appState.currentRole === 'Public') {
    openLoginModal();
    return;
  }
  
  const st = window.BHUMI_STATES[code];
  if (!st) return;
  
  const statePapers = window.BHUMI_PAPERS.filter(p => p.state === 'National' || p.state.includes(st.name) || p.state.includes(code));
  
  let briefText = `========================================================================
BHUMI-INSIGHT NATIONAL LAND GOVERNANCE PLATFORM
OFFICIAL STATE EVIDENCE-BASED POLICY BRIEF: ${st.name.toUpperCase()} (${code})
Prepared under Problem Statement 26019 | Department of Land Resources (DoLR)
Generated: ${new Date().toLocaleString()}
Operator: ${ROLES[appState.currentRole].name} (${ROLES[appState.currentRole].clearance})
========================================================================

1. EXECUTIVE STATE SUMMARY
------------------------------------------------------------------------
State: ${st.name} (${code})
Capital: ${st.capital}
Official Land Record Portal: ${st.portal} (${st.portal_url})
RoR Computerization: ${st.ror_pct}% [Verified DoLR]
Cadastral Maps Digitized: ${st.cadastral_pct}% [Verified Bhu-Naksha]
ULPIN (Bhu-Aadhaar) Status: ${st.ulpin_status}
SVAMITVA Rural Property Cards Issued: ${st.svamitva_cards}
Dispute Litigation Risk Index: ${st.dispute_idx} / 100

2. DISTRICT SAMPLE CADASTRE PROFILES
------------------------------------------------------------------------
${st.districts.map(d => `- ${d[0]} : ${d[1]}`).join('\n')}

3. KEY VERIFIED RESEARCH PUBLICATIONS INDEXED
------------------------------------------------------------------------
${statePapers.map((p, i) => `[${i+1}] ${p.title}
    Agency: ${p.agency} (${p.year})
    Abstract: ${p.abstract}
    Key Policy Finding: ${p.key_findings[0]}
    Recommendation: ${p.policy_takeaway}
`).join('\n')}

4. METHODOLOGICAL LIMITATIONS & ASSUMPTIONS
------------------------------------------------------------------------
- Metrics are compiled from DoLR MIS, NIC MeghRaj, and NCAER Land Records Index.
- Pending district court suits estimated using DAKSH India subordinate court sample ratios.

========================================================================
END OF OFFICIAL EVIDENCE PACK: ${st.name.toUpperCase()}
========================================================================`;

  const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `BHUMI_Evidence_Pack_${code}_${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  
  logAudit(`Exported official Evidence Pack for ${st.name} (${code})`);
  showToast(`Evidence Pack generated for ${st.name}!`);
}

function openUploadModal() {
  const title = prompt("Enter title of your research publication or pilot dataset:");
  if (!title) return;
  appState.userSubmissions.unshift({
    id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
    title: title,
    author: ROLES[appState.currentRole].name,
    state: appState.selectedState,
    status: 'Pending Review'
  });
  logAudit(`Staged new research submission: "${title}"`);
  showToast("Draft submitted successfully to the State Review Queue!");
}
</script>
</body>
</html>
"""

# Now write bhumi-insight-v2.html by combining part1 and part2
with open('bhumi_advanced_part1.html', 'r', encoding='utf-8') as f1:
    p1 = f1.read()

full_html = p1 + js_logic

with open('bhumi-insight-v2.html', 'w', encoding='utf-8') as out:
    out.write(full_html)

print(f"Successfully compiled upgraded bhumi-insight-v2.html! Size: {len(full_html)} bytes")
