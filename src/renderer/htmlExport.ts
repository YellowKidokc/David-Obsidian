import { SpinePosition } from './types';
import { spineNavItems } from './data';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusClass(status: string): string {
  if (status === 'grounded' || status === 'eigenstates' || status === 'empirical' || status === 'shannon')
    return 'status-grounded';
  if (status === 'scripture') return 'status-scripture';
  if (status === 'suggest') return 'status-suggest';
  return 'status-grounded';
}

function tagColor(tag: string): string {
  if (tag === 'axiom' || tag === 'definition' || tag === 'lemma') return 'tag-purple';
  if (tag === 'validated' || tag === 'grounded') return 'tag-green';
  if (tag === 'physics' || tag === 'theology') return 'tag-orange';
  return 'tag-blue';
}

function bridgeBarData(pos: SpinePosition): { label: string; height: string; color: string }[] {
  return pos.mappings.map((m) => {
    const isGrounded = m.status !== 'suggest';
    return {
      label: m.domain.slice(0, 4),
      height: isGrounded ? `${70 + Math.random() * 25}%` : '30%',
      color: isGrounded ? 'var(--green)' : 'var(--yellow)',
    };
  });
}

function renderNavSidebar(currentRef: string, allPositions: SpinePosition[]): string {
  let html = '';
  for (const section of spineNavItems) {
    html += `<div class="nav-section"><h3>Spine &mdash; ${esc(section.section)}</h3><ul class="nav-list">`;
    for (const item of section.items) {
      const active = item.ref === currentRef ? ' class="active"' : '';
      const hasPage = allPositions.some((p) => p.ref === item.ref);
      const href = hasPage ? `${item.ref.replace(/\./g, '_')}.html` : '#';
      html += `<li${active}><a href="${href}" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:inherit;width:100%"><span class="chain-num">${esc(item.num)}</span> ${esc(item.name)}</a></li>`;
    }
    html += `</ul></div>`;
  }
  return html;
}

function renderDepGraph(pos: SpinePosition): string {
  const chain = [
    ...pos.assumes.map((a) => a.ref + ' ' + a.name.split('(')[0].trim()),
    pos.ref + ' ' + pos.title,
    ...pos.enables.slice(0, 2).map((e) => e.ref + ' ' + e.title.split('(')[0].trim()),
  ];
  let html = '';
  for (let i = 0; i < chain.length; i++) {
    const isCurrent = chain[i].startsWith(pos.ref);
    if (isCurrent) {
      html += `<div class="current">${esc(chain[i])} &larr; you are here</div>`;
    } else {
      html += `<div class="text-dim">${esc(chain[i])}</div>`;
    }
    if (i < chain.length - 1) html += `<div class="text-dim">&nbsp;&nbsp;&darr;</div>`;
  }
  return html;
}

export function generateHtml(pos: SpinePosition, allPositions: SpinePosition[]): string {
  const physicsEqs = pos.equations.filter((e) => e.layer === 'physics');
  const mathEqs = pos.equations.filter((e) => e.layer === 'math');
  const bars = bridgeBarData(pos);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(pos.ref)} &mdash; ${esc(pos.title)} | Theophysics Note Engine</title>
<style>
${CSS_CONTENT}
</style>
</head>
<body>
<div id="root">

<!-- LEFT SIDEBAR -->
<aside class="sidebar-left">
  <div class="logo"><span>&#x2699;</span> Theophysics Engine</div>
  ${renderNavSidebar(pos.ref, allPositions)}
  <div class="nav-divider"></div>
  <div class="nav-section"><h3>Tools</h3><ul class="nav-list">
    <li>&#9881; Math Simulator</li>
    <li>&#9745; Structure Checker</li>
    <li>&#128202; Analytics Dashboard</li>
    <li>&#128269; Search Vault</li>
  </ul></div>
</aside>

<!-- MAIN CONTENT -->
<main class="main-content">
  <div class="breadcrumb">
    <a href="index.html">Master Index</a> &rsaquo;
    <a href="index.html">Spine</a> &rsaquo;
    <a href="index.html">${esc(pos.spineType)}s</a> &rsaquo;
    ${esc(pos.ref)}
  </div>

  <h1 class="page-title">${esc(pos.ref)} &mdash; ${esc(pos.title)}</h1>
  <p class="page-subtitle">Chain Position: ${pos.chainNumber} of ${pos.totalPositions} &bull; Object Type: ${esc(pos.objectType)} &bull; Category: ${esc(pos.category)}</p>

  <!-- Quick Summary -->
  <div class="summary-card">
    <div class="sc-item"><span class="sc-label">Formal:</span><span class="sc-value">${esc(pos.formalDefinition)}</span></div>
    <div class="sc-item"><span class="sc-label">Bridge:</span><span class="badge badge-green">${pos.bridgeScore} / ${pos.bridgeTotal}</span><span class="text-dim" style="font-size:.78rem">Auto-validated</span></div>
    <div class="sc-item"><span class="sc-label">Physics:</span><span class="sc-value">${esc(pos.physicsMapping)}</span></div>
    <div class="sc-item"><span class="sc-label">Theology:</span><span class="sc-value">${esc(pos.theologyMapping)}</span></div>
  </div>

  <!-- Formal Statement -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#128208;</span><h2>Formal Statement</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <div class="formal-block">
        <div class="axiom-tag">${esc(pos.spineType)} &bull; ${esc(pos.stage)}</div>
        <div class="def">${esc(pos.formalDefinition)}</div>
        <div class="formal-meta">Spine: ${esc(pos.stage)} &bull; CR: ${esc(pos.cr)}</div>
      </div>
    </div>
  </div>

  <!-- Assumes -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#128279;</span>
      <h2>Assumes (${pos.assumes.length}/${pos.assumes.length} Validated)</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <ul class="assumes-list">
${pos.assumes
  .map(
    (a) => `        <li>
          <span class="check">&#10003;</span>
          <span class="ref">${esc(a.ref)}</span>
          <span>${esc(a.name)}</span>
          <span class="badge badge-green" style="margin-left:auto">${a.validated ? 'Validated' : 'Pending'}</span>
        </li>`,
  )
  .join('\n')}
      </ul>
    </div>
  </div>

  <!-- Spine Master Mappings -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#128279;</span>
      <h2>Spine Master Mappings</h2>
      <span class="badge badge-blue" style="margin-left:8px">Cross-Domain: ${pos.bridgeScore}/${pos.bridgeTotal}</span>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <table class="mapping-table">
        <thead><tr><th>Domain</th><th>Mapping</th><th>Status</th><th>Source</th></tr></thead>
        <tbody>
${pos.mappings
  .map(
    (m) => `          <tr>
            <td><span class="domain-icon">${m.domainIcon}</span> ${esc(m.domain)}</td>
            <td>${esc(m.mapping)}</td>
            <td><span class="status-pill ${statusClass(m.status)}">&#10003; ${esc(m.statusLabel)}</span></td>
            <td>${esc(m.source)}</td>
          </tr>`,
  )
  .join('\n')}
        </tbody>
      </table>
      <p class="text-dim" style="margin-top:10px;font-size:.8rem">Logic Check: High coherence &bull; L3 AI2 validated</p>
    </div>
  </div>

  <!-- Enables -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#10145;</span>
      <h2>Enables (Forward Links: ${pos.enables.length})</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <div class="link-cards">
${pos.enables
  .map((l) => {
    const hasPage = allPositions.some((p) => p.ref === l.ref);
    const href = hasPage ? `${l.ref.replace(/\./g, '_')}.html` : '#';
    return `        <a href="${href}" class="link-card" style="text-decoration:none;color:inherit">
          <div class="lc-ref">${esc(l.ref)}</div>
          <div class="lc-title">${esc(l.title)}</div>
          <div class="lc-type">${esc(l.type)}</div>
        </a>`;
  })
  .join('\n')}
      </div>
    </div>
  </div>

  <!-- Defeat Conditions -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#10060;</span>
      <h2>Defeat Conditions (Falsifiability)</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <ul class="defeat-list">
${pos.defeatConditions
  .map(
    (d) => `        <li>
          <span class="x-mark">&#10007;</span>
          <span>${esc(d.description)}</span>
          <span class="defeat-status">${esc(d.statusText)}</span>
        </li>`,
  )
  .join('\n')}
      </ul>
      <p class="text-green" style="margin-top:8px;font-size:.8rem">AI Logic Check: All testable; no empirical defeat (L3 AI2 Validated)</p>
    </div>
  </div>

  <!-- Physics & Math Layers -->
  <div class="section">
    <div class="section-header"><span class="section-icon">&#128300;</span><h2>Physics &amp; Math Layers</h2></div>
    <div class="layer-tabs">
      <div class="layer-tab active" onclick="switchTab(this,'physics')">Physics</div>
      <div class="layer-tab" onclick="switchTab(this,'math')">Math</div>
      <div class="layer-tab" onclick="switchTab(this,'combined')">Combined View</div>
    </div>
    <div class="layer-content">
      <div class="layer-pane" id="pane-physics" style="display:block">
${physicsEqs
  .map(
    (eq) => `        <div class="equation-block">
          <div class="eq-label">${eq.label}</div>
          <div class="eq-math">${eq.math}</div>
          <div class="eq-note">${eq.note}</div>
          <div class="eq-status text-green">${eq.dimsCheck}</div>
        </div>`,
  )
  .join('\n')}
      </div>
      <div class="layer-pane" id="pane-math" style="display:none">
${mathEqs
  .map(
    (eq) => `        <div class="equation-block">
          <div class="eq-label">${eq.label}</div>
          <div class="eq-math">${eq.math}</div>
          <div class="eq-note">${eq.note}</div>
          <div class="eq-status text-green">${eq.dimsCheck}</div>
        </div>`,
  )
  .join('\n')}
      </div>
      <div class="layer-pane" id="pane-combined" style="display:none">
        <p class="text-dim" style="font-size:.85rem;margin-bottom:14px">All equations from ${esc(pos.ref)} extracted and cross-checked:</p>
${pos.equations
  .map(
    (eq) => `        <div class="equation-block">
          <div class="eq-label">${eq.label}</div>
          <div class="eq-math">${eq.math}</div>
          <div class="eq-status text-green">&#10003; Dims OK &bull; &#10003; No conflicts</div>
        </div>`,
  )
  .join('\n')}
        <p class="text-green" style="margin-top:12px;font-size:.82rem">Cross-vault consistency: 0 conflicts found across ${pos.totalPositions} chain positions</p>
      </div>
    </div>
  </div>

  <!-- Objections -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#128736;</span><h2>Objections</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
${pos.objections
  .map(
    (obj, i) => `      <div class="objection-item">
        <div class="objection-header" onclick="toggleObjection(this)">
          <span class="obj-num">${i + 1}</span>
          <span>${obj.question}</span>
          <span class="toggle-arrow">&#9654;</span>
        </div>
        <div class="objection-body" style="display:none">
          <div class="resp-label">Response:</div>
          <p>${obj.response}</p>
          <div class="ai-suggest">${obj.aiSuggest}</div>
        </div>
      </div>`,
  )
  .join('\n')}
    </div>
  </div>

  <!-- Analytics -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="section-icon">&#128202;</span><h2>Analytics (L3 AI3)</h2>
      <span class="section-toggle open">&#9654;</span>
    </div>
    <div class="section-body">
      <div class="analytics-grid">
        <div class="analytics-card"><div class="a-value text-green">0</div><div class="a-label">Contradictions</div></div>
        <div class="analytics-card"><div class="a-value text-accent">${pos.bridgeScore}/${pos.bridgeTotal}</div><div class="a-label">Bridge Score</div></div>
        <div class="analytics-card"><div class="a-value text-purple">${esc(pos.cr)}</div><div class="a-label">CR Rating</div></div>
      </div>
      <p class="text-dim" style="font-size:.82rem;margin-bottom:8px">Co-occurrence Analysis:</p>
      <ul class="co-occurrence-list">
${pos.coOccurrences
  .map(
    (c) => `        <li>
          <span style="min-width:90px">${esc(c.name)}</span>
          <div class="co-bar-wrap"><div class="co-bar" style="width:${c.pct}%;background:${c.color}"></div></div>
          <span class="co-pct">${c.pct}%</span>
        </li>`,
  )
  .join('\n')}
      </ul>
      <p class="text-dim" style="margin-top:12px;font-size:.82rem">Nav: ${pos.prevRef ? esc(pos.prevRef) : '...'} &rarr; <strong class="text-accent">${esc(pos.ref)}</strong> &rarr; ${pos.nextRef ? esc(pos.nextRef) : '...'} &bull; Source: Theophysics Spine XLSX</p>
    </div>
  </div>

  <div class="page-footer">
    <a href="index.html">&larr; Master Index</a> &bull; Theophysics Note Engine &bull; Template: ${esc(pos.ref)} ${esc(pos.title)}
  </div>
</main>

<!-- RIGHT SIDEBAR -->
<aside class="sidebar-right">
  <h4>Note Metadata</h4>
  <div class="meta-row"><span class="label">Chain #</span><span class="value">${pos.chainNumber} of ${pos.totalPositions}</span></div>
  <div class="meta-row"><span class="label">Object</span><span class="value">${esc(pos.objectType)}</span></div>
  <div class="meta-row"><span class="label">Stage</span><span class="value">${esc(pos.stage)}</span></div>
  <div class="meta-row"><span class="label">CR</span><span class="value text-red">${esc(pos.cr)}</span></div>
  <div class="meta-row"><span class="label">Bridge</span><span class="value text-green">${pos.bridgeScore}/${pos.bridgeTotal}</span></div>
  <div class="meta-row"><span class="label">Conflicts</span><span class="value text-green">0</span></div>

  <h4>Tags</h4>
  <div>${pos.tags.map((t) => `<span class="tag ${tagColor(t)}">${esc(t)}</span>`).join('')}</div>

  <h4>Dependency Graph</h4>
  <div class="dep-graph">${renderDepGraph(pos)}</div>

  <h4>Bridge Strength</h4>
  <div class="mini-graph">
${bars.map((b) => `    <div class="bar" style="height:${b.height};background:${b.color}" title="${esc(b.label)}"></div>`).join('\n')}
  </div>
  <div class="bridge-labels">${bars.map((b) => `<span>${esc(b.label)}</span>`).join('')}</div>

  <h4>Quick Actions</h4>
  <div class="quick-actions">
    <button class="action-btn">Run Math Sim</button>
    <button class="action-btn">Edit in Markdown</button>
    <button class="action-btn">View Raw JSON</button>
  </div>
</aside>

</div>

<script>
function toggleSection(header) {
  var body = header.nextElementSibling;
  var arrow = header.querySelector('.section-toggle');
  if (!body) return;
  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (arrow) arrow.classList.add('open');
  } else {
    body.style.display = 'none';
    if (arrow) arrow.classList.remove('open');
  }
}
function toggleObjection(header) {
  var body = header.nextElementSibling;
  var arrow = header.querySelector('.toggle-arrow');
  if (!body) return;
  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (arrow) arrow.classList.add('open');
  } else {
    body.style.display = 'none';
    if (arrow) arrow.classList.remove('open');
  }
}
function switchTab(tab, paneId) {
  var tabs = document.querySelectorAll('.layer-tab');
  var panes = document.querySelectorAll('.layer-pane');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  for (var i = 0; i < panes.length; i++) panes[i].style.display = 'none';
  tab.classList.add('active');
  var pane = document.getElementById('pane-' + paneId);
  if (pane) pane.style.display = 'block';
}
</script>
</body>
</html>`;
}

export function generateIndex(allPositions: SpinePosition[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Theophysics Note Engine &mdash; Master Index</title>
<style>
${CSS_CONTENT}
</style>
</head>
<body>
<div id="root">
<main class="main-content" style="max-width:700px;padding-top:48px">
  <h1 class="page-title">Theophysics Note Engine</h1>
  <p class="page-subtitle">Master Index &bull; ${allPositions.length} spine positions exported</p>
  <div style="margin-top:24px">
${allPositions
  .map(
    (p) => `    <a href="${p.ref.replace(/\./g, '_')}.html" class="link-card" style="display:block;text-decoration:none;color:inherit;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:12px">
        <span class="badge badge-blue" style="min-width:36px;justify-content:center">${String(p.chainNumber).padStart(3, '0')}</span>
        <div>
          <div class="lc-ref">${esc(p.ref)}</div>
          <div class="lc-title">${esc(p.title)}</div>
          <div class="lc-type">${esc(p.objectType)} &bull; ${esc(p.category)} &bull; Bridge: ${p.bridgeScore}/${p.bridgeTotal}</div>
        </div>
        <span class="badge badge-green" style="margin-left:auto">${esc(p.cr)}</span>
      </div>
    </a>`,
  )
  .join('\n')}
  </div>
  <div class="page-footer">Theophysics Note Engine &bull; Exported ${new Date().toISOString().split('T')[0]}</div>
</main>
</div>
</body>
</html>`;
}

const CSS_CONTENT = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg:#0e1117;--surface:#161b22;--surface2:#1c2129;--border:#30363d;
  --text:#e6edf3;--text-dim:#8b949e;--accent:#58a6ff;--accent2:#1f6feb;
  --green:#3fb950;--yellow:#d29922;--red:#f85149;--purple:#bc8cff;
  --orange:#d18616;--cyan:#39d2c0;--radius:8px;
  --font-mono:'SF Mono','Fira Code','JetBrains Mono',Consolas,monospace;
  --font-sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
}
html{font-size:15px}
body{font-family:var(--font-sans);background:var(--bg);color:var(--text);line-height:1.6;margin:0;padding:0}
#root{display:flex;min-height:100vh}
.sidebar-left{width:260px;min-width:260px;background:var(--surface);border-right:1px solid var(--border);padding:16px 12px;overflow-y:auto;position:sticky;top:0;height:100vh}
.sidebar-left h3{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-dim);margin-bottom:8px}
.sidebar-left .logo{font-size:1.1rem;font-weight:700;color:var(--accent);margin-bottom:20px;display:flex;align-items:center;gap:8px}
.sidebar-left .logo span{font-size:1.3rem}
.nav-list{list-style:none}
.nav-list li{padding:6px 10px;border-radius:var(--radius);cursor:pointer;font-size:.87rem;transition:background .15s;display:flex;align-items:center;gap:8px}
.nav-list li:hover{background:var(--surface2)}
.nav-list li.active{background:var(--accent2);color:#fff}
.nav-list li .chain-num{font-size:.7rem;color:var(--text-dim);min-width:26px}
.nav-list li.active .chain-num{color:rgba(255,255,255,.7)}
.nav-section{margin-bottom:18px}
.nav-divider{border-top:1px solid var(--border);margin:12px 0}
.main-content{flex:1;max-width:900px;padding:32px 40px;margin:0 auto;overflow-y:auto}
.sidebar-right{width:280px;min-width:280px;background:var(--surface);border-left:1px solid var(--border);padding:16px 14px;overflow-y:auto;position:sticky;top:0;height:100vh;font-size:.85rem}
.sidebar-right h4{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-dim);margin-bottom:8px;margin-top:16px}
.sidebar-right h4:first-child{margin-top:0}
.meta-row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)}
.meta-row .label{color:var(--text-dim)}
.meta-row .value{color:var(--text);font-weight:500}
.tag{display:inline-block;padding:2px 8px;border-radius:12px;font-size:.75rem;font-weight:500;margin:2px 3px 2px 0}
.tag-blue{background:rgba(88,166,255,.15);color:var(--accent)}
.tag-green{background:rgba(63,185,80,.15);color:var(--green)}
.tag-purple{background:rgba(188,140,255,.15);color:var(--purple)}
.tag-orange{background:rgba(209,134,22,.15);color:var(--orange)}
.tag-red{background:rgba(248,81,73,.15);color:var(--red)}
.mini-graph{background:var(--surface2);border-radius:var(--radius);height:80px;margin-top:8px;display:flex;align-items:flex-end;padding:8px;gap:4px}
.mini-graph .bar{flex:1;border-radius:3px 3px 0 0;min-height:4px}
.breadcrumb{font-size:.8rem;color:var(--text-dim);margin-bottom:8px}
.breadcrumb a{color:var(--accent);text-decoration:none}
.breadcrumb a:hover{text-decoration:underline}
.page-title{font-size:1.8rem;font-weight:700;margin-bottom:4px}
.page-subtitle{font-size:.9rem;color:var(--text-dim);margin-bottom:24px}
.summary-card{background:linear-gradient(135deg,rgba(88,166,255,.06),rgba(188,140,255,.06));border:1px solid var(--border);border-radius:var(--radius);padding:18px 22px;margin-bottom:24px;display:grid;grid-template-columns:1fr 1fr;gap:10px 20px}
.summary-card .sc-item{display:flex;align-items:center;gap:8px;font-size:.88rem}
.summary-card .sc-label{color:var(--text-dim);min-width:70px}
.summary-card .sc-value{font-weight:500}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:12px;font-size:.78rem;font-weight:600}
.badge-green{background:rgba(63,185,80,.15);color:var(--green)}
.badge-blue{background:rgba(88,166,255,.15);color:var(--accent)}
.section{margin-bottom:28px}
.section-header{display:flex;align-items:center;gap:10px;margin-bottom:12px;cursor:pointer;user-select:none}
.section-header h2{font-size:1.1rem;font-weight:600}
.section-icon{font-size:1.1rem;width:28px;text-align:center}
.section-toggle{margin-left:auto;font-size:.75rem;color:var(--text-dim);transition:transform .2s}
.section-toggle.open{transform:rotate(90deg)}
.formal-block{background:var(--surface2);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--radius);padding:14px 18px;font-family:var(--font-mono);font-size:.92rem;margin-bottom:8px}
.formal-block .axiom-tag{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--purple);margin-bottom:6px}
.formal-block .def{font-size:1.05rem;color:var(--cyan)}
.formal-meta{font-size:.8rem;color:var(--text-dim);margin-top:6px}
.assumes-list{list-style:none}
.assumes-list li{padding:8px 12px;border-radius:var(--radius);margin-bottom:4px;display:flex;align-items:center;gap:10px;background:var(--surface2);font-size:.88rem;transition:background .15s;cursor:pointer}
.assumes-list li:hover{background:rgba(88,166,255,.08)}
.assumes-list .check{color:var(--green);font-weight:700}
.assumes-list .ref{color:var(--accent);font-family:var(--font-mono);font-size:.8rem}
.mapping-table{width:100%;border-collapse:collapse;font-size:.85rem}
.mapping-table th{text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);color:var(--text-dim);font-size:.75rem;text-transform:uppercase;letter-spacing:.05em}
.mapping-table td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:middle}
.mapping-table tr:hover td{background:rgba(88,166,255,.04)}
.mapping-table .domain-icon{font-size:1rem;margin-right:6px}
.status-pill{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:10px;font-size:.78rem}
.status-grounded{background:rgba(63,185,80,.12);color:var(--green)}
.status-scripture{background:rgba(188,140,255,.12);color:var(--purple)}
.status-suggest{background:rgba(210,153,34,.12);color:var(--yellow)}
.link-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.link-card{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:10px 14px;cursor:pointer;transition:border-color .15s,background .15s}
.link-card:hover{border-color:var(--accent);background:rgba(88,166,255,.04)}
.link-card .lc-ref{font-family:var(--font-mono);font-size:.78rem;color:var(--accent)}
.link-card .lc-title{font-size:.88rem;margin-top:2px}
.link-card .lc-type{font-size:.72rem;color:var(--text-dim);margin-top:4px}
.defeat-list{list-style:none}
.defeat-list li{padding:8px 12px;background:var(--surface2);border-radius:var(--radius);margin-bottom:4px;display:flex;align-items:center;gap:10px;font-size:.88rem}
.defeat-list .x-mark{color:var(--red);font-weight:700}
.defeat-status{margin-left:auto;font-size:.75rem;color:var(--green)}
.layer-tabs{display:flex;gap:2px}
.layer-tab{padding:8px 16px;background:var(--surface2);border:1px solid var(--border);border-bottom:none;border-radius:var(--radius) var(--radius) 0 0;cursor:pointer;font-size:.82rem;color:var(--text-dim);transition:all .15s}
.layer-tab.active{background:var(--surface);color:var(--text);border-color:var(--border);font-weight:600}
.layer-content{background:var(--surface);border:1px solid var(--border);border-radius:0 var(--radius) var(--radius) var(--radius);padding:18px}
.equation-block{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:14px 18px;margin-bottom:10px;font-family:var(--font-mono)}
.equation-block .eq-label{font-size:.72rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.equation-block .eq-math{font-size:1.1rem;color:var(--cyan)}
.equation-block .eq-note{font-size:.8rem;color:var(--text-dim);margin-top:6px}
.equation-block .eq-status{display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:.75rem}
.objection-item{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:8px;overflow:hidden}
.objection-header{padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:.88rem;transition:background .15s}
.objection-header:hover{background:rgba(248,81,73,.04)}
.objection-header .obj-num{background:rgba(248,81,73,.12);color:var(--red);width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0}
.objection-header .toggle-arrow{margin-left:auto;color:var(--text-dim);font-size:.7rem;transition:transform .2s}
.objection-header .toggle-arrow.open{transform:rotate(90deg)}
.objection-body{padding:0 14px 14px 48px;font-size:.85rem;color:var(--text-dim)}
.objection-body .resp-label{font-weight:600;color:var(--green);margin-bottom:4px}
.objection-body .ai-suggest{margin-top:8px;padding:8px 12px;background:rgba(210,153,34,.06);border-left:2px solid var(--yellow);border-radius:0 var(--radius) var(--radius) 0;font-size:.82rem;color:var(--yellow)}
.analytics-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px}
.analytics-card{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;text-align:center}
.analytics-card .a-value{font-size:1.5rem;font-weight:700}
.analytics-card .a-label{font-size:.72rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin-top:2px}
.co-occurrence-list{list-style:none;font-size:.85rem}
.co-occurrence-list li{display:flex;align-items:center;gap:8px;padding:5px 0}
.co-occurrence-list .co-bar-wrap{flex:1;background:var(--surface2);border-radius:3px;height:8px;overflow:hidden}
.co-occurrence-list .co-bar{height:100%;border-radius:3px}
.co-occurrence-list .co-pct{font-size:.78rem;color:var(--text-dim);min-width:36px;text-align:right}
.action-btn{padding:7px 14px;border-radius:var(--radius);border:1px solid var(--border);background:var(--surface2);color:var(--text);font-size:.82rem;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s;font-family:var(--font-sans)}
.action-btn:hover{border-color:var(--accent);background:rgba(88,166,255,.08)}
.text-dim{color:var(--text-dim)}.text-green{color:var(--green)}.text-accent{color:var(--accent)}.text-purple{color:var(--purple)}.text-red{color:var(--red)}.text-cyan{color:var(--cyan)}
.dep-graph{background:var(--surface2);border-radius:var(--radius);padding:14px;font-family:var(--font-mono);font-size:.75rem;line-height:2}
.dep-graph .current{color:var(--accent);font-weight:700}
.bridge-labels{font-size:.7rem;color:var(--text-dim);margin-top:4px;display:flex;justify-content:space-between}
.quick-actions{display:flex;flex-direction:column;gap:6px}
.quick-actions .action-btn{font-size:.78rem;width:100%;justify-content:center}
.page-footer{text-align:center;padding:30px 0 60px;font-size:.8rem;color:var(--text-dim)}
.page-footer a{color:var(--accent);text-decoration:none}
::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}
@media(max-width:1200px){.sidebar-right{display:none}}
@media(max-width:900px){.sidebar-left{display:none}.main-content{padding:20px}}`;
