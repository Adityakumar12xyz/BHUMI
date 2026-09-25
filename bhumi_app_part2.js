
// =========================================================================
// DEFINITIVE STAKEHOLDER PERSONAS & SECURITY ACCESS TIERS
// =========================================================================
const ROLES = {
  Officer: {
    id: "Officer",
    title: "Government Officer (DoLR / State Revenue)",
    name: "Shri Rajiv Ranjan, IAS",
    designation: "Joint Secretary (Land Governance), DoLR, MoRD",
    clearance: "Level 4: National Executive Full Access",
    badgeClass: "tag-verified",
    avatar: "🏛️",
    landingTitle: "Executive Command Center",
    desc: "Full unrestricted access: Raw litigation dispute dossiers, Cabinet policy simulation sandbox, state evidence sign-offs, national API gateway, all 20+ full policy papers."
  },
  Institution: {
    id: "Institution",
    title: "Research Institution / University",
    name: "Prof. Arvind Shenoy",
    designation: "Dean of Research & PI, IIT Bombay Land Governance Lab",
    clearance: "Level 3: Institutional Grantee & Academia",
    badgeClass: "tag-blue",
    avatar: "🏫",
    landingTitle: "University Grants & Labs",
    desc: "Authorized to administer DILRMP 3.0 ₹50 Cr research grants, manage university working groups, access full publications repository, and submit institutional pilot evaluations."
  },
  Researcher: {
    id: "Researcher",
    title: "Academic Researcher",
    name: "Dr. Ananya Roy",
    designation: "Senior Land Policy Fellow, NIPFP & CPR India",
    clearance: "Level 2: Certified Academic Scholar",
    badgeClass: "tag-purple",
    avatar: "🔬",
    landingTitle: "Scholar Research Studio",
    desc: "Authorized to read full unredacted research papers, download empirical methodology datasets, access the AI Research Copilot, and submit draft papers."
  },
  Reviewer: {
    id: "Reviewer",
    title: "State Evidence Reviewer",
    name: "Er. K. V. Ramanathan",
    designation: "Director of Cadastral Audit, SVAMITVA Taskforce",
    clearance: "Level 3: Statutory Audit Clearance Board",
    badgeClass: "tag-saffron",
    avatar: "📋",
    landingTitle: "State Clearance Board",
    desc: "Authorized to audit state-level evidence packs, validate drone resurvey metrics, inspect discrepancy reports, and grant statutory clearances."
  },
  Public: {
    id: "Public",
    title: "Citizen / Student (Public User)",
    name: "Public Citizen",
    designation: "Citizen Open Transparency Desk",
    clearance: "Level 1: Public Open Data (Limited Access)",
    badgeClass: "tag-gray",
    avatar: "👥",
    landingTitle: "Citizen Land Information Desk",
    desc: "Limited public open data access. Sensitive dispute litigation risk indices, policy simulation sandbox, full empirical papers, and evidence packs are restricted."
  }
};

// Global Application State
let appState = {
  currentRole: 'Officer', // Default to Officer for complete demonstration
  currentTab: 'dashboard', // Default to dedicated role dashboard!
  selectedState: 'UP',
  selectedDistrict: null,
  mapMetric: 'dispute',
  mapMode: 'svg', // 'svg' or 'leaflet'
  searchQuery: '',
  filterCategory: 'All',
  filterType: 'All',
  filterState: 'All',
  theme: 'dark',
  leafletMap: null,
  leafletMarkers: [],
  facultyProposals: [
    { id: 'PROP-IITB-01', title: 'Automated Cadastral Boundary Dispute Detection using High-Res Satellite InSAR & Drone Orthophotos', pi: 'Prof. Arvind Shenoy (IIT Bombay)', budget: '₹140 Lakhs', state: 'Maharashtra', status: 'Approved & Funded (₹80L Disbursed)' },
    { id: 'PROP-CEPT-02', title: 'Peri-Urban Land Pooling & Fractional Titling Valuation Model for Gujarat GIFT City Corridor', pi: 'Dr. Meera Patel (CEPT University)', budget: '₹95 Lakhs', state: 'Gujarat', status: 'Under Review (DoLR Screening Committee)' },
    { id: 'PROP-TERI-03', title: 'Community Forest Rights (CFR) Cadastral Demarcation in Schedule V Tribal Districts', pi: 'Dr. S. K. Hembram (TERI SAS)', budget: '₹110 Lakhs', state: 'Odisha', status: 'Milestone 1 Completed' }
  ],
  researcherDrafts: [
    { id: 'DRAFT-2026-08', title: 'Impact of SVAMITVA Property Cards on Rural Informal Credit Access: An Econometric Study across 1,200 Villages in UP & MP', author: 'Dr. Ananya Roy', date: '2026-09-18', status: 'Under Peer Review (DoLR Review Panel)' },
    { id: 'DRAFT-2026-04', title: 'Gender Disaggregated Analysis of Joint Titling under Digital RoR Mutation in Karnataka & Telangana', author: 'Dr. Ananya Roy & Co-authors', date: '2026-08-05', status: 'Revision Requested' }
  ],
  savedCitations: [
    'DOC-GOI-001', 'DOC-GOI-002', 'DOC-GOI-004', 'DOC-WB-005', 'DOC-LCW-008', 'DOC-NITI-010'
  ],
  stateClearances: {
    'UP': { status: 'Cleared', certId: 'CERT-DoLR-UP-2026-88', date: '2026-09-12', notes: 'GCP survey accuracy within 3.2cm RMS error. All 75 districts verified.' },
    'MH': { status: 'Pending Review', certId: null, date: '2026-09-20', notes: '3D Cadastre high-rise parcel vertical rights pending gazette notification.' },
    'GJ': { status: 'Cleared', certId: 'CERT-DoLR-GJ-2026-41', date: '2026-09-15', notes: 'Drone orthomosaic resurvey 100% matched with AnyRoR database.' },
    'OD': { status: 'Flagged (Resurvey Ordered)', certId: null, date: '2026-09-22', notes: 'Slum settlement boundary overlap with forest fringe in Koraput district.' }
  },
  auditLog: [
    { time: new Date().toLocaleTimeString(), user: 'Shri Rajiv Ranjan, IAS', action: 'Session started. National DILRMP 3.0 Executive Workspace active.' },
    { time: new Date(Date.now() - 140000).toLocaleTimeString(), user: 'System Gateway', action: 'Bhuvan OGC WMS Layer synchronization complete.' },
    { time: new Date(Date.now() - 420000).toLocaleTimeString(), user: 'System Gateway', action: 'e-Courts NJDG dispute database mirror check verified.' }
  ],
  chatMessages: [
    { sender: 'bot', text: 'Namaste! I am the **Bhumi AI Policy & Research Copilot** (SIH Problem Statement 26019).\n\nI synthesize empirical evidence from **20+ official government publications**, DILRMP benchmarks, NITI Aayog model titling acts, and Land Conflict Watch databases.\n\n*How can I assist your land governance policy formulation or academic research today?*' }
  ]
};

// =========================================================================
// APPLICATION INITIALIZATION
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
  updateAuthHeader();
  updateClearanceBanner();
  renderTabNav();
  switchTab('dashboard'); // Always land on the role's exclusive home dashboard!
});

// =========================================================================
// PERSONA SWITCHING LOGIC (CORE USER REQUIREMENT)
// =========================================================================
function switchRole(roleKey) {
  if (!ROLES[roleKey]) return;
  appState.currentRole = roleKey;
  
  // 1. Update top quick-bar button active classes
  const buttons = document.querySelectorAll('.persona-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active-role-btn');
    btn.style.boxShadow = 'none';
  });
  const activeBtn = document.getElementById('btn-role-' + roleKey);
  if (activeBtn) {
    activeBtn.classList.add('active-role-btn');
  }

  // 2. Update Header Profile & Badges
  updateAuthHeader();
  updateClearanceBanner();

  // 3. Update Nav tabs according to Role capabilities
  renderTabNav();

  // 4. Transform workspace to that role's dedicated home dashboard!
  switchTab('dashboard');

  const r = ROLES[roleKey];
  showToast(`Switched operational workspace to ${r.title} (${r.clearance.split(':')[0]})`);
  logAudit(`Switched active operational persona to ${r.title} (${r.name})`);
}

function updateAuthHeader() {
  const container = document.getElementById('auth-header-container');
  const pill = document.getElementById('portal-tier-pill');
  if (!container) return;

  const role = ROLES[appState.currentRole];
  
  if (pill) {
    pill.textContent = role.landingTitle;
  }

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <div class="user-profile-badge" onclick="openRoleComparisonModal()" title="Click to view role clearance comparison">
        <span class="user-avatar">${role.avatar}</span>
        <div style="text-align:left;">
          <div style="font-weight:700; font-size:12px; color:var(--text-main); line-height:1.2;">${role.name}</div>
          <div style="font-size:10.5px; color:var(--text-muted);">${role.title.split(' ')[0]} · <span style="color:var(--gov-green); font-weight:700;">${role.clearance.split(':')[0]}</span></div>
        </div>
      </div>
      <button class="btn btn-sm" onclick="openRoleComparisonModal()" title="Compare role capabilities" style="border:1px solid var(--border-light);">
        Role Matrix ❓
      </button>
    </div>
  `;
}

function updateClearanceBanner() {
  const pill = document.getElementById('clearance-pill-tag');
  const text = document.getElementById('clearance-summary-text');
  const extra = document.getElementById('role-extra-action');
  if (!pill || !text) return;

  const r = ROLES[appState.currentRole];
  pill.textContent = r.clearance.split(':')[0] + ' · ' + r.title.split(' ')[0];
  
  if (appState.currentRole === 'Officer') {
    pill.style.background = 'rgba(16,185,129,0.2)';
    pill.style.color = '#10b981';
    text.innerHTML = `<strong>National Executive Session:</strong> ${r.name} (DoLR, MoRD) · Full Unrestricted Access to Litigation Dossiers, Policy Sandbox & Cabinet Clearances`;
    if (extra) extra.innerHTML = `<span class="tag tag-verified">DoLR MoRD Official</span>`;
  } else if (appState.currentRole === 'Institution') {
    pill.style.background = 'rgba(59,130,246,0.2)';
    pill.style.color = '#60a5fa';
    text.innerHTML = `<strong>Institutional Consortium:</strong> ${r.name} · IIT Bombay Land Governance CoE · Managing ₹50 Cr DILRMP 3.0 R&D Fund`;
    if (extra) extra.innerHTML = `<span class="tag tag-blue">Consortium Grantee</span>`;
  } else if (appState.currentRole === 'Researcher') {
    pill.style.background = 'rgba(168,85,247,0.2)';
    pill.style.color = '#c084fc';
    text.innerHTML = `<strong>Academic Research Studio:</strong> ${r.name} · Policy Fellow · Full Papers Access, BibTeX Citations & Manuscript Submission Studio`;
    if (extra) extra.innerHTML = `<span class="tag tag-purple">Certified Scholar</span>`;
  } else if (appState.currentRole === 'Reviewer') {
    pill.style.background = 'rgba(245,158,11,0.2)';
    pill.style.color = '#f59e0b';
    text.innerHTML = `<strong>Statutory Clearance Session:</strong> ${r.name} · Chairperson, State Evidence Audit Board · Authorized to Issue Statutory Clearances`;
    if (extra) extra.innerHTML = `<span class="tag tag-saffron">Statutory Board</span>`;
  } else {
    pill.style.background = 'rgba(156,163,175,0.2)';
    pill.style.color = '#9ca3af';
    text.innerHTML = `<strong>Citizen Open Data Desk:</strong> Public Access · Sensitive Court Disputes, Policy Simulation & Administrative Dossiers Locked`;
    if (extra) extra.innerHTML = `<button class="btn btn-sm btn-primary" onclick="switchRole('Officer')" style="padding:3px 8px; font-size:11px;">Switch to Officer</button>`;
  }
}

// =========================================================================
// DYNAMIC NAVIGATION TABS DEPENDING ON CURRENT ROLE
// =========================================================================
function renderTabNav() {
  const nav = document.getElementById('app-nav-bar');
  if (!nav) return;

  const role = appState.currentRole;
  let tabsHtml = '';

  if (role === 'Officer') {
    tabsHtml = `
      <button class="nav-tab ${appState.currentTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">
        🏛️ Executive Center
      </button>
      <button class="nav-tab ${appState.currentTab === 'map' ? 'active' : ''}" onclick="switchTab('map')">
        🗺️ National Cadastral Map
      </button>
      <button class="nav-tab ${appState.currentTab === 'papers' ? 'active' : ''}" onclick="switchTab('papers')">
        📚 Policy Research (20+)
      </button>
      <button class="nav-tab ${appState.currentTab === 'simulate' ? 'active' : ''}" onclick="switchTab('simulate')">
        ⚖️ Cabinet Simulation Sandbox
      </button>
      <button class="nav-tab ${appState.currentTab === 'evidence' ? 'active' : ''}" onclick="switchTab('evidence')">
        📑 State Evidence Sign-Offs
      </button>
      <button class="nav-tab ${appState.currentTab === 'chat' ? 'active' : ''}" onclick="switchTab('chat')">
        🤖 Land AI Copilot
      </button>
      <button class="nav-tab ${appState.currentTab === 'admin' ? 'active' : ''}" onclick="switchTab('admin')">
        ⚙️ Root Admin & APIs
      </button>
    `;
  } else if (role === 'Institution') {
    tabsHtml = `
      <button class="nav-tab ${appState.currentTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">
        🏫 Grants & University Labs
      </button>
      <button class="nav-tab ${appState.currentTab === 'map' ? 'active' : ''}" onclick="switchTab('map')">
        🗺️ Spatial Research GIS Map
      </button>
      <button class="nav-tab ${appState.currentTab === 'papers' ? 'active' : ''}" onclick="switchTab('papers')">
        📚 Policy Research Library
      </button>
      <button class="nav-tab ${appState.currentTab === 'evidence' ? 'active' : ''}" onclick="switchTab('evidence')">
        📑 Field Research Dossiers
      </button>
      <button class="nav-tab ${appState.currentTab === 'chat' ? 'active' : ''}" onclick="switchTab('chat')">
        🤖 Academic AI Copilot
      </button>
    `;
  } else if (role === 'Researcher') {
    tabsHtml = `
      <button class="nav-tab ${appState.currentTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">
        🔬 Scholar Studio & Drafts
      </button>
      <button class="nav-tab ${appState.currentTab === 'map' ? 'active' : ''}" onclick="switchTab('map')">
        🗺️ Cadastral & Parcel Search
      </button>
      <button class="nav-tab ${appState.currentTab === 'papers' ? 'active' : ''}" onclick="switchTab('papers')">
        📚 Annotated Papers & BibTeX
      </button>
      <button class="nav-tab ${appState.currentTab === 'chat' ? 'active' : ''}" onclick="switchTab('chat')">
        🤖 Unrestricted AI Copilot
      </button>
    `;
  } else if (role === 'Reviewer') {
    tabsHtml = `
      <button class="nav-tab ${appState.currentTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">
        📋 State Clearance Board
      </button>
      <button class="nav-tab ${appState.currentTab === 'evidence' ? 'active' : ''}" onclick="switchTab('evidence')">
        📑 Statutory Evidence Queue
      </button>
      <button class="nav-tab ${appState.currentTab === 'map' ? 'active' : ''}" onclick="switchTab('map')">
        🗺️ Cadastral Audit Map
      </button>
      <button class="nav-tab ${appState.currentTab === 'simulate' ? 'active' : ''}" onclick="switchTab('simulate')">
        ⚖️ Survey Tolerance Preview
      </button>
      <button class="nav-tab ${appState.currentTab === 'papers' ? 'active' : ''}" onclick="switchTab('papers')">
        📚 Statutory Briefs
      </button>
    `;
  } else { // Public
    tabsHtml = `
      <button class="nav-tab ${appState.currentTab === 'dashboard' ? 'active' : ''}" onclick="switchTab('dashboard')">
        👥 Citizen Information Desk
      </button>
      <button class="nav-tab ${appState.currentTab === 'map' ? 'active' : ''}" onclick="switchTab('map')">
        🗺️ Public State Map
      </button>
      <button class="nav-tab ${appState.currentTab === 'papers' ? 'active' : ''}" onclick="switchTab('papers')">
        📚 Research Abstracts (Summaries)
      </button>
      <button class="nav-tab ${appState.currentTab === 'chat' ? 'active' : ''}" onclick="switchTab('chat')">
        🤖 Land Helpdesk FAQs
      </button>
    `;
  }

  nav.innerHTML = tabsHtml;
}

// =========================================================================
// TAB SWITCHING & WORKSPACE RENDERING
// =========================================================================
function switchTab(tabId) {
  appState.currentTab = tabId;
  renderTabNav();

  const workspace = document.getElementById('workspace');
  if (!workspace) return;

  if (tabId === 'dashboard') {
    const role = appState.currentRole;
    if (role === 'Officer') renderOfficerDashboard(workspace);
    else if (role === 'Institution') renderInstitutionDashboard(workspace);
    else if (role === 'Researcher') renderResearcherDashboard(workspace);
    else if (role === 'Reviewer') renderReviewerDashboard(workspace);
    else renderCitizenDashboard(workspace);
  } else if (tabId === 'map') {
    renderMapTab(workspace);
  } else if (tabId === 'papers') {
    renderPapersTab(workspace);
  } else if (tabId === 'simulate') {
    renderSimulateTab(workspace);
  } else if (tabId === 'evidence') {
    renderEvidenceTab(workspace);
  } else if (tabId === 'chat') {
    renderChatTab(workspace);
  } else if (tabId === 'admin') {
    renderAdminTab(workspace);
  }
}

// =========================================================================
// 1. DEDICATED DASHBOARD: GOVERNMENT OFFICER (DoLR / STATE REVENUE)
// =========================================================================
function renderOfficerDashboard(container) {
  container.innerHTML = `
    <!-- Executive Command Center Header -->
    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(15,29,22,0.95) 100%); border:1px solid var(--gov-green); border-radius:16px; padding:24px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="tag tag-verified">LEVEL 4 SECURITY CLEARANCE</span>
            <span class="tag tag-saffron">Cabinet Decision Support System</span>
          </div>
          <h2 style="font-size:24px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            🏛️ National Land Governance Executive Command Center
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); max-width:780px;">
            Real-time executive oversight across 36 States/UTs, 6.12 Lakh villages, and ₹1,500+ Cr DILRMP modernization investments. Direct escalation link to Chief Secretaries and Revenue Commissioners.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="switchTab('simulate')">
            ⚖️ Launch Policy Simulator
          </button>
          <button class="btn" onclick="exportSynthesisReport()">
            📥 Export Cabinet Brief (PDF)
          </button>
        </div>
      </div>

      <!-- Urgent Escalation Advisory Box -->
      <div style="margin-top:18px; background:rgba(239, 68, 68, 0.12); border:1px solid var(--gov-red); border-radius:10px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:24px;">🚨</span>
          <div>
            <div style="font-weight:700; color:#fca5a5; font-size:13.5px;">DoLR High-Priority Action Notice: 3 States Lagging Cadastral Modernization</div>
            <div style="font-size:12px; color:var(--text-muted);">Bihar (82.5% Cadastral) & Odisha (Slum Injunctions) require immediate DoLR advisory dispatch.</div>
          </div>
        </div>
        <button class="btn btn-sm btn-danger" onclick="issueOfficerAdvisory()">
          📢 Issue DoLR Advisory Notice
        </button>
      </div>
    </div>

    <!-- 4 Key Executive KPIs -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
        <div class="kpi-label">National Cadastral Computerization</div>
        <div class="kpi-val" style="color:var(--gov-green);">95.8%</div>
        <div class="kpi-sub">Target 100% by Dec 2026 (6.12L Villages)</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-red);">
        <div class="kpi-label">Active State Escalation Alerts</div>
        <div class="kpi-val" style="color:var(--gov-red);">3 States</div>
        <div class="kpi-sub">Bihar, Odisha & West Bengal</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
        <div class="kpi-label">Pending Evidence Clearances</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">4 Dossiers</div>
        <div class="kpi-sub">UP, Maharashtra, Gujarat, Odisha</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
        <div class="kpi-label">Bhu-Aadhaar (ULPIN) Deployed</div>
        <div class="kpi-val" style="color:var(--gov-blue);">24.5 Cr</div>
        <div class="kpi-sub">Unique 14-Digit Geo-Identities Active</div>
      </div>
    </div>

    <!-- 2 Column Section: Raw Litigation Dossier & Decision Support -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
      
      <!-- Left: High-Risk Land Dispute Watchlist -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <h3 style="font-size:16px; font-weight:800; color:var(--text-main);">⚖️ Sensitive Dispute Litigation Dossier</h3>
            <p style="font-size:12px; color:var(--text-muted);">Confidential e-Courts NJDG Linked Records (Restricted Level 4)</p>
          </div>
          <span class="tag tag-red">UNREDACTED</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="background:var(--bg-card-subtle); padding:12px; border-radius:10px; border-left:3px solid var(--gov-red);">
            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
              <span>Gautam Buddha Nagar (Noida), UP</span>
              <span style="color:#ef4444;">₹1,450 Cr Claim</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-muted); margin:4px 0;">
              4,200 Farmers vs YEIDA · 850 Hectares Peri-Urban Land Pooling Injunction.
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
              <span class="tag tag-gray">Allahabad High Court Stay</span>
              <button class="btn btn-sm" onclick="showToast('Opened Court Dossier ref: WP-UP-44910')">View Legal Brief</button>
            </div>
          </div>

          <div style="background:var(--bg-card-subtle); padding:12px; border-radius:10px; border-left:3px solid var(--gov-saffron);">
            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
              <span>Pune Peri-Urban Ring Road, MH</span>
              <span style="color:#f59e0b;">₹680 Cr Claim</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-muted); margin:4px 0;">
              1,120 Agricultural Claimants · 320 Hectares · 3D Cadastral Overlap dispute.
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
              <span class="tag tag-gray">Bombay High Court Hearing (14 Oct)</span>
              <button class="btn btn-sm" onclick="showToast('Opened Court Dossier ref: MH-BOM-9102')">View Legal Brief</button>
            </div>
          </div>

          <div style="background:var(--bg-card-subtle); padding:12px; border-radius:10px; border-left:3px solid var(--gov-blue);">
            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
              <span>Koraput Community Forest Belt, OD</span>
              <span style="color:#60a5fa;">High Sensitivity</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-muted); margin:4px 0;">
              850 Tribal Families · Forest Rights Act (CFR) vs Revenue Land Survey Conflict.
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
              <span class="tag tag-gray">Revenue Board Conciliation</span>
              <button class="btn btn-sm" onclick="showToast('Opened Tribal Land Brief ref: OD-FRA-2026')">View Legal Brief</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Cabinet Decision Support & Simulation Sandbox -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <h3 style="font-size:16px; font-weight:800; color:var(--text-main);">📊 Cabinet Decision Support Engine</h3>
              <p style="font-size:12px; color:var(--text-muted);">Predictive Econometric Simulation for Parliamentary Budget 2026-27</p>
            </div>
            <span class="tag tag-verified">AI READY</span>
          </div>

          <p style="font-size:13px; color:var(--text-muted); line-height:1.5; margin-bottom:16px;">
            Simulate how increasing ULPIN geo-referencing, establishing Fast-Track Land Dispute Tribunals, and linking e-Courts to Bhu-Aadhaar impacts GDP growth and court backlogs:
          </p>

          <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
              <span>Fast-Track Land Tribunals (+₹250 Cr Budget):</span>
              <strong style="color:var(--gov-green);">-34.8% Litigation Backlog</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
              <span>Universal ULPIN Bhu-Aadhaar Mandate:</span>
              <strong style="color:var(--gov-blue);">+₹18,400 Cr Rural Bank Credit</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px;">
              <span>Torrens Conclusive Titling Backstop Guarantee:</span>
              <strong style="color:var(--gov-saffron);">99.8% Title Security</strong>
            </div>
          </div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" style="flex:1;" onclick="switchTab('simulate')">
            🚀 Launch Policy Sandbox
          </button>
          <button class="btn" onclick="switchTab('evidence')">
            📑 State Sign-Offs
          </button>
        </div>
      </div>

    </div>
  `;
}

// =========================================================================
// 2. DEDICATED DASHBOARD: RESEARCH INSTITUTION / UNIVERSITY
// =========================================================================
function renderInstitutionDashboard(container) {
  container.innerHTML = `
    <!-- Institutional R&D Header -->
    <div style="background: linear-gradient(135deg, rgba(59,130,246,0.14) 0%, rgba(15,29,22,0.95) 100%); border:1px solid var(--gov-blue); border-radius:16px; padding:24px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="tag tag-blue">LEVEL 3 INSTITUTIONAL CLEARANCE</span>
            <span class="tag tag-verified">Consortium Lead: IIT Bombay</span>
          </div>
          <h2 style="font-size:24px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            🏫 University R&D & Institutional Grants Portal
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); max-width:780px;">
            Dedicated portal for accredited universities and research consortia administering DILRMP 3.0 ₹50 Cr research grants, faculty pilot projects, bulk geospatial shapefile downloads, and academic peer review.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-blue" onclick="document.getElementById('faculty-form-section').scrollIntoView({behavior:'smooth'})">
            ➕ Submit Faculty Proposal
          </button>
          <button class="btn" onclick="switchTab('papers')">
            📚 Policy Research Library
          </button>
        </div>
      </div>
    </div>

    <!-- 4 Key Institutional KPIs -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
        <div class="kpi-label">DILRMP 3.0 Research Grant Corpus</div>
        <div class="kpi-val" style="color:var(--gov-blue);">₹50.00 Cr</div>
        <div class="kpi-sub">National Ministry of Rural Development Fund</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
        <div class="kpi-label">Allocated to Your Consortium</div>
        <div class="kpi-val" style="color:var(--gov-green);">₹12.50 Cr</div>
        <div class="kpi-sub">IIT Bombay · CEPT · TERI SAS</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-purple);">
        <div class="kpi-label">Active Funded Faculty Projects</div>
        <div class="kpi-val" style="color:var(--gov-purple);">8 Projects</div>
        <div class="kpi-sub">3 Pilots in Maharashtra, Gujarat, Odisha</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
        <div class="kpi-label">Bulk GIS Datasets Accessible</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">36 States</div>
        <div class="kpi-sub">Full GeoPackages, GeoTIFFs & Vectors</div>
      </div>
    </div>

    <!-- 2 Column Section: Grant Milestone Tracker & Bulk Data Gateway -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
      
      <!-- Left: Consortium Grant Milestone Tracker -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px;">
        <h3 style="font-size:16px; font-weight:800; color:var(--text-main); margin-bottom:4px;">
          📈 DILRMP 3.0 Consortium Grant Milestones
        </h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
          Financial Year 2026-27 Grant Allocation & Deliverable Verification
        </p>

        <div style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
              <span>Milestone 1: Drone Orthomosaic AI Edge Reconstruction</span>
              <strong style="color:var(--gov-green);">100% · ₹4.0 Cr Disbursed</strong>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:100%;"></div></div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
              <span>Milestone 2: Automated Cadastral Conflict Detection Model</span>
              <strong style="color:var(--gov-blue);">75% · ₹3.5 Cr Under Audit</strong>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:75%; background:var(--gov-blue);"></div></div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
              <span>Milestone 3: Tribal Community Forest Rights (CFR) Digitization</span>
              <strong style="color:var(--gov-saffron);">35% · Field Work Active</strong>
            </div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:35%; background:var(--gov-saffron);"></div></div>
          </div>
        </div>

        <div style="margin-top:18px; padding-top:14px; border-top:1px solid var(--border-card); display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:12px; color:var(--text-muted);">Next Audit Due: 15 Nov 2026</span>
          <button class="btn btn-sm" onclick="showToast('Grant Utilization Certificate (UC) exported.')">📥 Export UC Form 12-A</button>
        </div>
      </div>

      <!-- Right: Bulk Geospatial Open Data Center -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px;">
        <h3 style="font-size:16px; font-weight:800; color:var(--text-main); margin-bottom:4px;">
          💾 Bulk Geospatial & GIS Data Gateway
        </h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">
          Restricted Level 3 Institutional Bulk GIS Downloads for Academic Research
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:13px; font-weight:700;">All-India Cadastral GeoPackage 2026 (Q1)</div>
              <div style="font-size:11px; color:var(--text-muted);">Vector Parcel Boundaries · 36 States · 2.4 GB</div>
            </div>
            <button class="btn btn-sm btn-blue" onclick="showToast('Starting institutional download: india_cadastral_2026.gpkg')">⬇️ Download</button>
          </div>

          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:13px; font-weight:700;">Soil-Revenue Overlay Multi-Spectral GeoTIFF</div>
              <div style="font-size:11px; color:var(--text-muted);">ICAR Soil Series & Cadastral Overlay · 1.8 GB</div>
            </div>
            <button class="btn btn-sm btn-blue" onclick="showToast('Starting institutional download: soil_revenue_overlay.tif')">⬇️ Download</button>
          </div>

          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:13px; font-weight:700;">e-Courts NJDG Land Litigation Shapefile</div>
              <div style="font-size:11px; color:var(--text-muted);">Spatial Points of 1.4 Lakh Cases · 480 MB</div>
            </div>
            <button class="btn btn-sm btn-blue" onclick="showToast('Starting institutional download: nldg_litigation_pts.shp')">⬇️ Download</button>
          </div>
        </div>
      </div>

    </div>

    <!-- Faculty Grant Proposal Submission Section -->
    <div id="faculty-form-section" style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:22px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:17px; font-weight:800; color:var(--text-main);">➕ Submit New Faculty Research Proposal (DILRMP Grant Call)</h3>
          <p style="font-size:12.5px; color:var(--text-muted);">Direct submission to the Department of Land Resources (DoLR) Academic Screening Committee</p>
        </div>
        <span class="tag tag-blue">Grant Cycle 2026-B</span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:14px;">
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Research Proposal Title</label>
          <input type="text" id="prop-title-input" class="search-input-wrapper" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;" placeholder="e.g. AI-Assisted Land Dispute Prediction in Peri-Urban Corridors">
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Principal Investigator (PI) & University</label>
          <input type="text" id="prop-pi-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;" value="Prof. Arvind Shenoy (IIT Bombay)">
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:14px;">
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Requested Budget</label>
          <input type="text" id="prop-budget-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;" placeholder="e.g. ₹85 Lakhs">
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Target Pilot State</label>
          <select id="prop-state-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;">
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Odisha">Odisha</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Duration</label>
          <input type="text" id="prop-duration-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;" value="18 Months">
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Abstract & Methodology</label>
        <textarea id="prop-abstract-input" rows="3" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px; font-family:inherit;" placeholder="Describe empirical research methodology, state partnership model, and expected policy outcomes..."></textarea>
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-blue" onclick="submitFacultyProposal()">
          🚀 Submit Proposal to DoLR Screening Committee
        </button>
      </div>

      <!-- Current Consortium Proposals List -->
      <div style="margin-top:20px; padding-top:18px; border-top:1px solid var(--border-card);">
        <h4 style="font-size:14px; font-weight:700; margin-bottom:10px;">Submitted Proposals & Status:</h4>
        <div id="proposals-list-container" style="display:flex; flex-direction:column; gap:8px;">
          ${renderProposalsListHtml()}
        </div>
      </div>
    </div>
  `;
}

function renderProposalsListHtml() {
  return appState.facultyProposals.map(p => `
    <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="font-size:13px; font-weight:700; color:var(--text-main);">${p.title}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">${p.pi} · State: ${p.state} · Budget: ${p.budget}</div>
      </div>
      <span class="tag ${p.status.includes('Approved') ? 'tag-verified' : 'tag-saffron'}">${p.status}</span>
    </div>
  `).join('');
}

function submitFacultyProposal() {
  const title = document.getElementById('prop-title-input').value.trim();
  const pi = document.getElementById('prop-pi-input').value.trim();
  const budget = document.getElementById('prop-budget-input').value.trim() || '₹75 Lakhs';
  const state = document.getElementById('prop-state-input').value;
  const abstract = document.getElementById('prop-abstract-input').value.trim();

  if (!title) {
    alert('Please enter a Research Proposal Title.');
    return;
  }

  const newId = 'PROP-IITB-' + String(appState.facultyProposals.length + 1).padStart(2, '0');
  appState.facultyProposals.unshift({
    id: newId,
    title: title,
    pi: pi,
    budget: budget,
    state: state,
    status: 'Submitted (DoLR Screening Committee Review)'
  });

  document.getElementById('prop-title-input').value = '';
  document.getElementById('prop-abstract-input').value = '';

  const listContainer = document.getElementById('proposals-list-container');
  if (listContainer) {
    listContainer.innerHTML = renderProposalsListHtml();
  }

  showToast(`Proposal "${title.substring(0, 30)}..." submitted to DoLR!`);
  logAudit(`Faculty research proposal submitted: ${title} (${pi})`);
}

// =========================================================================
// 3. DEDICATED DASHBOARD: ACADEMIC RESEARCHER (STUDIO & CITATIONS)
// =========================================================================
function renderResearcherDashboard(container) {
  container.innerHTML = `
    <!-- Scholar Studio Header -->
    <div style="background: linear-gradient(135deg, rgba(168,85,247,0.14) 0%, rgba(15,29,22,0.95) 100%); border:1px solid var(--gov-purple); border-radius:16px; padding:24px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="tag tag-purple">LEVEL 2 RESEARCHER CLEARANCE</span>
            <span class="tag tag-verified">Academic Research Fellow</span>
          </div>
          <h2 style="font-size:24px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            🔬 Scholar Research Studio & Citation Workbench
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); max-width:780px;">
            Personalized research workbench for scholars and land policy fellows: Write working manuscripts, generate 1-click BibTeX/APA citations for all 20+ government papers, and run unconstrained AI Copilot queries.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-purple" onclick="document.getElementById('manuscript-submission-section').scrollIntoView({behavior:'smooth'})">
            ✍️ Submit Working Paper
          </button>
          <button class="btn" onclick="switchTab('papers')">
            📚 Browse All 20 Papers
          </button>
        </div>
      </div>
    </div>

    <!-- 4 Key Researcher KPIs -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="kpi-card" style="border-left:4px solid var(--gov-purple);">
        <div class="kpi-label">Curated Policy Publications</div>
        <div class="kpi-val" style="color:var(--gov-purple);">20 Papers</div>
        <div class="kpi-sub">DoLR, NITI Aayog, World Bank, NCAER</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
        <div class="kpi-label">Your Saved Citations</div>
        <div class="kpi-val" style="color:var(--gov-green);">${appState.savedCitations.length} Bookmarks</div>
        <div class="kpi-sub">BibTeX & APA 7th Ready</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
        <div class="kpi-label">Active Working Manuscripts</div>
        <div class="kpi-val" style="color:var(--gov-blue);">${appState.researcherDrafts.length} In-Progress</div>
        <div class="kpi-sub">1 Under DoLR Peer Review</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
        <div class="kpi-label">AI Copilot Syntheses Run</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">48 Inquiries</div>
        <div class="kpi-sub">Full Torrens & SVAMITVA RAG Context</div>
      </div>
    </div>

    <!-- 2 Column Section: Fast Citation Generator & Direct AI Copilot Launcher -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
      
      <!-- Left: 1-Click Fast Citation Generator -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <h3 style="font-size:16px; font-weight:800; color:var(--text-main);">📋 Academic Citation Generator</h3>
            <p style="font-size:12px; color:var(--text-muted);">Select any publication to generate formatted references</p>
          </div>
          <span class="tag tag-purple">BibTeX / APA</span>
        </div>

        <div style="margin-bottom:12px;">
          <select id="citation-paper-select" onchange="updateCitationPreview()" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;">
            ${(window.BHUMI_PAPERS || []).map(p => `
              <option value="${p.id}">${p.title.substring(0, 60)}... (${p.year})</option>
            `).join('')}
          </select>
        </div>

        <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; padding:12px; font-family:monospace; font-size:11.5px; color:var(--gov-green); min-height:90px; overflow-x:auto;" id="citation-preview-box">
          Loading citation preview...
        </div>

        <div style="display:flex; gap:10px; margin-top:14px;">
          <button class="btn btn-sm btn-purple" onclick="copyCitation('bibtex')">📋 Copy BibTeX</button>
          <button class="btn btn-sm" onclick="copyCitation('apa')">📋 Copy APA 7th</button>
          <button class="btn btn-sm" onclick="exportBibFile()">📥 Export .bib File</button>
        </div>
      </div>

      <!-- Right: Pre-Loaded Research AI Prompts -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <h3 style="font-size:16px; font-weight:800; color:var(--text-main); margin-bottom:4px;">
            🤖 Direct Research AI Synthesis Prompts
          </h3>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">
            Click any empirical question to load directly into the Land AI Copilot:
          </p>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="persona-card" onclick="launchCopilotWithPrompt('Synthesize empirical evidence on how SVAMITVA property cards impact rural informal credit access.')" style="padding:10px 12px;">
              <span style="font-size:12px; font-weight:600; color:var(--text-main);">"Synthesize empirical evidence on how SVAMITVA property cards impact rural informal credit access."</span>
              <span style="font-size:14px; color:var(--gov-purple);">➔</span>
            </div>
            <div class="persona-card" onclick="launchCopilotWithPrompt('Compare Maharashtra (e-Mahabhumi) and Karnataka (Bhoomi) mutation dispute appeal timelines and judicial backlog.')" style="padding:10px 12px;">
              <span style="font-size:12px; font-weight:600; color:var(--text-main);">"Compare Maharashtra (e-Mahabhumi) and Karnataka (Bhoomi) mutation dispute appeal timelines."</span>
              <span style="font-size:14px; color:var(--gov-purple);">➔</span>
            </div>
            <div class="persona-card" onclick="launchCopilotWithPrompt('What are the actuarial solvency requirements for a state-backed Torrens Title Indemnity Fund in India?')" style="padding:10px 12px;">
              <span style="font-size:12px; font-weight:600; color:var(--text-main);">"Actuarial solvency requirements for state-backed Torrens Title Indemnity Funds."</span>
              <span style="font-size:14px; color:var(--gov-purple);">➔</span>
            </div>
          </div>
        </div>

        <button class="btn btn-sm btn-purple" style="margin-top:12px;" onclick="switchTab('chat')">
          🚀 Open Full AI Copilot Console
        </button>
      </div>

    </div>

    <!-- Manuscript & Working Paper Submission Desk -->
    <div id="manuscript-submission-section" style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:22px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:17px; font-weight:800; color:var(--text-main);">✍️ Submit Working Manuscript to National Repository</h3>
          <p style="font-size:12.5px; color:var(--text-muted);">Share draft papers with DoLR policy makers and academic peers</p>
        </div>
        <span class="tag tag-purple">Author: Dr. Ananya Roy</span>
      </div>

      <div style="display:grid; grid-template-columns:2fr 1fr; gap:16px; margin-bottom:14px;">
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Manuscript Title</label>
          <input type="text" id="draft-title-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;" placeholder="e.g. Econometric Evaluation of ULPIN Bhu-Aadhaar in Bundelkhand">
        </div>
        <div>
          <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Domain / Sub-Theme</label>
          <select id="draft-domain-input" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;">
            <option value="Conclusive Land Titling">Conclusive Land Titling</option>
            <option value="SVAMITVA Rural Cadastre">SVAMITVA Rural Cadastre</option>
            <option value="Gender & Land Rights">Gender & Land Rights</option>
            <option value="Forest Rights (FRA)">Forest Rights (FRA)</option>
            <option value="Urban Peri-Urban Land">Urban Peri-Urban Land</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:12px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Key Empirical Findings & Policy Recommendations</label>
        <textarea id="draft-findings-input" rows="3" style="width:100%; padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px; font-family:inherit;" placeholder="Summarize data sample, regression model, and policy takeaways..."></textarea>
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-purple" onclick="submitResearcherDraft()">
          📄 Submit Draft for Peer Review
        </button>
      </div>

      <!-- Current Researcher Drafts -->
      <div style="margin-top:20px; padding-top:18px; border-top:1px solid var(--border-card);">
        <h4 style="font-size:14px; font-weight:700; margin-bottom:10px;">Your Working Manuscripts:</h4>
        <div id="drafts-list-container" style="display:flex; flex-direction:column; gap:8px;">
          ${renderDraftsListHtml()}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => { updateCitationPreview(); }, 100);
}

function renderDraftsListHtml() {
  return appState.researcherDrafts.map(d => `
    <div style="background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="font-size:13px; font-weight:700; color:var(--text-main);">${d.title}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">Author: ${d.author} · Date: ${d.date}</div>
      </div>
      <span class="tag tag-purple">${d.status}</span>
    </div>
  `).join('');
}

function updateCitationPreview() {
  const sel = document.getElementById('citation-paper-select');
  const box = document.getElementById('citation-preview-box');
  if (!sel || !box) return;

  const paperId = sel.value;
  const paper = (window.BHUMI_PAPERS || []).find(p => p.id === paperId) || (window.BHUMI_PAPERS || [])[0];
  if (!paper) return;

  const key = paper.id.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const bibtex = `@article{${key}_${paper.year},
  title={${paper.title}},
  author={${paper.authors || paper.agency}},
  journal={${paper.agency}},
  year={${paper.year}},
  url={${paper.source_url}}
}`;

  box.textContent = bibtex;
}

function copyCitation(type) {
  const sel = document.getElementById('citation-paper-select');
  const paperId = sel ? sel.value : null;
  const paper = (window.BHUMI_PAPERS || []).find(p => p.id === paperId) || (window.BHUMI_PAPERS || [])[0];
  if (!paper) return;

  let text = '';
  if (type === 'bibtex') {
    const key = paper.id.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    text = `@article{${key}_${paper.year},\n  title={${paper.title}},\n  author={${paper.authors || paper.agency}},\n  journal={${paper.agency}},\n  year={${paper.year}},\n  url={${paper.source_url}}\n}`;
  } else {
    text = `${paper.authors || paper.agency} (${paper.year}). ${paper.title}. ${paper.agency}. Retrieved from ${paper.source_url}`;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${type.toUpperCase()} citation to clipboard!`);
  }).catch(() => {
    showToast(`Citation generated for "${paper.title.substring(0, 25)}..."`);
  });
}

function exportBibFile() {
  const papers = window.BHUMI_PAPERS || [];
  let content = '% BHUMI-INSIGHT Comprehensive Citations Export\n% National Land Governance Repository (PS 26019)\n\n';
  papers.forEach(p => {
    const key = p.id.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    content += `@article{${key}_${p.year},\n  title={${p.title}},\n  author={${p.authors || p.agency}},\n  journal={${p.agency}},\n  year={${p.year}},\n  url={${p.source_url}}\n}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bhumi_insight_citations.bib';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Exported 20 citations as bhumi_insight_citations.bib');
}

function launchCopilotWithPrompt(prompt) {
  appState.chatMessages.push({ sender: 'user', text: prompt });
  
  // Find matching answer from AI knowledge base
  let botReply = "Analyzing national land governance evidence repositories...";
  const aiData = window.BHUMI_AI || {};
  if (prompt.toLowerCase().includes('svamitva') && aiData.svamitva) {
    botReply = `**Empirical Synthesis on SVAMITVA Impact:**\n\n${aiData.svamitva.core_insight}\n\n**Key Takeaways:**\n- ${aiData.svamitva.takeaways.join('\n- ')}`;
  } else if (prompt.toLowerCase().includes('maharashtra') || prompt.toLowerCase().includes('karnataka')) {
    botReply = `**Comparative Mutation & Dispute Timelines (Karnataka vs Maharashtra):**\n\n- **Karnataka (Bhoomi & Dishaank):** First state to digitize 20M land records. Mutation appeals average 45-60 days with CollabLand integration.\n- **Maharashtra (e-Mahabhumi & Mahabhulekh):** Integrated with 3D cadastre pilot in Pune. Digital notice period is 15 days, with lis pendens automated caveats from e-Courts.\n\n*Source: NCAER Land Record Services Index (N-LRSI) & DILRMP State Dossiers.*`;
  } else if (prompt.toLowerCase().includes('torrens') && aiData.titling) {
    botReply = `**Torrens Indemnity Fund Actuarial Solvency:**\n\n${aiData.titling.core_insight}\n\n**Financial Provisions:**\n- State guarantees title against government error with an indemnity reserve funded via 0.1% registration cess. Title is indefeasible after statutory limitation window.`;
  } else {
    botReply = `Based on DILRMP 3.0 benchmarks and NITI Aayog policy frameworks, research demonstrates that integrating 14-digit ULPIN Bhu-Aadhaar with spatial cadastral vectors reduces litigation risk by 34.8% and accelerates bank mortgage sanction times from 21 days to under 48 hours.`;
  }

  appState.chatMessages.push({ sender: 'bot', text: botReply });
  switchTab('chat');
}

function submitResearcherDraft() {
  const title = document.getElementById('draft-title-input').value.trim();
  const domain = document.getElementById('draft-domain-input').value;
  const findings = document.getElementById('draft-findings-input').value.trim();

  if (!title) {
    alert('Please enter a Manuscript Title.');
    return;
  }

  const newId = 'DRAFT-2026-' + String(appState.researcherDrafts.length + 1).padStart(2, '0');
  appState.researcherDrafts.unshift({
    id: newId,
    title: title,
    author: 'Dr. Ananya Roy',
    date: new Date().toISOString().split('T')[0],
    status: 'Submitted (DoLR Peer Review Assigned)'
  });

  document.getElementById('draft-title-input').value = '';
  document.getElementById('draft-findings-input').value = '';

  const listContainer = document.getElementById('drafts-list-container');
  if (listContainer) {
    listContainer.innerHTML = renderDraftsListHtml();
  }

  showToast(`Draft "${title.substring(0, 30)}..." submitted to DoLR Peer Review!`);
  logAudit(`Researcher manuscript submitted: ${title}`);
}

// =========================================================================
// 4. DEDICATED DASHBOARD: STATE EVIDENCE REVIEWER (STATUTORY CLEARANCES)
// =========================================================================
function renderReviewerDashboard(container) {
  container.innerHTML = `
    <!-- State Evidence Clearance Board Header -->
    <div style="background: linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(15,29,22,0.95) 100%); border:1px solid var(--gov-saffron); border-radius:16px; padding:24px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="tag tag-saffron">LEVEL 3 STATUTORY AUDIT CLEARANCE</span>
            <span class="tag tag-verified">SVAMITVA & DILRMP Board</span>
          </div>
          <h2 style="font-size:24px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            📋 State Evidence Validation & Statutory Clearance Board
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); max-width:780px;">
            Statutory authority to inspect state drone survey dossiers, audit ground truth discrepancies, issue official DoLR clearance certificates, or order corrective resurveys for non-compliant districts.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-saffron" onclick="switchTab('evidence')">
            📑 View Full Evidence Queue
          </button>
          <button class="btn" onclick="switchTab('map')">
            🗺️ Audit Map Overlays
          </button>
        </div>
      </div>
    </div>

    <!-- 4 Key Reviewer KPIs -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
        <div class="kpi-label">Pending State Submissions</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">4 States</div>
        <div class="kpi-sub">UP, Maharashtra, Gujarat, Odisha</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
        <div class="kpi-label">Clearance Certificates Granted</div>
        <div class="kpi-val" style="color:var(--gov-green);">12 States</div>
        <div class="kpi-sub">Statutory Gazette Notifications Active</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-red);">
        <div class="kpi-label">Resurveys Ordered (Discrepancy)</div>
        <div class="kpi-val" style="color:var(--gov-red);">2 Districts</div>
        <div class="kpi-sub">Koraput (OD) & Bundelkhand (UP)</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
        <div class="kpi-label">Sub-5cm Ground Truth Accuracy</div>
        <div class="kpi-val" style="color:var(--gov-blue);">99.2%</div>
        <div class="kpi-sub">Survey of India CORS Network Standard</div>
      </div>
    </div>

    <!-- Live State Audit Clearance Cards -->
    <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:22px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:17px; font-weight:800; color:var(--text-main);">🔍 Statutory Review Queue & Verification Actions</h3>
          <p style="font-size:12.5px; color:var(--text-muted);">Review drone survey GCP density, discrepancy rates, and sign clearance certificates</p>
        </div>
        <span class="tag tag-saffron">Audit Cycle: Q3 2026</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        ${renderReviewerStateCardsHtml()}
      </div>
    </div>
  `;
}

function renderReviewerStateCardsHtml() {
  const reviews = window.BHUMI_REVIEWS || [];
  return reviews.map(r => {
    const clr = appState.stateClearances[r.state_code] || { status: 'Pending Review', certId: null };
    const isCleared = clr.status === 'Cleared';
    const isFlagged = clr.status.includes('Flagged');

    return `
      <div style="background:var(--bg-card-subtle); border:1px solid ${isCleared ? 'var(--gov-green)' : (isFlagged ? 'var(--gov-red)' : 'var(--border-card)')}; border-radius:10px; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px; font-weight:800; color:var(--text-main);">${r.state}</span>
              <span class="tag tag-gray">${r.district_sample}</span>
              <span class="tag ${isCleared ? 'tag-verified' : (isFlagged ? 'tag-red' : 'tag-saffron')}">${clr.status}</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
              Survey Agency: <strong>${r.survey_agency}</strong> · Methodology: ${r.methodology}
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px; font-weight:700; color:var(--text-main);">${r.parcels_audited.toLocaleString()} Parcels Audited</div>
            <div style="font-size:11px; color:var(--text-muted);">Discrepancy: <strong style="color:${r.discrepancy_rate > 2 ? 'var(--gov-red)' : 'var(--gov-green)'};">${r.discrepancy_rate}%</strong></div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.2); padding:10px 12px; border-radius:6px; font-size:12px; color:var(--text-main); margin-bottom:12px;">
          <strong>Audit Notes:</strong> ${clr.notes || r.findings}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="font-size:11px; color:var(--text-muted);">
            ${isCleared ? `✔ Certificate: <strong>${clr.certId}</strong> (${clr.date})` : 'Awaiting statutory reviewer action'}
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-sm btn-verified" onclick="grantClearance('${r.state_code}')" ${isCleared ? 'disabled style="opacity:0.5;"' : ''}>
              ✔ Issue Clearance Certificate
            </button>
            <button class="btn btn-sm btn-danger" onclick="flagDiscrepancy('${r.state_code}')">
              ⚠️ Flag Field Discrepancy
            </button>
            <button class="btn btn-sm" onclick="showToast('Inspecting GCP logs for ${r.state}: RMS error 3.2cm within CORS limits.')">
              🔍 Inspect GCP Logs
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function grantClearance(stateCode) {
  const certId = 'CERT-DoLR-' + stateCode + '-2026-' + Math.floor(1000 + Math.random() * 9000);
  appState.stateClearances[stateCode] = {
    status: 'Cleared',
    certId: certId,
    date: new Date().toISOString().split('T')[0],
    notes: 'Statutory audit passed. Sub-5cm drone ortho accuracy verified against Survey of India CORS network.'
  };

  showToast(`Statutory Clearance Certificate ${certId} issued for ${stateCode}!`);
  logAudit(`Granted statutory clearance certificate ${certId} for state ${stateCode}`);
  
  if (appState.currentTab === 'dashboard') {
    renderReviewerDashboard(document.getElementById('workspace'));
  } else if (appState.currentTab === 'evidence') {
    renderEvidenceTab(document.getElementById('workspace'));
  }
}

function flagDiscrepancy(stateCode) {
  const reason = prompt(`Enter reason for flagging field discrepancy in ${stateCode}:`, 'Cadastral boundary misalignment exceeds 15cm tolerance in peri-urban survey sector.');
  if (!reason) return;

  appState.stateClearances[stateCode] = {
    status: 'Flagged (Resurvey Ordered)',
    certId: null,
    date: new Date().toISOString().split('T')[0],
    notes: reason
  };

  showToast(`Flagged discrepancy for ${stateCode}. Corrective resurvey ordered.`);
  logAudit(`Flagged field discrepancy for state ${stateCode}: ${reason}`);

  if (appState.currentTab === 'dashboard') {
    renderReviewerDashboard(document.getElementById('workspace'));
  } else if (appState.currentTab === 'evidence') {
    renderEvidenceTab(document.getElementById('workspace'));
  }
}

// =========================================================================
// 5. DEDICATED DASHBOARD: CITIZEN / PUBLIC USER (OPEN DATA DESK)
// =========================================================================
function renderCitizenDashboard(container) {
  container.innerHTML = `
    <!-- Citizen Desk Header -->
    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(15,29,22,0.95) 100%); border:1px solid var(--border-light); border-radius:16px; padding:24px; margin-bottom:20px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="tag tag-gray">LEVEL 1 PUBLIC TRANSPARENCY DESK</span>
            <span class="tag tag-verified">Digital India Land Records</span>
          </div>
          <h2 style="font-size:24px; font-weight:800; color:var(--text-main); margin-bottom:6px;">
            👥 Citizen Land Information & Open Data Desk ("Apni Zameen Janein")
          </h2>
          <p style="font-size:13.5px; color:var(--text-muted); max-width:780px;">
            Public transparency portal for citizens, farmers, and property owners. Look up your state's official Bhulekh portal, check Khasra/Khatauni procedures, and understand your rights under SVAMITVA and Bhu-Aadhaar.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="document.getElementById('citizen-portal-finder').scrollIntoView({behavior:'smooth'})">
            🔍 Find Your State Portal
          </button>
          <button class="btn" onclick="openRoleComparisonModal()">
            ❓ Compare Permissions
          </button>
        </div>
      </div>
    </div>

    <!-- 4 Citizen Stats -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
        <div class="kpi-label">Computerized Land Records (RoR)</div>
        <div class="kpi-val" style="color:var(--gov-green);">95.8%</div>
        <div class="kpi-sub">Available Online Across India</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
        <div class="kpi-label">Drone Surveyed Villages (SVAMITVA)</div>
        <div class="kpi-val" style="color:var(--gov-blue);">3.15+ Lakh</div>
        <div class="kpi-sub">Property Cards Distributed to Rural Owners</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
        <div class="kpi-label">14-Digit Bhu-Aadhaar (ULPIN)</div>
        <div class="kpi-val" style="color:var(--gov-saffron);">Active</div>
        <div class="kpi-sub">Unique Land Identity to Prevent Fraud</div>
      </div>
      <div class="kpi-card" style="border-left:4px solid var(--text-dim);">
        <div class="kpi-label">Verified Official State Portals</div>
        <div class="kpi-val">36 States/UTs</div>
        <div class="kpi-sub">100% Free Public Access</div>
      </div>
    </div>

    <!-- "Apni Zameen Janein" - Official State Portal Selector -->
    <div id="citizen-portal-finder" style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:22px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
        <div>
          <h3 style="font-size:18px; font-weight:800; color:var(--text-main);">🌐 "Apni Zameen Janein" · Find Your State's Official Portal</h3>
          <p style="font-size:12.5px; color:var(--text-muted);">Select your state to get official portal links and step-by-step instructions to search your Khasra / Khatauni:</p>
        </div>
        <div style="min-width:240px;">
          <select id="citizen-state-dropdown" onchange="updateCitizenPortalCard()" style="width:100%; padding:10px 14px; background:var(--bg-card-subtle); border:1px solid var(--gov-green); border-radius:8px; color:var(--text-main); font-size:13.5px; font-weight:700;">
            <option value="UP">Uttar Pradesh (UP Bhulekh)</option>
            <option value="MH">Maharashtra (Mahabhulekh)</option>
            <option value="KA">Karnataka (Bhoomi)</option>
            <option value="TN">Tamil Nadu (TN Patta Chitta)</option>
            <option value="RJ">Rajasthan (Apna Khata)</option>
            <option value="GJ">Gujarat (AnyRoR)</option>
            <option value="MP">Madhya Pradesh (MP Bhulekh)</option>
            <option value="BR">Bihar (BiharBhumi)</option>
            <option value="WB">West Bengal (Banglarbhumi)</option>
            <option value="OD">Odisha (Bhulekh Odisha)</option>
            <option value="TG">Telangana (Dharani)</option>
            <option value="AP">Andhra Pradesh (MeeBhoomi)</option>
          </select>
        </div>
      </div>

      <!-- State Portal Information Card -->
      <div id="citizen-portal-card" style="background:var(--bg-card-subtle); border:1px solid var(--border-light); border-radius:12px; padding:18px;">
        Loading portal information...
      </div>
    </div>

    <!-- Citizen Land Rights & FAQs -->
    <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:14px; padding:22px; margin-bottom:24px;">
      <h3 style="font-size:17px; font-weight:800; color:var(--text-main); margin-bottom:14px;">
        💡 Citizen Land Rights & Frequently Asked Questions (FAQs)
      </h3>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px;">
          <div style="font-weight:700; font-size:13px; color:var(--gov-green); margin-bottom:4px;">
            1. What is Bhu-Aadhaar (ULPIN) and how does it protect my land?
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">
            Bhu-Aadhaar is a unique 14-digit alphanumeric identification number based on the exact geospatial latitude and longitude of your land parcel. It prevents fraudulent duplicate registrations and illegal encroachment.
          </p>
        </div>

        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px;">
          <div style="font-weight:700; font-size:13px; color:var(--gov-green); margin-bottom:4px;">
            2. How can I use my SVAMITVA Property Card (Gharoni) for bank loans?
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">
            SVAMITVA Property Cards provide formal, state-verified ownership of rural inhabited (Abadi) land. All nationalized banks recognize this card as valid financial collateral for agricultural and housing loans.
          </p>
        </div>

        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px;">
          <div style="font-weight:700; font-size:13px; color:var(--gov-green); margin-bottom:4px;">
            3. How do I apply for online mutation (Daakhil-Kharij)?
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">
            After registering a sale deed at the Sub-Registrar Office, mutation is initiated automatically in most states via API integration. You can track progress and file objections on your state's Bhulekh portal within 30 days.
          </p>
        </div>

        <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px;">
          <div style="font-weight:700; font-size:13px; color:var(--gov-green); margin-bottom:4px;">
            4. What to do if there is a boundary discrepancy?
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">
            Apply for a joint demarcation (Hadd-Shikani) on your state revenue portal. An official surveyor (Lekhpal/Patwari) will inspect the parcel with an Electronic Total Station (ETS) or drone GPS coordinates.
          </p>
        </div>
      </div>
    </div>

    <!-- Data Privacy & Restricted Access Notice -->
    <div style="background:rgba(245,158,11,0.08); border:1px solid var(--gov-saffron); border-radius:14px; padding:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div style="display:flex; align-items:center; gap:14px;">
        <span style="font-size:32px;">🔒</span>
        <div>
          <div style="font-weight:800; font-size:14px; color:var(--gov-saffron);">Why are Dispute Litigations & Policy Simulation Sandbox Locked?</div>
          <div style="font-size:12.5px; color:var(--text-muted); max-width:720px; margin-top:2px;">
            Under the Digital Personal Data Protection (DPDP) Act 2023, confidential court litigations, raw dispute heatmaps, and cabinet policy simulation tools are restricted to Government Revenue Officers and Accredited Researchers.
          </div>
        </div>
      </div>
      <button class="btn btn-primary" onclick="switchRole('Officer')">
        🏛️ Switch to Govt Officer
      </button>
    </div>
  `;

  setTimeout(() => { updateCitizenPortalCard(); }, 50);
}

function updateCitizenPortalCard() {
  const sel = document.getElementById('citizen-state-dropdown');
  const card = document.getElementById('citizen-portal-card');
  if (!sel || !card) return;

  const code = sel.value;
  const states = window.BHUMI_STATES || {};
  const s = states[code] || states['UP'];
  if (!s) return;

  card.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <h4 style="font-size:17px; font-weight:800; color:var(--text-main);">${s.name} Official Land Records</h4>
          <span class="tag tag-verified">${s.portal}</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Capital: ${s.capital} · RoR Computerized: <strong>${s.ror_pct}%</strong> · Cadastral Maps: <strong>${s.cadastral_pct}%</strong></div>
      </div>
      <a href="${s.portal_url}" target="_blank" class="btn btn-primary" style="text-decoration:none;">
        🌐 Open Official ${s.portal} Portal ➔
      </a>
    </div>

    <div style="background:var(--bg-card); padding:14px; border-radius:8px; border:1px solid var(--border-card);">
      <div style="font-size:12.5px; font-weight:700; color:var(--gov-green); margin-bottom:6px;">
        📌 How to search your Record of Rights (Khatauni / Khasra) on ${s.portal}:
      </div>
      <ol style="font-size:12px; color:var(--text-muted); margin-left:18px; line-height:1.6;">
        <li>Visit the official portal at <strong style="color:var(--text-main);">${s.portal_url}</strong></li>
        <li>Select your <strong>District</strong>, <strong>Tehsil</strong>, and <strong>Gram (Village)</strong></li>
        <li>Choose to search by <strong>Khasra Number (खसरा संख्या)</strong>, <strong>Khata Number (खाता संख्या)</strong>, or <strong>Name of Landowner (खातेदार का नाम)</strong></li>
        <li>Enter the Captcha and click <strong>"उद्धरण देखें" (View Record)</strong></li>
        <li>Download your digitally signed, valid Record of Rights (RoR) for free!</li>
      </ol>
    </div>
  `;
}

// =========================================================================
// UNIVERSAL TAB: NATIONAL CADASTRAL MAP
// =========================================================================
function renderMapTab(container) {
  const role = appState.currentRole;
  const isPublic = role === 'Public';

  container.innerHTML = `
    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; height:calc(100vh - 200px); min-height:640px;">
      
      <!-- Left: Interactive Map Container -->
      <div class="map-viewport-wrapper">
        
        <!-- Floating Controls Header -->
        <div class="map-floating-controls">
          <div style="display:flex; background:rgba(15,29,22,0.85); backdrop-filter:blur(8px); border:1px solid var(--border-card); border-radius:8px; padding:4px; gap:4px;">
            <button class="btn btn-sm ${appState.mapMetric === 'dispute' ? 'btn-primary' : ''}" onclick="setMapMetric('dispute')">
              ${isPublic ? '🔒 Dispute Risk (Masked)' : '⚖️ Dispute Risk Index'}
            </button>
            <button class="btn btn-sm ${appState.mapMetric === 'ror' ? 'btn-primary' : ''}" onclick="setMapMetric('ror')">
              📋 RoR Digitization %
            </button>
            <button class="btn btn-sm ${appState.mapMetric === 'cadastral' ? 'btn-primary' : ''}" onclick="setMapMetric('cadastral')">
              🗺️ Cadastral %
            </button>
          </div>

          <div style="display:flex; background:rgba(15,29,22,0.85); backdrop-filter:blur(8px); border:1px solid var(--border-card); border-radius:8px; padding:4px; gap:4px;">
            <button class="btn btn-sm ${appState.mapMode === 'svg' ? 'btn-primary' : ''}" onclick="switchMapMode('svg')">
              🗺️ SVG Map
            </button>
            <button class="btn btn-sm ${appState.mapMode === 'leaflet' ? 'btn-primary' : ''}" onclick="switchMapMode('leaflet')">
              🛰️ Satellite Leaflet
            </button>
          </div>
        </div>

        <!-- SVG Map Container -->
        <div id="svg-map-container" style="width:100%; height:100%; display:${appState.mapMode === 'svg' ? 'flex' : 'none'}; align-items:center; justify-content:center;">
          <svg id="india-svg-map" viewBox="0 0 9207 10547" style="width:100%; height:100%; max-height:600px;">
            <g id="svg-states-group">
              <!-- Injected by initSvgMap() -->
            </g>
          </svg>
        </div>

        <!-- Leaflet Map Container -->
        <div id="leaflet-map" style="display:${appState.mapMode === 'leaflet' ? 'block' : 'none'};"></div>

        <!-- Floating Legend -->
        <div class="map-floating-legend">
          <div style="font-weight:700;" id="map-legend-title">Metric: Land Dispute Risk Index</div>
          <div class="legend-bar" id="map-legend-bar">
            <span style="flex:1; background:#10b981;"></span>
            <span style="flex:1; background:#f59e0b;"></span>
            <span style="flex:1; background:#ef4444;"></span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted);">
            <span>Low Risk</span>
            <span>Moderate</span>
            <span>High Risk / Lag</span>
          </div>
        </div>

        <!-- Hover Tooltip -->
        <div id="map-hover-tooltip"></div>
      </div>

      <!-- Right: State Detail Drawer -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:20px; overflow-y:auto;" id="state-detail-drawer">
        <!-- Rendered by renderStateDetailPanel() -->
      </div>

    </div>
  `;

  setTimeout(() => {
    initSvgMap();
    renderStateDetailPanel(appState.selectedState);
  }, 50);
}

function initSvgMap() {
  const group = document.getElementById('svg-states-group');
  if (!group) return;

  const states = window.BHUMI_STATES || {};
  let pathsHtml = '';

  for (const [code, s] of Object.entries(states)) {
    if (s.path_d) {
      pathsHtml += `
        <path class="map-state-path ${code === appState.selectedState ? 'selected' : ''}"
              id="svg-path-${code}"
              data-code="${code}"
              d="${s.path_d}"
              onclick="selectState('${code}')"
              onmouseenter="hoverState(event, '${code}')"
              onmouseleave="leaveState()"></path>
      `;
    }
  }

  group.innerHTML = pathsHtml;
  applySvgMapColors();
}

function applySvgMapColors() {
  const states = window.BHUMI_STATES || {};
  const metric = appState.mapMetric;
  const isPublic = appState.currentRole === 'Public';

  for (const [code, s] of Object.entries(states)) {
    const path = document.getElementById('svg-path-' + code);
    if (!path) continue;

    if (code === appState.selectedState) {
      path.style.fill = '#f59e0b';
      continue;
    }

    if (metric === 'dispute') {
      if (isPublic) {
        // Mask dispute score for citizen public tier!
        path.style.fill = '#1f382a';
      } else {
        const d = s.dispute_idx || 50;
        if (d >= 75) path.style.fill = '#ef4444';
        else if (d >= 60) path.style.fill = '#f59e0b';
        else path.style.fill = '#10b981';
      }
    } else if (metric === 'ror') {
      const r = s.ror_pct || 90;
      if (r >= 99) path.style.fill = '#10b981';
      else if (r >= 95) path.style.fill = '#3b82f6';
      else path.style.fill = '#f59e0b';
    } else if (metric === 'cadastral') {
      const c = s.cadastral_pct || 80;
      if (c >= 95) path.style.fill = '#10b981';
      else if (c >= 90) path.style.fill = '#f59e0b';
      else path.style.fill = '#ef4444';
    }
  }
}

function selectState(code) {
  appState.selectedState = code;
  applySvgMapColors();
  renderStateDetailPanel(code);
}

function hoverState(event, code) {
  const tooltip = document.getElementById('map-hover-tooltip');
  const states = window.BHUMI_STATES || {};
  const s = states[code];
  if (!tooltip || !s) return;

  const isPublic = appState.currentRole === 'Public';
  tooltip.innerHTML = `
    <strong>${s.name}</strong> (${code})<br>
    <span style="color:var(--text-muted);">Portal: ${s.portal}</span><br>
    RoR: <strong>${s.ror_pct}%</strong> | Cadastral: <strong>${s.cadastral_pct}%</strong><br>
    Dispute Index: <strong>${isPublic ? '🔒 [Officer Only]' : s.dispute_idx + ' / 100'}</strong>
  `;
  tooltip.style.left = (event.clientX + 14) + 'px';
  tooltip.style.top = (event.clientY - 20) + 'px';
  tooltip.style.display = 'block';
}

function leaveState() {
  const tooltip = document.getElementById('map-hover-tooltip');
  if (tooltip) tooltip.style.display = 'none';
}

function setMapMetric(metric) {
  appState.mapMetric = metric;
  applySvgMapColors();
  
  const title = document.getElementById('map-legend-title');
  if (title) {
    if (metric === 'dispute') title.textContent = 'Metric: Land Dispute Risk Index';
    else if (metric === 'ror') title.textContent = 'Metric: RoR Computerization %';
    else if (metric === 'cadastral') title.textContent = 'Metric: Digitized Cadastral Maps %';
  }
}

function switchMapMode(mode) {
  appState.mapMode = mode;
  const svgCont = document.getElementById('svg-map-container');
  const leafCont = document.getElementById('leaflet-map');
  
  if (mode === 'svg') {
    svgCont.style.display = 'flex';
    leafCont.style.display = 'none';
  } else {
    svgCont.style.display = 'none';
    leafCont.style.display = 'block';
    initLeafletMap();
  }
}

function initLeafletMap() {
  if (appState.leafletMap) {
    setTimeout(() => { appState.leafletMap.invalidateSize(); }, 200);
    return;
  }

  appState.leafletMap = L.map('leaflet-map').setView([22.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors | DoLR Bhuvan'
  }).addTo(appState.leafletMap);

  const states = window.BHUMI_STATES || {};
  for (const [code, s] of Object.entries(states)) {
    if (s.lat && s.lng) {
      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 8,
        fillColor: s.dispute_idx > 70 ? '#ef4444' : '#10b981',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.85
      }).addTo(appState.leafletMap);

      marker.bindPopup(`
        <strong>${s.name}</strong><br>
        Portal: ${s.portal}<br>
        RoR: ${s.ror_pct}% | Cadastral: ${s.cadastral_pct}%<br>
        <button onclick="selectState('${code}')" class="btn btn-sm" style="margin-top:4px;">Select State</button>
      `);
    }
  }
}

function renderStateDetailPanel(code) {
  const drawer = document.getElementById('state-detail-drawer');
  if (!drawer) return;

  const states = window.BHUMI_STATES || {};
  const s = states[code] || states['UP'];
  const role = appState.currentRole;
  const isPublic = role === 'Public';

  drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
      <div>
        <span class="tag tag-verified">${code} · STATE RECORD</span>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-main); margin-top:4px;">${s.name}</h3>
        <div style="font-size:12px; color:var(--text-muted);">Capital: ${s.capital}</div>
      </div>
      <a href="${s.portal_url}" target="_blank" class="btn btn-sm btn-primary" style="text-decoration:none;">
        ${s.portal} ➔
      </a>
    </div>

    <!-- Metrics Progress -->
    <div class="stat-bar-group">
      <div class="stat-bar-header">
        <span>Record of Rights (RoR) Computerization</span>
        <strong>${s.ror_pct}%</strong>
      </div>
      <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${s.ror_pct}%;"></div></div>
    </div>

    <div class="stat-bar-group">
      <div class="stat-bar-header">
        <span>Geo-Referenced Cadastral Maps</span>
        <strong>${s.cadastral_pct}%</strong>
      </div>
      <div class="stat-bar-track"><div class="stat-bar-fill saffron" style="width:${s.cadastral_pct}%;"></div></div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:14px 0;">
      <div style="background:var(--bg-card-subtle); padding:10px; border-radius:8px;">
        <div style="font-size:11px; color:var(--text-muted);">ULPIN / Bhu-Aadhaar</div>
        <div style="font-size:12px; font-weight:700; color:var(--text-main);">${s.ulpin_status}</div>
      </div>
      <div style="background:var(--bg-card-subtle); padding:10px; border-radius:8px;">
        <div style="font-size:11px; color:var(--text-muted);">SVAMITVA Property Cards</div>
        <div style="font-size:12px; font-weight:700; color:var(--text-main);">${s.svamitva_cards}</div>
      </div>
    </div>

    <!-- Role Adaptive Section in State Detail -->
    <div style="border-top:1px solid var(--border-card); padding-top:14px; margin-top:10px;">
      ${renderStateRoleAdaptiveSection(s, role, isPublic)}
    </div>

    <!-- Sample Districts -->
    <div style="margin-top:14px;">
      <div style="font-size:12px; font-weight:700; color:var(--text-muted); margin-bottom:6px;">Sample Districts:</div>
      <div class="chips-wrapper">
        ${(s.districts || []).map(d => `<span class="chip">${d[0]}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderStateRoleAdaptiveSection(s, role, isPublic) {
  if (isPublic) {
    return `
      <div style="background:rgba(245,158,11,0.08); border:1px solid var(--border-card); border-radius:8px; padding:12px;">
        <div style="font-size:12px; font-weight:700; color:var(--gov-saffron);">🔒 Litigation Risk Data Restricted</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
          Individual parcel court dispute metrics are hidden in Public mode under DPDP Act 2023. Switch to Government Officer or Researcher to view.
        </div>
      </div>
    `;
  }

  if (role === 'Officer') {
    return `
      <div style="background:rgba(239, 68, 68, 0.1); border:1px solid var(--gov-red); border-radius:8px; padding:12px; margin-bottom:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:12px; font-weight:700; color:#fca5a5;">Dispute Risk Index: ${s.dispute_idx} / 100</div>
          <span class="tag tag-red">UNREDACTED</span>
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">
          Pending Civil Court Litigations: <strong>${Math.floor(s.dispute_idx * 142)} Cases</strong>
        </div>
        <button class="btn btn-sm btn-danger" style="width:100%; margin-top:6px;" onclick="issueOfficerAdvisory('${s.name}')">
          📢 Issue DoLR Advisory Directive
        </button>
      </div>
    `;
  }

  if (role === 'Reviewer') {
    const clr = appState.stateClearances[s.code] || { status: 'Pending Review' };
    return `
      <div style="background:rgba(245,158,11,0.1); border:1px solid var(--gov-saffron); border-radius:8px; padding:12px;">
        <div style="font-size:12px; font-weight:700; color:var(--gov-saffron);">Statutory Audit Status: ${clr.status}</div>
        <div style="display:flex; gap:6px; margin-top:8px;">
          <button class="btn btn-sm btn-verified" style="flex:1;" onclick="grantClearance('${s.code}')">✔ Clear</button>
          <button class="btn btn-sm btn-danger" style="flex:1;" onclick="flagDiscrepancy('${s.code}')">⚠️ Flag</button>
        </div>
      </div>
    `;
  }

  // Institution / Researcher
  return `
    <div style="background:rgba(59,130,246,0.1); border:1px solid var(--gov-blue); border-radius:8px; padding:12px;">
      <div style="font-size:12px; font-weight:700; color:var(--gov-blue);">Academic Research Layer</div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
        Associated Policy Papers: <strong>${s.research_count} Studies</strong> available in national repository.
      </div>
      <button class="btn btn-sm btn-blue" style="width:100%; margin-top:6px;" onclick="switchTab('papers')">
        📚 Filter Papers for ${s.name}
      </button>
    </div>
  `;
}

// =========================================================================
// UNIVERSAL TAB: POLICY PAPERS REPOSITORY (20+ PAPERS)
// =========================================================================
function renderPapersTab(container) {
  const role = appState.currentRole;
  const isPublic = role === 'Public';

  container.innerHTML = `
    <!-- Repository Filter Bar -->
    <div class="search-filter-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="paper-search-input" oninput="filterPapers()" placeholder="Search 20+ policy publications by title, author, keyword, or agency...">
      </div>

      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <select id="paper-category-select" onchange="filterPapers()" style="padding:9px 12px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:8px; color:var(--text-main); font-size:13px;">
          <option value="All">All Categories</option>
          <option value="Titling">Conclusive Titling</option>
          <option value="SVAMITVA">SVAMITVA Scheme</option>
          <option value="Disputes">Disputes & Litigations</option>
          <option value="Urban">Urban & Peri-Urban</option>
          <option value="Forest">Forest Rights (FRA)</option>
        </select>

        ${isPublic ? `
          <div class="tag tag-gray" style="display:flex; align-items:center; gap:4px;">
            <span>🔒 Abstract Only (Public Mode)</span>
          </div>
        ` : `
          <div class="tag tag-verified" style="display:flex; align-items:center; gap:4px;">
            <span>✔ Full Unredacted Papers Active</span>
          </div>
        `}
      </div>
    </div>

    ${isPublic ? `
      <div style="background:rgba(245,158,11,0.08); border:1px solid var(--gov-saffron); border-radius:10px; padding:12px 18px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="font-size:12.5px; color:var(--gov-saffron);">
          <strong>Notice:</strong> In Public mode, only Executive Abstracts are displayed. Detailed policy recommendations, econometric data tables, and raw PDFs require Researcher or Officer sign-in.
        </div>
        <button class="btn btn-sm btn-primary" onclick="switchRole('Researcher')">
          Switch to Researcher
        </button>
      </div>
    ` : ''}

    <!-- Papers Grid Container -->
    <div id="papers-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:18px;">
      <!-- Populated by filterPapers() -->
    </div>
  `;

  setTimeout(() => { filterPapers(); }, 50);
}

function filterPapers() {
  const grid = document.getElementById('papers-grid');
  if (!grid) return;

  const query = (document.getElementById('paper-search-input')?.value || '').toLowerCase();
  const category = document.getElementById('paper-category-select')?.value || 'All';
  const role = appState.currentRole;
  const isPublic = role === 'Public';

  const papers = window.BHUMI_PAPERS || [];
  const filtered = papers.filter(p => {
    const matchQ = p.title.toLowerCase().includes(query) ||
                   (p.authors && p.authors.toLowerCase().includes(query)) ||
                   p.agency.toLowerCase().includes(query) ||
                   (p.keywords && p.keywords.some(k => k.toLowerCase().includes(query)));
    
    const matchCat = category === 'All' || (p.category && p.category.includes(category));
    return matchQ && matchCat;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">No research publications matched your search query.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="paper-card">
      <div>
        <div class="paper-top">
          <span class="tag tag-saffron">${p.year}</span>
          <span class="tag tag-verified">${p.category || 'Policy Paper'}</span>
        </div>
        <div class="paper-title" style="margin-top:8px;">${p.title}</div>
        <div class="paper-agency">🏛️ ${p.agency}</div>
        
        <p style="font-size:12px; color:var(--text-muted); line-height:1.5; margin:10px 0;">
          ${(p.abstract || '').substring(0, 160)}...
        </p>

        <div class="chips-wrapper" style="margin-top:8px;">
          ${(p.keywords || []).slice(0, 3).map(k => `<span class="chip" style="font-size:10.5px;">${k}</span>`).join('')}
        </div>
      </div>

      <div style="border-top:1px solid var(--border-card); padding-top:12px; display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
        <span style="font-size:11.5px; color:var(--text-muted);">${p.state || 'All-India'}</span>
        
        <div style="display:flex; gap:6px;">
          <button class="btn btn-sm btn-primary" onclick="openPaperModal('${p.id}')">
            ${isPublic ? '📖 View Abstract' : '📄 Read Full Paper'}
          </button>
          
          ${role === 'Researcher' ? `
            <button class="btn btn-sm btn-purple" onclick="copyCitation('bibtex')" title="Copy BibTeX">
              📋 Cite
            </button>
          ` : ''}

          ${role === 'Institution' ? `
            <button class="btn btn-sm btn-blue" onclick="showToast('Dataset exported for ${p.id}')" title="Download Empirical Dataset">
              📥 Data
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function openPaperModal(paperId) {
  const paper = (window.BHUMI_PAPERS || []).find(p => p.id === paperId);
  if (!paper) return;

  const modal = document.getElementById('paper-modal');
  const body = document.getElementById('modal-body-content');
  const tag = document.getElementById('modal-tag');
  const yr = document.getElementById('modal-year');
  const actions = document.getElementById('modal-footer-actions');
  if (!modal || !body) return;

  const role = appState.currentRole;
  const isPublic = role === 'Public';

  tag.textContent = paper.agency;
  yr.textContent = paper.year;

  body.innerHTML = `
    <h2 style="font-size:20px; font-weight:800; color:var(--text-main); margin-bottom:6px;">${paper.title}</h2>
    <div style="font-size:12.5px; color:var(--gov-green); font-weight:600; margin-bottom:14px;">
      Published by: ${paper.agency} · Authors: ${paper.authors || 'DoLR Expert Committee'} · Category: ${paper.category}
    </div>

    <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px; margin-bottom:16px;">
      <h4 style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:6px;">Executive Abstract:</h4>
      <p style="font-size:12.5px; color:var(--text-muted); line-height:1.6;">${paper.abstract}</p>
    </div>

    ${isPublic ? `
      <div style="background:rgba(239, 68, 68, 0.1); border:1px solid var(--gov-red); border-radius:10px; padding:16px; text-align:center;">
        <div style="font-size:28px; margin-bottom:6px;">🔒</div>
        <div style="font-weight:700; color:#fca5a5; font-size:14px;">Detailed Empirical Findings & Full Text Restricted</div>
        <p style="font-size:12px; color:var(--text-muted); margin:6px 0 12px 0;">
          Full policy dossiers, econometric models, and state-level evidence are accessible to Government Officers and Accredited Researchers.
        </p>
        <button class="btn btn-sm btn-primary" onclick="closeModal('paper-modal'); switchRole('Researcher');">
          Switch to Academic Researcher
        </button>
      </div>
    ` : `
      <div style="margin-bottom:16px;">
        <h4 style="font-size:13px; font-weight:700; color:var(--gov-green); margin-bottom:6px;">Key Empirical Findings & Policy Directives:</h4>
        <ul style="font-size:12.5px; color:var(--text-main); line-height:1.6; margin-left:18px;">
          ${(paper.findings_list || [
            'Conclusive land titling backed by state guarantee eliminates 68% of boundary dispute civil appeals.',
            'ULPIN 14-digit geo-tagging prevents fraudulent multi-party mortgage registrations.',
            'Digital cadastral vector integration accelerates rural bank credit disbursement from 21 days to 48 hours.'
          ]).map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div style="background:var(--bg-card-subtle); padding:12px; border-radius:8px; font-size:12px; color:var(--text-muted);">
        <strong>Reference Citation:</strong> ${paper.agency} (${paper.year}). <em>${paper.title}</em>. Official Document Reference: <code>${paper.id}</code>.
      </div>
    `}
  `;

  actions.innerHTML = `
    <button class="btn btn-sm" onclick="closeModal('paper-modal')">Close</button>
    <a href="${paper.source_url}" target="_blank" class="btn btn-sm btn-primary" style="text-decoration:none;">
      🌐 Source Portal ➔
    </a>
  `;

  modal.classList.add('open');
}

// =========================================================================
// UNIVERSAL TAB: POLICY SIMULATION SANDBOX
// =========================================================================
function renderSimulateTab(container) {
  const role = appState.currentRole;
  
  if (role === 'Public' || role === 'Researcher' || role === 'Institution') {
    container.innerHTML = `
      <div class="restricted-zone-card">
        <div style="font-size:52px; margin-bottom:12px;">🔒</div>
        <span class="tag tag-saffron" style="font-size:12px; margin-bottom:8px;">Cabinet Executive Clearance Required</span>
        <h2 style="font-size:22px; font-weight:800; color:var(--text-main); margin-top:4px;">
          Cabinet Policy Simulation Sandbox Restricted
        </h2>
        <p style="font-size:13.5px; color:var(--text-muted); max-width:620px; line-height:1.6; margin-top:10px;">
          This interactive econometric engine simulates legislative fiscal outlays, dispute reduction trajectories, and state indemnity risk scores for the Union Cabinet. Access is reserved for <strong>Level 4 Government Officers</strong>.
        </p>
        <div style="margin-top:20px; display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="switchRole('Officer')">
            🏛️ Switch to Government Officer (Full Access)
          </button>
          <button class="btn" onclick="openRoleComparisonModal()">
            ❓ View Role Comparison Matrix
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Officer or Reviewer Full Simulation Sandbox
  container.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      
      <!-- Simulation Controls Panel -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:22px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <span class="tag tag-verified">CABINET SIMULATOR</span>
            <h3 style="font-size:18px; font-weight:800; color:var(--text-main); margin-top:4px;">Policy Leverage Variables</h3>
          </div>
          <button class="btn btn-sm" onclick="resetSimulation()">Reset Defaults</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:18px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:6px;">
              <span>ULPIN Geo-Referencing Target:</span>
              <span id="slider-ulpin-val" style="color:var(--gov-green);">90%</span>
            </div>
            <input type="range" id="slider-ulpin" min="50" max="100" value="90" oninput="recalcSimulation()" style="width:100%; accent-color:var(--gov-green);">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:6px;">
              <span>Fast-Track Land Dispute Tribunals Budget:</span>
              <span id="slider-budget-val" style="color:var(--gov-blue);">₹350 Cr</span>
            </div>
            <input type="range" id="slider-budget" min="50" max="1000" step="50" value="350" oninput="recalcSimulation()" style="width:100%; accent-color:var(--gov-blue);">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:6px;">
              <span>Drone Resurvey Frequency:</span>
              <span id="slider-resurvey-val" style="color:var(--gov-saffron);">Every 2 Years</span>
            </div>
            <input type="range" id="slider-resurvey" min="1" max="5" value="2" oninput="recalcSimulation()" style="width:100%; accent-color:var(--gov-saffron);">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:6px;">
              <span>Torrens Title Indemnity Fund Coverage:</span>
              <span id="slider-indemnity-val" style="color:var(--gov-purple);">₹2,000 Cr Guarantee</span>
            </div>
            <input type="range" id="slider-indemnity" min="500" max="5000" step="250" value="2000" oninput="recalcSimulation()" style="width:100%; accent-color:var(--gov-purple);">
          </div>
        </div>

        <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border-card); display:flex; gap:10px;">
          <button class="btn btn-primary" style="flex:1;" onclick="exportScenarioNote()">
            💾 Export Cabinet Note Scenario (PDF)
          </button>
        </div>
      </div>

      <!-- Projected Outcomes Panel -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:22px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <span class="tag tag-saffron">PREDICTIVE IMPACT</span>
              <h3 style="font-size:18px; font-weight:800; color:var(--text-main); margin-top:4px;">Projected Economic & Judicial Impact</h3>
            </div>
            <span class="tag tag-verified" id="sim-confidence-pill">98.4% Empirical Confidence</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
            <div class="kpi-card" style="border-left:4px solid var(--gov-green);">
              <div class="kpi-label">Projected Dispute Reduction</div>
              <div class="kpi-val" id="res-dispute-reduction" style="color:var(--gov-green);">-38.4%</div>
              <div class="kpi-sub">Civil Litigation Relief</div>
            </div>

            <div class="kpi-card" style="border-left:4px solid var(--gov-blue);">
              <div class="kpi-label">Economic Value Unlocked</div>
              <div class="kpi-val" id="res-economic-value" style="color:var(--gov-blue);">₹22,400 Cr</div>
              <div class="kpi-sub">Rural Collateral Credit Potential</div>
            </div>

            <div class="kpi-card" style="border-left:4px solid var(--gov-saffron);">
              <div class="kpi-label">Judicial Backlog Cleared</div>
              <div class="kpi-val" id="res-cases-cleared" style="color:var(--gov-saffron);">4.8 Lakh Cases</div>
              <div class="kpi-sub">Across 750 District Courts</div>
            </div>

            <div class="kpi-card" style="border-left:4px solid var(--gov-purple);">
              <div class="kpi-label">Cabinet Feasibility Score</div>
              <div class="kpi-val" id="res-feasibility-score" style="color:var(--gov-purple);">9.4 / 10</div>
              <div class="kpi-sub">High Statutory Feasibility</div>
            </div>
          </div>

          <div style="background:var(--bg-card-subtle); padding:14px; border-radius:10px; font-size:12.5px; color:var(--text-muted); line-height:1.6;">
            <strong>Econometric Model Note:</strong> Projections derived from NCAER N-LRSI benchmarks, Land Conflict Watch empirical case velocity, and NITI Aayog Conclusive Land Titling Act actuarial tables.
          </div>
        </div>
      </div>

    </div>
  `;
}

function recalcSimulation() {
  const ulpin = parseInt(document.getElementById('slider-ulpin')?.value || 90);
  const budget = parseInt(document.getElementById('slider-budget')?.value || 350);
  const resurvey = parseInt(document.getElementById('slider-resurvey')?.value || 2);
  const indemnity = parseInt(document.getElementById('slider-indemnity')?.value || 2000);

  // Update slider labels
  const uLabel = document.getElementById('slider-ulpin-val');
  const bLabel = document.getElementById('slider-budget-val');
  const rLabel = document.getElementById('slider-resurvey-val');
  const iLabel = document.getElementById('slider-indemnity-val');

  if (uLabel) uLabel.textContent = ulpin + '%';
  if (bLabel) bLabel.textContent = '₹' + budget + ' Cr';
  if (rLabel) rLabel.textContent = 'Every ' + resurvey + ' Years';
  if (iLabel) iLabel.textContent = '₹' + indemnity.toLocaleString() + ' Cr Guarantee';

  // Calculate dynamic outcomes
  const reduction = Math.min(55, Math.round((ulpin * 0.28) + (budget * 0.02) + ((6 - resurvey) * 2.5)));
  const economicVal = Math.round((ulpin * 180) + (budget * 12) + (indemnity * 1.5));
  const cases = ((reduction * 0.12) + (budget * 0.006)).toFixed(1);

  const resRed = document.getElementById('res-dispute-reduction');
  const resEcon = document.getElementById('res-economic-value');
  const resCases = document.getElementById('res-cases-cleared');

  if (resRed) resRed.textContent = '-' + reduction + '%';
  if (resEcon) resEcon.textContent = '₹' + economicVal.toLocaleString() + ' Cr';
  if (resCases) resCases.textContent = cases + ' Lakh Cases';
}

function resetSimulation() {
  const u = document.getElementById('slider-ulpin');
  const b = document.getElementById('slider-budget');
  const r = document.getElementById('slider-resurvey');
  const i = document.getElementById('slider-indemnity');
  if (u) u.value = 90;
  if (b) b.value = 350;
  if (r) r.value = 2;
  if (i) i.value = 2000;
  recalcSimulation();
}

function exportScenarioNote() {
  showToast('Cabinet Note Scenario exported: DoLR/CAB/2026/SCENARIO-912');
  logAudit('Exported Cabinet policy scenario simulation note');
}

// =========================================================================
// UNIVERSAL TAB: STATE EVIDENCE PACKS
// =========================================================================
function renderEvidenceTab(container) {
  const role = appState.currentRole;
  const isOfficerOrReviewer = role === 'Officer' || role === 'Reviewer';

  container.innerHTML = `
    <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:22px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
        <div>
          <span class="tag tag-saffron">STATUTORY VERIFICATION</span>
          <h2 style="font-size:22px; font-weight:800; color:var(--text-main); margin-top:4px;">State Evidence Packs & Ground Truth Dossiers</h2>
          <p style="font-size:12.5px; color:var(--text-muted);">Orthomosaic drone surveys, cadastral vector reconciliation, and discrepancy audit trails</p>
        </div>

        ${isOfficerOrReviewer ? `
          <button class="btn btn-saffron" onclick="showToast('State evidence queue synchronized.')">
            🔄 Refresh Audit Queue
          </button>
        ` : `
          <span class="tag tag-gray">Read-Only Transparency Mode</span>
        `}
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${renderReviewerStateCardsHtml()}
      </div>
    </div>
  `;
}

// =========================================================================
// UNIVERSAL TAB: BHUMI AI POLICY & RESEARCH COPILOT
// =========================================================================
function renderChatTab(container) {
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; height:calc(100vh - 200px); min-height:600px; background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; overflow:hidden;">
      
      <!-- Copilot Header -->
      <div style="padding:16px 20px; border-bottom:1px solid var(--border-card); display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-subtle);">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:24px;">🤖</span>
          <div>
            <div style="font-weight:800; font-size:15px; color:var(--text-main);">Bhumi AI Policy & Research Copilot</div>
            <div style="font-size:11.5px; color:var(--text-muted);">RAG Context: 20 Official Government Publications · DILRMP 3.0 · NITI Aayog · e-Courts</div>
          </div>
        </div>
        <span class="tag tag-verified">7/7 Knowledge Modules Online</span>
      </div>

      <!-- Messages Stream -->
      <div id="chat-messages-container" style="flex:1; padding:20px; overflow-y:auto; display:flex; flex-direction:column; gap:14px;">
        ${appState.chatMessages.map(m => `
          <div style="display:flex; justify-content:${m.sender === 'user' ? 'flex-end' : 'flex-start'};">
            <div style="max-width:80%; padding:12px 16px; border-radius:12px; font-size:13px; line-height:1.5; ${m.sender === 'user' ? 'background:var(--gov-green); color:#022c22; font-weight:600;' : 'background:var(--bg-card-subtle); border:1px solid var(--border-card); color:var(--text-main); white-space:pre-line;'}">
              ${m.text}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Prompt Chips -->
      <div style="padding:8px 20px; background:var(--bg-card-subtle); border-top:1px solid var(--border-card); display:flex; gap:8px; overflow-x:auto;">
        <button class="chip" onclick="sendQuickPrompt('Explain the difference between Torrens Conclusive Titling and Presumptive Titling.')">Torrens vs Presumptive Titling</button>
        <button class="chip" onclick="sendQuickPrompt('How does ULPIN 14-digit Bhu-Aadhaar integrate with e-Courts?')">ULPIN e-Courts Integration</button>
        <button class="chip" onclick="sendQuickPrompt('What are the key policy recommendations for Community Forest Rights (CFR) mapping?')">Forest Rights (FRA) Mapping</button>
        <button class="chip" onclick="sendQuickPrompt('Summarize the DILRMP 3.0 cabinet financial outlays.')">DILRMP 3.0 Outlays</button>
      </div>

      <!-- Input Box -->
      <div style="padding:14px 20px; border-top:1px solid var(--border-card); display:flex; gap:10px;">
        <input type="text" id="chat-input" onkeydown="if(event.key==='Enter') sendChatMessage()" placeholder="Ask the Land Policy Copilot anything regarding titling, SVAMITVA, litigation, or state reforms..." style="flex:1; padding:12px 16px; background:var(--bg-card-subtle); border:1px solid var(--border-card); border-radius:10px; color:var(--text-main); font-size:13.5px;">
        <button class="btn btn-primary" onclick="sendChatMessage()">Send Inquiry ➔</button>
      </div>

    </div>
  `;

  setTimeout(() => {
    const el = document.getElementById('chat-messages-container');
    if (el) el.scrollTop = el.scrollHeight;
  }, 50);
}

function sendQuickPrompt(prompt) {
  document.getElementById('chat-input').value = prompt;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const prompt = input.value.trim();
  if (!prompt) return;

  appState.chatMessages.push({ sender: 'user', text: prompt });
  input.value = '';

  let botReply = "Synthesizing empirical evidence from national land governance repositories...";
  const pLower = prompt.toLowerCase();
  const aiData = window.BHUMI_AI || {};

  if (pLower.includes('torrens') && aiData.titling) {
    botReply = `**Torrens Conclusive Titling vs Presumptive Titling:**\n\n${aiData.titling.core_insight}\n\n**Key Takeaways:**\n- ${aiData.titling.takeaways.join('\n- ')}`;
  } else if (pLower.includes('svamitva') && aiData.svamitva) {
    botReply = `**SVAMITVA Scheme Rural Property Rights:**\n\n${aiData.svamitva.core_insight}\n\n**Takeaways:**\n- ${aiData.svamitva.takeaways.join('\n- ')}`;
  } else if (pLower.includes('ulpin') || pLower.includes('bhu-aadhaar')) {
    botReply = `**ULPIN (Bhu-Aadhaar) Integration Architecture:**\n\n- **14-Digit Standard:** Unique identifier generated based on the latitude-longitude polygon vertices of each cadastral parcel.\n- **e-Courts Interoperability:** Enables instant lis pendens caveats on any land parcel with pending litigation, preventing illegal secondary sales.\n- **Collateral Efficiency:** Recognized by RBI and commercial banks for 100% digital mortgage verification without physical surveyor visits.`;
  } else if (pLower.includes('forest') || pLower.includes('fra')) {
    botReply = `**Community Forest Rights (CFR) Cadastral Demarcation:**\n\n- Under FRA 2006, mapping CFR requires joint Gram Sabha and Revenue Department spatial boundaries.\n- Terrestrial total stations coupled with sub-meter DGPS prevent false boundary overlaps between State Forest Compartments and Revenue Village Commons.`;
  } else {
    botReply = `According to NITI Aayog policy whitepapers and DoLR guidelines, digital cadastre integration combined with automated mutation reduces civil court land dispute appeals by 34.8% and accelerates agricultural loan approvals from 21 days to under 48 hours.`;
  }

  appState.chatMessages.push({ sender: 'bot', text: botReply });
  renderChatTab(document.getElementById('workspace'));
}

// =========================================================================
// UNIVERSAL TAB: ROOT ADMIN & APIS (OFFICER ONLY)
// =========================================================================
function renderAdminTab(container) {
  if (appState.currentRole !== 'Officer') {
    container.innerHTML = `
      <div class="restricted-zone-card">
        <div style="font-size:52px; margin-bottom:12px;">🔒</div>
        <span class="tag tag-red" style="font-size:12px; margin-bottom:8px;">403 Forbidden</span>
        <h2 style="font-size:22px; font-weight:800; color:var(--text-main); margin-top:4px;">
          Administrative Gateway Restricted
        </h2>
        <p style="font-size:13.5px; color:var(--text-muted); max-width:620px; line-height:1.6; margin-top:10px;">
          System root administration, National Data Sovereignty settings (NIC Cloud MeghRaj), and DPDP Act 2023 audit trails are restricted to <strong>Level 4 National Executive Officers</strong>.
        </p>
        <button class="btn btn-primary" style="margin-top:20px;" onclick="switchRole('Officer')">
          Switch to Government Officer
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      
      <!-- API Gateway Health -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:22px;">
        <span class="tag tag-verified">NIC MEGHRAJ CLOUD</span>
        <h3 style="font-size:18px; font-weight:800; color:var(--text-main); margin-top:4px; margin-bottom:14px;">National API Gateway Status</h3>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between;">
            <span>ISRO Bhuvan OGC WMS Layer</span>
            <span class="tag tag-verified">Operational (28ms)</span>
          </div>
          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between;">
            <span>e-Courts NJDG Dispute Sync API</span>
            <span class="tag tag-verified">Operational (42ms)</span>
          </div>
          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between;">
            <span>Survey of India CORS Network</span>
            <span class="tag tag-verified">Operational (18ms)</span>
          </div>
          <div style="background:var(--bg-card-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between;">
            <span>National CollabLand Spatial Engine</span>
            <span class="tag tag-verified">Operational (31ms)</span>
          </div>
        </div>
      </div>

      <!-- DPDP Audit Log -->
      <div style="background:var(--bg-card); border:1px solid var(--border-card); border-radius:16px; padding:22px;">
        <span class="tag tag-blue">DPDP ACT 2023 COMPLIANT</span>
        <h3 style="font-size:18px; font-weight:800; color:var(--text-main); margin-top:4px; margin-bottom:14px;">Immutable Audit Trail</h3>

        <div style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto;">
          ${appState.auditLog.map(l => `
            <div style="background:var(--bg-card-subtle); padding:8px 12px; border-radius:6px; font-size:12px;">
              <span style="color:var(--gov-green); font-weight:700;">[${l.time}]</span> <strong>${l.user}:</strong> ${l.action}
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// =========================================================================
// ROLE COMPARISON MODAL ("FARK SAMJHEIN")
// =========================================================================
function openRoleComparisonModal() {
  const modal = document.getElementById('comparison-modal');
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3800);
}

function logAudit(action) {
  appState.auditLog.unshift({
    time: new Date().toLocaleTimeString(),
    user: ROLES[appState.currentRole]?.name.split(',')[0] || 'System',
    action: action
  });
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

function issueOfficerAdvisory(stateName) {
  const ref = 'DoLR/SEC/2026/ADV-' + Math.floor(1000 + Math.random() * 9000);
  showToast(`DoLR Advisory Notice ${ref} dispatched to Chief Secretaries!`);
  logAudit(`Dispatched DoLR ministerial advisory notice ${ref} for ${stateName || 'lagging states'}`);
}

function exportSynthesisReport() {
  showToast('National Land Governance Synthesis Brief exported (DoLR-2026-SYN.pdf)');
  logAudit('Exported Cabinet National Land Governance Synthesis Brief');
}
