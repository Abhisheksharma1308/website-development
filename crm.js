/* =============================================
   BESTOCITY REALTORS — CRM JS
   Full Lead Management System
   ============================================= */

// ---- SAMPLE DATA ----
let leads = JSON.parse(localStorage.getItem('bestocity_leads') || 'null') || [
  { id: 1,  name: 'Rajesh Sharma',     email: 'rajesh@gmail.com',     phone: '9810XXXXXX', city: 'Delhi',       interest: 'Buy',  property: '3BHK Apartment – Noida',   budget: '₹85L',    source: 'Website',     status: 'qualified', priority: 'high',   date: '2024-06-01', notes: 'Wants possession in 6 months.' },
  { id: 2,  name: 'Priya Mehta',       email: 'priya.m@outlook.com',  phone: '9820XXXXXX', city: 'Gurgaon',     interest: 'Buy',  property: 'Villa – Goa',              budget: '₹1.8Cr',  source: 'Instagram',   status: 'new',       priority: 'high',   date: '2024-06-03', notes: 'NRI client, wants sea-facing.' },
  { id: 3,  name: 'Amit Verma',        email: 'amitv@yahoo.com',      phone: '9831XXXXXX', city: 'Noida',       interest: 'Rent', property: '2BHK Apartment – Sector 18',budget: '₹35K/mo', source: 'Walk-in',     status: 'contacted', priority: 'medium', date: '2024-06-04', notes: 'Looking for immediate possession.' },
  { id: 4,  name: 'Sunita Agarwal',    email: 'sunita@corp.com',      phone: '9842XXXXXX', city: 'Faridabad',   interest: 'Buy',  property: 'Plot – Greater Noida',     budget: '₹55L',    source: 'Google Ads',  status: 'new',       priority: 'medium', date: '2024-06-05', notes: 'Interested in RERA-registered property.' },
  { id: 5,  name: 'Vikram Singh',      email: 'vikram@hotmail.com',   phone: '9853XXXXXX', city: 'Goa',         interest: 'Buy',  property: 'Beachfront Villa – Goa',   budget: '₹3.2Cr',  source: 'Referral',    status: 'closed',    priority: 'high',   date: '2024-06-06', notes: 'Deal closed. Registry pending.' },
  { id: 6,  name: 'Anita Kapoor',      email: 'anita.k@gmail.com',    phone: '9860XXXXXX', city: 'Delhi',       interest: 'Invest',property: 'Commercial Space – Connaught Pl', budget:'₹2.5Cr', source:'Website', status: 'contacted',priority:'high',    date: '2024-06-07', notes: 'Wants ROI analysis first.' },
  { id: 7,  name: 'Rahul Gupta',       email: 'rahul.g@startup.io',   phone: '9871XXXXXX', city: 'Gurgaon',     interest: 'Rent', property: 'Office Space – Cyber City',  budget: '₹1.2L/mo',source: 'LinkedIn',   status: 'qualified', priority: 'medium', date: '2024-06-08', notes: '2000 sq ft needed for 50 employees.' },
  { id: 8,  name: 'Deepa Nair',        email: 'deepa.n@nri.com',      phone: '9882XXXXXX', city: 'Goa',         interest: 'Buy',  property: '3BHK Flat – Panaji',       budget: '₹95L',    source: 'WhatsApp',    status: 'new',       priority: 'low',    date: '2024-06-09', notes: 'NRI – needs legal guidance.' },
  { id: 9,  name: 'Sanjay Tiwari',     email: 'sanjay.t@firm.com',    phone: '9893XXXXXX', city: 'Noida',       interest: 'Buy',  property: '4BHK – Sector 137',        budget: '₹1.4Cr',  source: 'Google Ads',  status: 'lost',      priority: 'low',    date: '2024-06-10', notes: 'Chose competitor, budget mismatch.' },
  { id: 10, name: 'Kavita Joshi',      email: 'kavita@homebuyer.in',  phone: '9904XXXXXX', city: 'Delhi',       interest: 'Buy',  property: '2BHK – Dwarka',            budget: '₹60L',    source: 'Walk-in',     status: 'contacted', priority: 'medium', date: '2024-06-11', notes: 'First-time buyer, needs home loan help.' },
];

let nextId = leads.length ? Math.max(...leads.map(l => l.id)) + 1 : 1;
let currentView = 'dashboard';
let editId = null;

function saveLeads() {
  localStorage.setItem('bestocity_leads', JSON.stringify(leads));
}

// ---- RENDER SIDEBAR NAV ----
function setView(view) {
  currentView = view;
  document.querySelectorAll('.crm-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });
  renderContent();
}

// ---- STATS ----
function getStats() {
  const total     = leads.length;
  const newLeads  = leads.filter(l => l.status === 'new').length;
  const closed    = leads.filter(l => l.status === 'closed').length;
  const qualified = leads.filter(l => l.status === 'qualified').length;
  return { total, newLeads, closed, qualified };
}

// ---- DASHBOARD VIEW ----
function renderDashboard() {
  const stats = getStats();
  const recent = [...leads].sort((a,b) => b.id - a.id).slice(0, 5);
  return `
    <div class="crm-stats-row">
      <div class="crm-stat-card gold-accent">
        <div><div class="crm-stat-num">${stats.total}</div><div class="crm-stat-lbl">Total Leads</div></div>
        <div class="crm-stat-icon">👥</div>
      </div>
      <div class="crm-stat-card blue-accent">
        <div><div class="crm-stat-num">${stats.newLeads}</div><div class="crm-stat-lbl">New Leads</div></div>
        <div class="crm-stat-icon">🆕</div>
      </div>
      <div class="crm-stat-card green-accent">
        <div><div class="crm-stat-num">${stats.qualified}</div><div class="crm-stat-lbl">Qualified</div></div>
        <div class="crm-stat-icon">✅</div>
      </div>
      <div class="crm-stat-card red-accent">
        <div><div class="crm-stat-num">${stats.closed}</div><div class="crm-stat-lbl">Deals Closed</div></div>
        <div class="crm-stat-icon">🏆</div>
      </div>
    </div>
    <div class="crm-grid-2">
      <div class="crm-card">
        <div class="crm-card-header">
          <h3>Recent Leads</h3>
          <button class="btn btn-gold btn-sm" onclick="setView('leads')">View All</button>
        </div>
        <div class="crm-card-body" style="padding:0">
          <table class="leads-table">
            <thead><tr><th>Name</th><th>Interest</th><th>Budget</th><th>Status</th></tr></thead>
            <tbody>
              ${recent.map(l => `
                <tr onclick="openLeadDetail(${l.id})">
                  <td><div class="lead-name">${l.name}</div><div class="lead-email">${l.city}</div></td>
                  <td>${l.interest}</td>
                  <td style="font-weight:600;color:var(--gold)">${l.budget}</td>
                  <td><span class="status-badge status-${l.status}">${l.status}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="crm-card">
        <div class="crm-card-header"><h3>Recent Activity</h3></div>
        <div class="crm-card-body">
          <div class="activity-list">
            ${leads.slice(-6).reverse().map(l => `
              <div class="activity-item">
                <div class="activity-dot act-${l.status === 'new' ? 'new' : l.status === 'closed' ? 'closed' : l.status === 'qualified' ? 'qualified' : 'contact'}"></div>
                <div>
                  <div class="activity-text"><strong>${l.name}</strong> — ${l.status === 'new' ? 'Added as new lead' : l.status === 'closed' ? 'Deal closed 🎉' : l.status === 'qualified' ? 'Qualified lead' : 'Status updated to ' + l.status}</div>
                  <div class="activity-time">${l.date}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="crm-card">
      <div class="crm-card-header"><h3>Lead Source Breakdown</h3></div>
      <div class="crm-card-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem">
          ${Object.entries(leads.reduce((acc, l) => { acc[l.source] = (acc[l.source]||0)+1; return acc; }, {}))
            .map(([src, count]) => `
              <div style="text-align:center;padding:1rem;background:var(--cream);border-radius:8px;border:1px solid rgba(11,27,43,0.08)">
                <div style="font-size:1.6rem;margin-bottom:0.3rem">${src === 'Website' ? '🌐' : src === 'Instagram' ? '📸' : src === 'Google Ads' ? '🔍' : src === 'Referral' ? '🤝' : src === 'WhatsApp' ? '💬' : src === 'LinkedIn' ? '💼' : '🚪'}</div>
                <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:var(--navy)">${count}</div>
                <div style="font-size:0.75rem;color:#5a7080;text-transform:uppercase;letter-spacing:0.06em">${src}</div>
              </div>`).join('')}
        </div>
      </div>
    </div>`;
}

// ---- LEADS VIEW ----
let searchQuery = '';
let filterStatus = '';
function renderLeads() {
  let filtered = leads.filter(l => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.property.toLowerCase().includes(q);
    const matchStatus = !filterStatus || l.status === filterStatus;
    return matchSearch && matchStatus;
  });
  return `
    <div style="display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap;align-items:center">
      <input class="crm-search" style="flex:1;min-width:200px" placeholder="🔍  Search leads by name, city, property…" id="leadsSearch" value="${searchQuery}" oninput="searchQuery=this.value;renderContent()">
      <select class="crm-search" style="width:160px" onchange="filterStatus=this.value;renderContent()">
        <option value="">All Status</option>
        ${['new','contacted','qualified','closed','lost'].map(s => `<option value="${s}" ${filterStatus===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
      <button class="btn btn-gold btn-sm" onclick="openAddModal()">＋ Add Lead</button>
    </div>
    <div class="crm-card">
      <div class="crm-card-body" style="padding:0;overflow-x:auto">
        <table class="leads-table">
          <thead><tr><th>#</th><th>Name</th><th>Contact</th><th>City</th><th>Interest</th><th>Property</th><th>Budget</th><th>Source</th><th>Status</th><th>Priority</th><th>Actions</th></tr></thead>
          <tbody>
            ${filtered.length === 0 ? `<tr><td colspan="11" style="text-align:center;padding:2rem;color:#5a7080">No leads found.</td></tr>` :
            filtered.map(l => `
              <tr>
                <td style="color:#5a7080;font-size:0.8rem">${l.id}</td>
                <td><div class="lead-name">${l.name}</div><div class="lead-email">${l.date}</div></td>
                <td><div class="lead-email">${l.email}</div><div class="lead-email">${l.phone}</div></td>
                <td>${l.city}</td>
                <td>${l.interest}</td>
                <td style="font-size:0.82rem;max-width:160px">${l.property}</td>
                <td style="font-weight:600;color:var(--gold)">${l.budget}</td>
                <td style="font-size:0.82rem">${l.source}</td>
                <td><span class="status-badge status-${l.status}">${l.status}</span></td>
                <td><span class="priority-${l.priority}">${l.priority}</span></td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn view" title="View" onclick="openLeadDetail(${l.id})">👁</button>
                    <button class="action-btn edit" title="Edit"  onclick="openEditModal(${l.id})">✏️</button>
                    <button class="action-btn del"  title="Delete" onclick="deleteLead(${l.id})">🗑</button>
                  </div>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div style="margin-top:1rem;font-size:0.82rem;color:#5a7080">Showing ${filtered.length} of ${leads.length} leads</div>`;
}

// ---- PIPELINE VIEW ----
function renderPipeline() {
  const stages = [
    { key:'new',       label:'New Leads',  cls:'new-h'    },
    { key:'contacted', label:'Contacted',  cls:'cont-h'   },
    { key:'qualified', label:'Qualified',  cls:'qual-h'   },
    { key:'closed',    label:'Closed',     cls:'closed-h' },
    { key:'lost',      label:'Lost',       cls:'prop-h'   },
  ];
  return `
    <div class="crm-card" style="margin-bottom:1.5rem">
      <div class="crm-card-header"><h3>Deal Pipeline</h3><button class="btn btn-gold btn-sm" onclick="openAddModal()">＋ Add Lead</button></div>
      <div class="crm-card-body">
        <div class="pipeline-cols">
          ${stages.map(s => `
            <div class="pipeline-col">
              <div class="pipeline-col-header ${s.cls}">${s.label} (${leads.filter(l=>l.status===s.key).length})</div>
              <div class="pipeline-items">
                ${leads.filter(l=>l.status===s.key).map(l => `
                  <div class="pipeline-item" onclick="openLeadDetail(${l.id})">
                    <div class="pipeline-item-name">${l.name}</div>
                    <div style="font-size:0.75rem;color:#5a7080;margin-bottom:0.2rem">${l.property.substring(0,30)}…</div>
                    <div class="pipeline-item-val">${l.budget}</div>
                  </div>`).join('') || '<div style="font-size:0.8rem;color:#aaa;padding:0.5rem">Empty</div>'}
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

// ---- REPORTS VIEW ----
function renderReports() {
  const closed = leads.filter(l=>l.status==='closed').length;
  const total  = leads.length;
  const conv   = total ? ((closed/total)*100).toFixed(1) : 0;
  const byCity = leads.reduce((a,l)=>{ a[l.city]=(a[l.city]||0)+1; return a; },{});
  const topCity = Object.entries(byCity).sort((a,b)=>b[1]-a[1]);
  return `
    <div class="crm-stats-row" style="margin-bottom:1.5rem">
      <div class="crm-stat-card gold-accent"><div><div class="crm-stat-num">${total}</div><div class="crm-stat-lbl">Total Leads</div></div><div class="crm-stat-icon">📊</div></div>
      <div class="crm-stat-card green-accent"><div><div class="crm-stat-num">${closed}</div><div class="crm-stat-lbl">Closed Deals</div></div><div class="crm-stat-icon">🏆</div></div>
      <div class="crm-stat-card blue-accent"><div><div class="crm-stat-num">${conv}%</div><div class="crm-stat-lbl">Conversion Rate</div></div><div class="crm-stat-icon">📈</div></div>
      <div class="crm-stat-card red-accent"><div><div class="crm-stat-num">${leads.filter(l=>l.priority==='high').length}</div><div class="crm-stat-lbl">Hot Leads</div></div><div class="crm-stat-icon">🔥</div></div>
    </div>
    <div class="crm-grid-2">
      <div class="crm-card">
        <div class="crm-card-header"><h3>Leads by City</h3></div>
        <div class="crm-card-body">
          ${topCity.map(([city, count]) => `
            <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem">
              <div style="font-size:0.88rem;width:90px;color:var(--navy);font-weight:500">${city}</div>
              <div style="flex:1;height:10px;background:rgba(11,27,43,0.07);border-radius:10px;overflow:hidden">
                <div style="height:100%;width:${(count/total*100).toFixed(0)}%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:10px"></div>
              </div>
              <div style="font-size:0.82rem;color:#5a7080;width:24px;text-align:right">${count}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="crm-card">
        <div class="crm-card-header"><h3>Status Breakdown</h3></div>
        <div class="crm-card-body">
          ${['new','contacted','qualified','closed','lost'].map(s => {
            const cnt = leads.filter(l=>l.status===s).length;
            return `
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.7rem">
                <span class="status-badge status-${s}">${s}</span>
                <div style="flex:1;height:8px;background:rgba(11,27,43,0.07);border-radius:10px;margin:0 1rem;overflow:hidden">
                  <div style="height:100%;width:${total?(cnt/total*100).toFixed(0):0}%;background:var(--gold);border-radius:10px"></div>
                </div>
                <span style="font-size:0.88rem;font-weight:600">${cnt}</span>
              </div>`;}).join('')}
        </div>
      </div>
    </div>`;
}

// ---- SETTINGS VIEW ----
function renderSettings() {
  return `
    <div class="crm-card" style="max-width:600px">
      <div class="crm-card-header"><h3>CRM Settings</h3></div>
      <div class="crm-card-body">
        <div class="form-group">
          <label>Company Name</label>
          <input type="text" class="crm-search" style="width:100%" value="Bestocity Realtors" readonly>
        </div>
        <div class="form-group">
          <label>Contact Email</label>
          <input type="email" class="crm-search" style="width:100%" value="info@bestocity.com">
        </div>
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" class="crm-search" style="width:100%" value="+91 98XXXXXXXX">
        </div>
        <div class="form-group">
          <label>Operating Cities</label>
          <input type="text" class="crm-search" style="width:100%" value="Delhi NCR, Goa" readonly>
        </div>
        <div class="form-group">
          <label>Export Leads</label>
          <button class="btn btn-navy btn-sm" onclick="exportCSV()">⬇ Download CSV</button>
        </div>
        <div class="form-group">
          <label>Reset Data</label>
          <button class="btn btn-sm" style="background:#fce4ec;color:#e53935;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer" onclick="if(confirm('Reset all leads to sample data?'))resetData()">⚠ Reset to Sample Data</button>
        </div>
      </div>
    </div>`;
}

// ---- RENDER CONTENT ----
function renderContent() {
  const main = document.getElementById('crmContent');
  const title = document.getElementById('pageTitle');
  const views = { dashboard: ['Dashboard', renderDashboard], leads: ['All Leads', renderLeads], pipeline: ['Pipeline', renderPipeline], reports: ['Reports', renderReports], settings: ['Settings', renderSettings] };
  if (views[currentView]) {
    title.textContent = views[currentView][0];
    main.innerHTML = views[currentView][1]();
  }
}

// ---- MODAL: ADD / EDIT LEAD ----
function openAddModal()  { editId = null; openModal(); }
function openEditModal(id) { editId = id; openModal(); }

function openModal() {
  const l = editId ? leads.find(x => x.id === editId) : null;
  document.getElementById('modalOverlay').classList.add('show');
  document.getElementById('modalTitle').textContent = l ? 'Edit Lead' : 'Add New Lead';
  const form = document.getElementById('leadForm');
  form.innerHTML = `
    <div class="form-row">
      <div class="form-group"><label>Full Name *</label><input name="name" required value="${l?.name||''}"></div>
      <div class="form-group"><label>Phone *</label><input name="phone" required value="${l?.phone||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Email</label><input name="email" type="email" value="${l?.email||''}"></div>
      <div class="form-group"><label>City</label><input name="city" value="${l?.city||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Interest</label>
        <select name="interest">${['Buy','Rent','Invest','Sell'].map(x=>`<option ${l?.interest===x?'selected':''}>${x}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Budget</label><input name="budget" value="${l?.budget||''}"></div>
    </div>
    <div class="form-group"><label>Property Interested In</label><input name="property" value="${l?.property||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Source</label>
        <select name="source">${['Website','Instagram','Google Ads','Referral','WhatsApp','Walk-in','LinkedIn','Other'].map(x=>`<option ${l?.source===x?'selected':''}>${x}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Status</label>
        <select name="status">${['new','contacted','qualified','closed','lost'].map(x=>`<option ${l?.status===x?'selected':''}>${x}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Priority</label>
        <select name="priority">${['high','medium','low'].map(x=>`<option ${l?.priority===x?'selected':''}>${x}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Date</label><input name="date" type="date" value="${l?.date||new Date().toISOString().split('T')[0]}"></div>
    </div>
    <div class="form-group"><label>Notes</label><textarea name="notes" rows="3">${l?.notes||''}</textarea></div>
    <div style="display:flex;gap:1rem;justify-content:flex-end;margin-top:1rem">
      <button type="button" class="btn btn-outline" style="color:var(--navy);border-color:rgba(11,27,43,0.2)" onclick="closeModal()">Cancel</button>
      <button type="submit" class="btn btn-gold">${l ? 'Update Lead' : 'Add Lead'}</button>
    </div>`;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.getElementById('detailOverlay').classList.remove('show');
}

document.addEventListener('submit', function(e) {
  if (e.target.id === 'leadForm') {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if (editId) {
      const idx = leads.findIndex(l => l.id === editId);
      if (idx !== -1) leads[idx] = { ...leads[idx], ...data };
    } else {
      leads.push({ id: nextId++, ...data });
    }
    saveLeads();
    closeModal();
    renderContent();
  }
});

// ---- LEAD DETAIL ----
function openLeadDetail(id) {
  const l = leads.find(x => x.id === id);
  if (!l) return;
  document.getElementById('detailOverlay').classList.add('show');
  document.getElementById('detailContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
      <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold2));display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.4rem;font-weight:700;color:var(--navy)">${l.name.charAt(0)}</div>
      <div><div style="font-family:var(--font-display);font-size:1.3rem">${l.name}</div><span class="status-badge status-${l.status}">${l.status}</span> <span class="priority-${l.priority}">${l.priority} priority</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.2rem">
      ${[['📞 Phone', l.phone], ['📧 Email', l.email], ['📍 City', l.city], ['💰 Budget', l.budget], ['🏠 Interest', l.interest], ['📣 Source', l.source], ['📅 Date', l.date], ['🏡 Property', l.property]].map(([lbl,val]) => `
        <div style="padding:0.8rem;background:var(--cream);border-radius:8px">
          <div style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--gold);margin-bottom:0.2rem">${lbl}</div>
          <div style="font-size:0.88rem;color:var(--navy)">${val||'—'}</div>
        </div>`).join('')}
    </div>
    <div style="padding:1rem;background:var(--cream);border-radius:8px;margin-bottom:1.5rem">
      <div style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--gold);margin-bottom:0.4rem">📝 Notes</div>
      <div style="font-size:0.9rem;color:#4a6070;line-height:1.7">${l.notes||'No notes added.'}</div>
    </div>
    <div style="display:flex;gap:0.8rem;justify-content:flex-end">
      <button class="btn btn-outline btn-sm" style="color:var(--navy);border-color:rgba(11,27,43,0.2)" onclick="closeModal()">Close</button>
      <button class="btn btn-navy btn-sm" onclick="closeModal();openEditModal(${l.id})">✏️ Edit</button>
      <a href="tel:${l.phone}" class="btn btn-gold btn-sm">📞 Call</a>
    </div>`;
}

// ---- DELETE LEAD ----
function deleteLead(id) {
  if (confirm('Delete this lead permanently?')) {
    leads = leads.filter(l => l.id !== id);
    saveLeads();
    renderContent();
  }
}

// ---- EXPORT CSV ----
function exportCSV() {
  const headers = ['ID','Name','Email','Phone','City','Interest','Property','Budget','Source','Status','Priority','Date','Notes'];
  const rows = leads.map(l => [l.id,l.name,l.email,l.phone,l.city,l.interest,l.property,l.budget,l.source,l.status,l.priority,l.date,`"${(l.notes||'').replace(/"/g,'""')}"`]);
  const csv = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'bestocity_leads.csv';
  a.click();
}

// ---- RESET DATA ----
function resetData() {
  localStorage.removeItem('bestocity_leads');
  location.reload();
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderContent();

  // Sidebar nav
  document.querySelectorAll('.crm-nav-item').forEach(item => {
    item.addEventListener('click', () => setView(item.dataset.view));
  });

  // Overlay close on outside click
  ['modalOverlay','detailOverlay'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  });

  // Mobile sidebar toggle
  const toggle = document.getElementById('sidebarToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.crm-sidebar').classList.toggle('open');
    });
  }
});
