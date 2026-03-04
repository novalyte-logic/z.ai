const records = [
  {
    clinic: 'Prime Male Wellness Institute',
    cityTier: 'tier1',
    focus: 'hormone',
    address: '1847 Broadway, New York, NY 10023',
    phone: '(212) 555-0143',
    adEvidence: [
      { label: 'Google Ads — Active Search Campaigns', type: 'good' },
      { label: 'Meta Ad Library — Active Creative', type: 'good' },
      { label: 'Display retargeting suspected', type: 'warn' }
    ],
    decisionMakers: [
      { name: 'Dr. Ethan Ross', role: 'Clinic Owner', contact: 'https://www.linkedin.com' },
      { name: 'Melissa Grant', role: 'Clinic Director', contact: 'mailto:director@primemalewellness.com' }
    ],
    bestContact: '1) Director email with ad-specific hook, 2) owner LinkedIn follow-up in 48h',
    confidence: 86,
    scoreFactors: { adBudgetSignal: 30, affluence: 24, serviceFit: 22, contactQuality: 18 }
  },
  {
    clinic: 'Summit Men\'s Vitality',
    cityTier: 'tier1',
    focus: 'sexual-health',
    address: '2400 Pacific Ave, Dallas, TX 75201',
    phone: '(214) 555-0188',
    adEvidence: [
      { label: 'Google Ads — Active', type: 'good' },
      { label: 'Meta retargeting audience overlap', type: 'warn' }
    ],
    decisionMakers: [
      { name: 'Carlos Bennett', role: 'Managing Partner', contact: 'mailto:cbennett@summitvitality.com' },
      { name: 'Jana Hill', role: 'Clinic Manager', contact: 'tel:+12145550188' }
    ],
    bestContact: 'Call manager for buying process, then partner email with market benchmarks',
    confidence: 78,
    scoreFactors: { adBudgetSignal: 27, affluence: 23, serviceFit: 23, contactQuality: 15 }
  },
  {
    clinic: 'Westlake Men\'s Performance Clinic',
    cityTier: 'tier2',
    focus: 'weight-loss',
    address: '2999 N Loop W, Houston, TX 77008',
    phone: '(713) 555-0122',
    adEvidence: [
      { label: 'Meta Ads — Active', type: 'good' },
      { label: 'Google ad activity unverified', type: 'warn' }
    ],
    decisionMakers: [
      { name: 'Lauren Cho', role: 'Clinic Director', contact: 'mailto:lcho@westlakemensclinic.com' },
      { name: 'Peter Sloan', role: 'Owner', contact: 'https://www.linkedin.com' }
    ],
    bestContact: 'Director email first; owner warm intro on LinkedIn if no response',
    confidence: 73,
    scoreFactors: { adBudgetSignal: 20, affluence: 20, serviceFit: 19, contactQuality: 14 }
  },
  {
    clinic: 'Golden Gate Men\'s Health Studio',
    cityTier: 'tier1',
    focus: 'hormone',
    address: '880 Market St, San Francisco, CA 94102',
    phone: '(415) 555-0109',
    adEvidence: [
      { label: 'Google Ads + YouTube pre-roll', type: 'good' },
      { label: 'Meta Ad Library — Active creative set', type: 'good' }
    ],
    decisionMakers: [
      { name: 'Nolan Pierce', role: 'Founder', contact: 'https://www.linkedin.com' },
      { name: 'Riley Kim', role: 'Practice Administrator', contact: 'mailto:admin@ggmenshealth.com' }
    ],
    bestContact: 'Admin email for meeting + founder LinkedIn for strategic angle',
    confidence: 90,
    scoreFactors: { adBudgetSignal: 31, affluence: 25, serviceFit: 24, contactQuality: 19 }
  },
  {
    clinic: 'Beacon Men\'s Endocrine Health',
    cityTier: 'tier2',
    focus: 'hormone',
    address: '120 Bellevue Way NE, Bellevue, WA 98004',
    phone: '(425) 555-0113',
    adEvidence: [
      { label: 'Google search campaign verified', type: 'good' },
      { label: 'Meta active ads verified', type: 'good' }
    ],
    decisionMakers: [
      { name: 'Adam Voss', role: 'Co-Owner', contact: 'mailto:adam@beaconmensendo.com' },
      { name: 'Heather Lin', role: 'Clinic Manager', contact: 'tel:+14255550113' }
    ],
    bestContact: 'Owner email with competitor ad examples, manager follow-up call',
    confidence: 84,
    scoreFactors: { adBudgetSignal: 28, affluence: 22, serviceFit: 21, contactQuality: 17 }
  }
];

const ui = {
  body: document.getElementById('clinicTableBody'),
  personTemplate: document.getElementById('personTemplate'),
  cityTier: document.getElementById('cityTier'),
  focus: document.getElementById('focusFilter'),
  adPlatform: document.getElementById('adPlatformFilter'),
  minScore: document.getElementById('minScore'),
  minConfidence: document.getElementById('minConfidence'),
  scanBtn: document.getElementById('scanBtn'),
  exportBtn: document.getElementById('exportBtn'),
  kpiClinics: document.getElementById('kpiClinics'),
  kpiAd: document.getElementById('kpiAd'),
  kpiDm: document.getElementById('kpiDm'),
  kpiScore: document.getElementById('kpiScore'),
  kpiConfidence: document.getElementById('kpiConfidence')
};

function computeLeadScore(factors) {
  return Math.min(100, Object.values(factors).reduce((sum, value) => sum + value, 0));
}

function hasAds(record, mode) {
  const text = record.adEvidence.map((entry) => entry.label.toLowerCase()).join(' ');
  if (mode === 'google-meta') return text.includes('google') && text.includes('meta');
  if (mode === 'google') return text.includes('google');
  if (mode === 'meta') return text.includes('meta');
  return true;
}

function renderBadges(items) {
  const wrap = document.createElement('div');
  wrap.className = 'badges';
  items.forEach((item) => {
    const tag = document.createElement('span');
    tag.className = `badge ${item.type}`;
    tag.textContent = item.label;
    wrap.appendChild(tag);
  });
  return wrap;
}

function renderPeople(people) {
  const host = document.createElement('div');
  host.className = 'people';
  people.forEach((person) => {
    const node = ui.personTemplate.content.cloneNode(true);
    node.querySelector('.name').textContent = person.name;
    node.querySelector('.role').textContent = person.role;
    const contact = node.querySelector('.contact');
    contact.href = person.contact;
    contact.textContent = person.contact.startsWith('mailto:')
      ? 'Email'
      : person.contact.startsWith('tel:')
        ? 'Call'
        : 'LinkedIn';
    host.appendChild(node);
  });
  return host;
}

function factorSummary(factors) {
  return `Ad ${factors.adBudgetSignal} • Affluence ${factors.affluence} • Fit ${factors.serviceFit} • Contact ${factors.contactQuality}`;
}

function renderRows(filtered) {
  ui.body.innerHTML = '';

  filtered.forEach((record) => {
    const score = computeLeadScore(record.scoreFactors);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${record.clinic}</strong><span class="small">${record.focus}</span></td>
      <td>${record.address}<span class="small">${record.phone}</span></td>
      <td></td>
      <td></td>
      <td>${record.bestContact}</td>
      <td>${factorSummary(record.scoreFactors)}</td>
      <td><span class="score ${score >= 75 ? 'good' : 'warn'}">${score}</span></td>
      <td>${record.confidence}%</td>
    `;
    row.children[2].appendChild(renderBadges(record.adEvidence));
    row.children[3].appendChild(renderPeople(record.decisionMakers));
    ui.body.appendChild(row);
  });
}

function renderKpis(filtered) {
  const adVerified = filtered.filter((record) => record.adEvidence.some((entry) => entry.type === 'good')).length;
  const dmCount = filtered.reduce((sum, record) => sum + record.decisionMakers.length, 0);
  const avgScore = filtered.length
    ? Math.round(filtered.reduce((sum, record) => sum + computeLeadScore(record.scoreFactors), 0) / filtered.length)
    : 0;
  const avgConfidence = filtered.length
    ? Math.round(filtered.reduce((sum, record) => sum + record.confidence, 0) / filtered.length)
    : 0;

  ui.kpiClinics.textContent = filtered.length;
  ui.kpiAd.textContent = adVerified;
  ui.kpiDm.textContent = dmCount;
  ui.kpiScore.textContent = avgScore;
  ui.kpiConfidence.textContent = `${avgConfidence}%`;
}

function applyFilters() {
  const minScore = Number(ui.minScore.value) || 0;
  const minConfidence = Number(ui.minConfidence.value) || 0;

  const filtered = records.filter((record) => {
    const score = computeLeadScore(record.scoreFactors);
    const tierMatch = ui.cityTier.value === 'all' ? true : record.cityTier === ui.cityTier.value;
    const focusMatch = ui.focus.value === 'all' ? true : record.focus === ui.focus.value;
    const adMatch = hasAds(record, ui.adPlatform.value);
    const scoreMatch = score >= minScore;
    const confidenceMatch = record.confidence >= minConfidence;

    return tierMatch && focusMatch && adMatch && scoreMatch && confidenceMatch;
  });

  renderRows(filtered);
  renderKpis(filtered);
}

function toCsvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function exportCsv() {
  const rows = [[
    'Clinic', 'Address', 'Phone', 'Ad Evidence', 'Decision Makers', 'Best Contact Strategy',
    'Score Breakdown', 'Lead Score', 'Confidence'
  ]];

  Array.from(ui.body.querySelectorAll('tr')).forEach((tr) => {
    const tds = tr.querySelectorAll('td');
    const clinicName = tds[0].querySelector('strong')?.innerText.trim() ?? '';
    const address = tds[1].childNodes[0]?.textContent.trim() ?? '';
    const phone = tds[1].querySelector('.small')?.innerText.trim() ?? '';
    rows.push([
      clinicName,
      address,
      phone,
      tds[2].innerText.replace(/\n/g, '; ').trim(),
      tds[3].innerText.replace(/\n/g, '; ').trim(),
      tds[4].innerText.trim(),
      tds[5].innerText.trim(),
      tds[6].innerText.trim(),
      tds[7].innerText.trim()
    ]);
  });

  const csv = rows.map((row) => row.map(toCsvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'atlas-abm-intelligence.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

ui.scanBtn.addEventListener('click', applyFilters);
ui.exportBtn.addEventListener('click', exportCsv);
ui.cityTier.addEventListener('change', applyFilters);
ui.focus.addEventListener('change', applyFilters);
ui.adPlatform.addEventListener('change', applyFilters);
ui.minScore.addEventListener('input', applyFilters);
ui.minConfidence.addEventListener('input', applyFilters);

applyFilters();
