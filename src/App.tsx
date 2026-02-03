import { useState, useCallback } from 'react';
import './App.css';

type ModalId = 'sim' | 'struct' | 'export' | 'ai-control' | null;
type TabId = 'physics' | 'math' | 'combined';

export default function App() {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );
  const [activeTab, setActiveTab] = useState<TabId>('physics');
  const [openObjections, setOpenObjections] = useState<Set<number>>(new Set());
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  const toggleSection = useCallback((id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleObjection = useCallback((idx: number) => {
    setOpenObjections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const isOpen = (id: string) => !collapsedSections.has(id);

  return (
    <>
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="sidebar-left">
        <div className="logo">
          <span>&#x2699;</span> Theophysics Engine
        </div>

        <div className="nav-section">
          <h3>Spine &mdash; Axioms</h3>
          <ul className="nav-list">
            <li>
              <span className="chain-num">001</span> A1.1 Existence
            </li>
            <li>
              <span className="chain-num">002</span> A1.2 Distinction
            </li>
            <li>
              <span className="chain-num">003</span> A1.3 Information Primacy
            </li>
            <li>
              <span className="chain-num">004</span> A1.4 Logical Precedence
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3>Spine &mdash; Definitions</h3>
          <ul className="nav-list">
            <li className="active">
              <span className="chain-num">005</span> D1.2 Bit Definition
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3>Spine &mdash; Lemmas</h3>
          <ul className="nav-list">
            <li>
              <span className="chain-num">006</span> LN1.1 Matter-Energy
            </li>
            <li>
              <span className="chain-num">007</span> LN1.2 It-From-Bit
            </li>
            <li>
              <span className="chain-num">008</span> LN1.3 Holographic
            </li>
            <li>
              <span className="chain-num">009</span> LN1.4 Computational
            </li>
          </ul>
        </div>

        <div className="nav-divider" />

        <div className="nav-section">
          <h3>Tools</h3>
          <ul className="nav-list">
            <li onClick={() => setActiveModal('sim')}>
              &#9881; Math Simulator
            </li>
            <li onClick={() => setActiveModal('struct')}>
              &#9745; Structure Checker
            </li>
            <li onClick={() => setActiveModal('ai-control')}>
              &#129302; AI Control Deck
            </li>
            <li>&#128202; Analytics Dashboard</li>
            <li>&#128269; Search Vault</li>
          </ul>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <div className="breadcrumb">
          <a href="#">Master Index</a> &rsaquo;{' '}
          <a href="#">Spine</a> &rsaquo;{' '}
          <a href="#">Definitions</a> &rsaquo; D1.2
        </div>

        <h1 className="page-title">D1.2 &mdash; Bit Definition</h1>
        <p className="page-subtitle">
          Chain Position: 5 of 188 &bull; Object Type: Axiom &bull; Category:
          Information Theory
        </p>

        {/* Actions */}
        <div className="actions-bar">
          <button
            type="button"
            className="action-btn primary"
            onClick={() => setActiveModal('sim')}
          >
            &#9881; Extract &amp; Simulate Math
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setActiveModal('struct')}
          >
            &#9745; Check Structure
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setActiveModal('export')}
          >
            &#128196; Export PDF
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setActiveModal('ai-control')}
          >
            &#129302; AI Control Deck
          </button>
          <button type="button" className="action-btn">
            &#9998; Edit Source MD
          </button>
        </div>

        {/* Quick Summary */}
        <div className="summary-card">
          <div className="sc-item">
            <span className="sc-label">Formal:</span>
            <span className="sc-value">
              Bit = minimal unit of distinction (binary choice)
            </span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Bridge:</span>
            <span className="badge badge-green">7 / 10</span>
            <span className="text-dim" style={{ fontSize: '.78rem' }}>
              Auto-validated
            </span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Physics:</span>
            <span className="sc-value">Observables / Contrast</span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Theology:</span>
            <span className="sc-value">Genesis 1:4 (light/dark)</span>
          </div>
        </div>

        {/* ===== Formal Statement ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('formal')}
          >
            <span className="section-icon">&#128208;</span>
            <h2>Formal Statement</h2>
            <span
              className={`section-toggle ${isOpen('formal') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('formal') && (
            <div className="section-body">
              <div className="formal-block">
                <div className="axiom-tag">Definition &bull; Stage 1</div>
                <div className="def">
                  Bit &equiv; min( distinction(binary) )
                </div>
                <div className="formal-meta">
                  Spine: Definition Stage 1 &bull; CR: Critical
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== Assumes ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('assumes')}
          >
            <span className="section-icon">&#128279;</span>
            <h2>Assumes (3/3 Validated)</h2>
            <span
              className={`section-toggle ${isOpen('assumes') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('assumes') && (
            <div className="section-body">
              <ul className="assumes-list">
                <li>
                  <span className="check">&#10003;</span>
                  <span className="ref">A1.1</span>
                  <span>Existence</span>
                  <span className="badge badge-green ml-auto">Validated</span>
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  <span className="ref">A1.2</span>
                  <span>Binary distinction</span>
                  <span className="badge badge-green ml-auto">Validated</span>
                </li>
                <li>
                  <span className="check">&#10003;</span>
                  <span className="ref">A1.3</span>
                  <span>Bit primacy (Information Primacy)</span>
                  <span className="badge badge-green ml-auto">Validated</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ===== Spine Master Mappings ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('mappings')}
          >
            <span className="section-icon">&#128279;</span>
            <h2>Spine Master Mappings</h2>
            <span
              className="badge badge-blue"
              style={{ marginLeft: 8 }}
            >
              Cross-Domain: 7/10
            </span>
            <span
              className={`section-toggle ${isOpen('mappings') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('mappings') && (
            <div className="section-body">
              <table className="mapping-table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Mapping</th>
                    <th>Status</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="domain-icon">&#9883;</span> Physics
                    </td>
                    <td>Observables / Contrast</td>
                    <td>
                      <span className="status-pill status-grounded">
                        &#10003; Grounded
                      </span>
                    </td>
                    <td>Bekenstein bound</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#10013;</span> Theology
                    </td>
                    <td>Genesis 1 ordering</td>
                    <td>
                      <span className="status-pill status-scripture">
                        &#10003; Scripture
                      </span>
                    </td>
                    <td>Gen 1:1&ndash;4</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#129504;</span>{' '}
                      Consciousness
                    </td>
                    <td>Qualia</td>
                    <td>
                      <span className="status-pill status-suggest">
                        &#128260; AI Suggest
                      </span>
                    </td>
                    <td>Binary percept?</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#9883;</span> Quantum
                    </td>
                    <td>Distinguishability</td>
                    <td>
                      <span className="status-pill status-grounded">
                        &#10003; Eigenstates
                      </span>
                    </td>
                    <td>QM formalism</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#128214;</span> Scripture
                    </td>
                    <td>Gen 1:4 light/dark</td>
                    <td>
                      <span className="status-pill status-scripture">
                        &#10003; Scripture
                      </span>
                    </td>
                    <td>Genesis 1:4</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#128300;</span> Evidence
                    </td>
                    <td>QM experiments</td>
                    <td>
                      <span className="status-pill status-grounded">
                        &#10003; Empirical
                      </span>
                    </td>
                    <td>Stern-Gerlach</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="domain-icon">&#128190;</span> Information
                    </td>
                    <td>Distinction = bit</td>
                    <td>
                      <span className="status-pill status-grounded">
                        &#10003; Shannon
                      </span>
                    </td>
                    <td>Shannon 1948</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-dim mt-10" style={{ fontSize: '.8rem' }}>
                Logic Check: High coherence &bull; L3 AI2 validated
              </p>
            </div>
          )}
        </div>

        {/* ===== Enables ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('enables')}
          >
            <span className="section-icon">&#10145;</span>
            <h2>Enables (Forward Links: 6)</h2>
            <span
              className={`section-toggle ${isOpen('enables') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('enables') && (
            <div className="section-body">
              <div className="link-cards">
                {[
                  {
                    ref: 'LN1.1',
                    title: 'Matter-Energy Derivative',
                    type: 'Lemma \u2022 Matter-bits',
                  },
                  {
                    ref: 'LN1.2',
                    title: 'It-From-Bit (Wheeler)',
                    type: 'Lemma \u2022 Wheeler principle',
                  },
                  {
                    ref: 'LN1.3',
                    title: 'Holographic Bound',
                    type: 'Lemma \u2022 Auto-linked',
                  },
                  {
                    ref: 'LN1.4',
                    title: 'Computational Irreducibility',
                    type: 'Lemma \u2022 Auto-linked',
                  },
                  {
                    ref: 'T2.1',
                    title: 'Theorem: Finite Universe',
                    type: 'Theorem \u2022 Auto-linked',
                  },
                  {
                    ref: 'C3.1',
                    title: 'Corollary: Discrete Spacetime',
                    type: 'Corollary \u2022 Auto-linked',
                  },
                ].map((link) => (
                  <div className="link-card" key={link.ref}>
                    <div className="lc-ref">{link.ref}</div>
                    <div className="lc-title">{link.title}</div>
                    <div className="lc-type">{link.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== Defeat Conditions ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('defeats')}
          >
            <span className="section-icon">&#10060;</span>
            <h2>Defeat Conditions (Falsifiability)</h2>
            <span
              className={`section-toggle ${isOpen('defeats') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('defeats') && (
            <div className="section-body">
              <ul className="defeat-list">
                <li>
                  <span className="x-mark">&#10007;</span>
                  <span>Sub-bit information unit discovered</span>
                  <span className="defeat-status">No empirical defeat</span>
                </li>
                <li>
                  <span className="x-mark">&#10007;</span>
                  <span>Non-binary minimal distinction demonstrated</span>
                  <span className="defeat-status">No empirical defeat</span>
                </li>
                <li>
                  <span className="x-mark">&#10007;</span>
                  <span>Nats shown to be more fundamental than bits</span>
                  <span className="defeat-status">No empirical defeat</span>
                </li>
              </ul>
              <p className="text-green mt-8" style={{ fontSize: '.8rem' }}>
                AI Logic Check: All testable; no empirical defeat (L3 AI2
                Validated)
              </p>
            </div>
          )}
        </div>

        {/* ===== Physics & Math Layers ===== */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">&#128300;</span>
            <h2>Physics &amp; Math Layers</h2>
          </div>
          <div className="layer-tabs">
            {(['physics', 'math', 'combined'] as TabId[]).map((tab) => (
              <div
                key={tab}
                className={`layer-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'physics'
                  ? 'Physics'
                  : tab === 'math'
                    ? 'Math'
                    : 'Combined View'}
              </div>
            ))}
          </div>
          <div className="layer-content">
            {activeTab === 'physics' && (
              <div>
                <div className="equation-block">
                  <div className="eq-label">Bekenstein Bound</div>
                  <div className="eq-math">
                    N &le; A / (4 l<sub>P</sub>
                    <sup>2</sup> ln 2)
                  </div>
                  <div className="eq-note">
                    Maximum information (bits) in a region bounded by area A
                  </div>
                  <div className="eq-status text-green">
                    &#10003; Dimensionally consistent &bull; Units: [bits] = [L
                    <sup>2</sup>] / [L<sup>2</sup>]
                  </div>
                </div>
                <div className="equation-block">
                  <div className="eq-label">Landauer&rsquo;s Principle</div>
                  <div className="eq-math">
                    E = k<sub>B</sub> T ln 2
                  </div>
                  <div className="eq-note">
                    Minimum energy to erase one bit at temperature T &bull;
                    Experimentally confirmed
                  </div>
                  <div className="eq-status text-green">
                    &#10003; Dimensionally consistent &bull; Units: [J] = [J/K]
                    &middot; [K]
                  </div>
                </div>
                <p className="text-dim mt-10" style={{ fontSize: '.82rem' }}>
                  Shade to reveal: Planck units derivation, Stern-Gerlach
                  experiment details, black hole entropy
                </p>
              </div>
            )}

            {activeTab === 'math' && (
              <div>
                <div className="equation-block">
                  <div className="eq-label">Shannon Entropy</div>
                  <div className="eq-math">
                    H = &minus;&sum; p<sub>i</sub> log<sub>2</sub> p<sub>i</sub>
                  </div>
                  <div className="eq-note">
                    Information entropy measured in bits &bull; Foundation of
                    information theory
                  </div>
                  <div className="eq-status text-green">
                    &#10003; Valid &bull; Units: [bits]
                  </div>
                </div>
                <div className="equation-block">
                  <div className="eq-label">Boolean Universality</div>
                  <div className="eq-math">
                    Bit &rarr; NAND universal gate
                  </div>
                  <div className="eq-note">
                    Any Boolean function can be constructed from NAND gates
                    operating on bits
                  </div>
                  <div className="eq-status text-green">
                    &#10003; Proven (computational universality)
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'combined' && (
              <div>
                <p className="text-dim mb-14" style={{ fontSize: '.85rem' }}>
                  All equations from D1.2 extracted and cross-checked:
                </p>
                {[
                  {
                    label: 'Bekenstein',
                    math: (
                      <>
                        N &le; A / (4 l<sub>P</sub>
                        <sup>2</sup> ln 2)
                      </>
                    ),
                  },
                  {
                    label: 'Landauer',
                    math: (
                      <>
                        E = k<sub>B</sub> T ln 2
                      </>
                    ),
                  },
                  {
                    label: 'Shannon',
                    math: (
                      <>
                        H = &minus;&sum; p<sub>i</sub> log<sub>2</sub> p
                        <sub>i</sub>
                      </>
                    ),
                  },
                ].map((eq) => (
                  <div className="equation-block" key={eq.label}>
                    <div className="eq-label">{eq.label}</div>
                    <div className="eq-math">{eq.math}</div>
                    <div className="eq-status text-green">
                      &#10003; Dims OK &bull; &#10003; No conflicts
                    </div>
                  </div>
                ))}
                <p className="text-green mt-12" style={{ fontSize: '.82rem' }}>
                  Cross-vault consistency: 0 conflicts found across 188 chain
                  positions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===== Objections ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('objections')}
          >
            <span className="section-icon">&#128736;</span>
            <h2>Objections</h2>
            <span
              className={`section-toggle ${isOpen('objections') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('objections') && (
            <div className="section-body">
              {[
                {
                  q: '\u201CReality is continuous, not discrete\u201D',
                  resp: 'Bekenstein bound proves finite bits per region; real numbers are approximations of discrete substrates. Planck scale sets minimum distinguishable length.',
                  ai: (
                    <>
                      AI1 Suggest: Cite Planck length l<sub>P</sub> =
                      1.616&times;10<sup>-35</sup> m as natural discretization
                      threshold
                    </>
                  ),
                },
                {
                  q: '\u201CNats are more natural than bits (base e vs base 2)\u201D',
                  resp: 'Bit is the minimal distinction (two states). Nats use continuous e-base which presupposes reals. Bits are operationally primary\u2014every measurement resolves a binary question.',
                  ai: <>AI1 Suggest: Reference Wheeler&rsquo;s &ldquo;it from bit&rdquo; &mdash; physical existence arises from binary yes/no</>,
                },
                {
                  q: '\u201CQubits supersede classical bits\u201D',
                  resp: 'Qubits are measured in bits upon observation (Born rule). Superposition collapses to binary outcomes. The bit remains the unit of extracted information.',
                  ai: <>AI1 Suggest: Holevo bound &mdash; n qubits carry at most n classical bits of accessible information</>,
                },
              ].map((obj, idx) => (
                <div className="objection-item" key={idx}>
                  <div
                    className="objection-header"
                    onClick={() => toggleObjection(idx)}
                  >
                    <span className="obj-num">{idx + 1}</span>
                    <span>{obj.q}</span>
                    <span
                      className={`toggle-arrow ${openObjections.has(idx) ? 'open' : ''}`}
                    >
                      &#9654;
                    </span>
                  </div>
                  {openObjections.has(idx) && (
                    <div className="objection-body">
                      <div className="resp-label">Response:</div>
                      <p>{obj.resp}</p>
                      <div className="ai-suggest">{obj.ai}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== Analytics ===== */}
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleSection('analytics')}
          >
            <span className="section-icon">&#128202;</span>
            <h2>Analytics (L3 AI3)</h2>
            <span
              className={`section-toggle ${isOpen('analytics') ? 'open' : ''}`}
            >
              &#9654;
            </span>
          </div>
          {isOpen('analytics') && (
            <div className="section-body">
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="a-value text-green">0</div>
                  <div className="a-label">Contradictions</div>
                </div>
                <div className="analytics-card">
                  <div className="a-value text-accent">7/10</div>
                  <div className="a-label">Bridge Score</div>
                </div>
                <div className="analytics-card">
                  <div className="a-value text-purple">Critical</div>
                  <div className="a-label">CR Rating</div>
                </div>
              </div>

              <p className="text-dim mb-8" style={{ fontSize: '.82rem' }}>
                Co-occurrence Analysis:
              </p>
              <ul className="co-occurrence-list">
                {[
                  { name: 'Distinction', pct: 85, color: 'var(--accent)' },
                  { name: 'It-From-Bit', pct: 42, color: 'var(--purple)' },
                  { name: 'Holographic', pct: 38, color: 'var(--cyan)' },
                  { name: 'Shannon', pct: 67, color: 'var(--green)' },
                ].map((item) => (
                  <li key={item.name}>
                    <span style={{ minWidth: 90 }}>{item.name}</span>
                    <div className="co-bar-wrap">
                      <div
                        className="co-bar"
                        style={{
                          width: `${item.pct}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                    <span className="co-pct">{item.pct}%</span>
                  </li>
                ))}
              </ul>

              <p className="text-dim mt-12" style={{ fontSize: '.82rem' }}>
                Nav: A1.2 &rarr;{' '}
                <strong className="text-accent">D1.2</strong> &rarr; LN1.1
                &bull; Source: Theophysics Spine XLSX
              </p>
            </div>
          )}
        </div>

        {/* ===== Footer ===== */}
        <div className="page-footer">
          <a href="#">&larr; Master Index</a> &bull; Theophysics Note Engine
          &bull; Template: D1.2 Bit Definition
        </div>
      </main>

      {/* ===== RIGHT SIDEBAR ===== */}
      <aside className="sidebar-right">
        <h4>Note Metadata</h4>
        <div className="meta-row">
          <span className="label">Chain #</span>
          <span className="value">5 of 188</span>
        </div>
        <div className="meta-row">
          <span className="label">Object</span>
          <span className="value">Axiom</span>
        </div>
        <div className="meta-row">
          <span className="label">Stage</span>
          <span className="value">Definition 1</span>
        </div>
        <div className="meta-row">
          <span className="label">CR</span>
          <span className="value text-red">Critical</span>
        </div>
        <div className="meta-row">
          <span className="label">Bridge</span>
          <span className="value text-green">7/10</span>
        </div>
        <div className="meta-row">
          <span className="label">Conflicts</span>
          <span className="value text-green">0</span>
        </div>

        <h4>Tags</h4>
        <div>
          <span className="tag tag-blue">information-theory</span>
          <span className="tag tag-purple">axiom</span>
          <span className="tag tag-green">validated</span>
          <span className="tag tag-orange">physics</span>
          <span className="tag tag-blue">theology</span>
        </div>

        <h4>Dependency Graph</h4>
        <div className="dep-graph">
          <div className="text-dim">A1.1 Existence</div>
          <div className="text-dim">&nbsp;&nbsp;&darr;</div>
          <div className="text-dim">A1.2 Distinction</div>
          <div className="text-dim">&nbsp;&nbsp;&darr;</div>
          <div className="text-dim">A1.3 Info Primacy</div>
          <div className="text-dim">&nbsp;&nbsp;&darr;</div>
          <div className="current">
            D1.2 Bit Definition &larr; you are here
          </div>
          <div className="text-dim">&nbsp;&nbsp;&darr;</div>
          <div className="text-dim">LN1.1 Matter-Energy</div>
          <div className="text-dim">&nbsp;&nbsp;&darr;</div>
          <div className="text-dim">LN1.2 It-From-Bit</div>
        </div>

        <h4>Bridge Strength</h4>
        <div className="mini-graph">
          <div
            className="bar"
            style={{ height: '90%', background: 'var(--green)' }}
            title="Physics"
          />
          <div
            className="bar"
            style={{ height: '80%', background: 'var(--purple)' }}
            title="Theology"
          />
          <div
            className="bar"
            style={{ height: '30%', background: 'var(--yellow)' }}
            title="Consciousness"
          />
          <div
            className="bar"
            style={{ height: '85%', background: 'var(--cyan)' }}
            title="Quantum"
          />
          <div
            className="bar"
            style={{ height: '80%', background: 'var(--purple)' }}
            title="Scripture"
          />
          <div
            className="bar"
            style={{ height: '75%', background: 'var(--accent)' }}
            title="Evidence"
          />
          <div
            className="bar"
            style={{ height: '95%', background: 'var(--green)' }}
            title="Information"
          />
        </div>
        <div className="bridge-labels">
          <span>Phys</span>
          <span>Theo</span>
          <span>Con</span>
          <span>QM</span>
          <span>Scr</span>
          <span>Evd</span>
          <span>Info</span>
        </div>

        <h4>Quick Actions</h4>
        <div className="quick-actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => setActiveModal('sim')}
          >
            Run Math Sim
          </button>
          <button type="button" className="action-btn">
            Edit in Markdown
          </button>
          <button type="button" className="action-btn">
            View Raw JSON
          </button>
        </div>
      </aside>

      {/* ===== MODALS ===== */}

      {/* Math Simulator Modal */}
      <div
        className={`modal-overlay ${activeModal === 'sim' ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveModal(null);
        }}
      >
        <div className="modal">
          <h3>
            &#9881; Math Layer Extractor &amp; Simulator
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>
          </h3>
          <p className="text-dim mb-14" style={{ fontSize: '.85rem' }}>
            Extracted 3 equations from D1.2. Running dimensional analysis,
            symbolic verification, and cross-vault conflict detection.
          </p>
          <div className="result-row">
            <span className="r-status text-green">&#10003;</span>
            <span className="r-eq">
              N &le; A / (4 l<sub>P</sub>
              <sup>2</sup> ln 2)
            </span>
            <span className="r-check text-green">
              Dims: [bits] = [L<sup>2</sup>]/[L<sup>2</sup>] &#10003;
            </span>
          </div>
          <div className="result-row">
            <span className="r-status text-green">&#10003;</span>
            <span className="r-eq">
              E = k<sub>B</sub> T ln 2
            </span>
            <span className="r-check text-green">
              Dims: [J] = [J/K]&middot;[K] &#10003;
            </span>
          </div>
          <div className="result-row">
            <span className="r-status text-green">&#10003;</span>
            <span className="r-eq">
              H = &minus;&sum; p log<sub>2</sub> p
            </span>
            <span className="r-check text-green">
              Dims: [bits] (dimensionless) &#10003;
            </span>
          </div>
          <div className="bg-dark bordered mt-14 p-12">
            <p className="text-green fw-600" style={{ fontSize: '.82rem' }}>
              Simulation Results:
            </p>
            <p className="text-dim mt-6" style={{ fontSize: '.82rem' }}>
              Plugging Planck values: l<sub>P</sub> = 1.616&times;10
              <sup>-35</sup> m, observable universe area A &asymp;
              4&pi;(4.4&times;10<sup>26</sup>)<sup>2</sup> m<sup>2</sup>
            </p>
            <p className="text-cyan font-mono mt-4" style={{ fontSize: '.82rem' }}>
              N<sub>max</sub> &asymp; 2.6 &times; 10<sup>122</sup> bits
            </p>
            <p className="text-dim mt-4" style={{ fontSize: '.82rem' }}>
              Landauer minimum at T=2.7K (CMB): E<sub>min</sub> &asymp;
              2.58 &times; 10<sup>-23</sup> J per bit erasure
            </p>
          </div>
          <div className="success-box mt-14">
            <p className="text-green fw-600" style={{ fontSize: '.82rem' }}>
              Cross-Vault Scan: 0 conflicts
            </p>
            <p className="text-dim mt-4" style={{ fontSize: '.82rem' }}>
              Scanned 188 chain positions. No dimensional mismatches. No
              contradictory bounds. All equations mutually consistent.
            </p>
          </div>
        </div>
      </div>

      {/* Structure Checker Modal */}
      <div
        className={`modal-overlay ${activeModal === 'struct' ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveModal(null);
        }}
      >
        <div className="modal">
          <h3>
            &#9745; Structure Validation Report
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>
          </h3>
          <p className="text-dim mb-14" style={{ fontSize: '.85rem' }}>
            Validating D1.2 against Axiom schema (required fields, dependency
            integrity, mapping completeness).
          </p>
          {[
            'Formal statement present & non-empty',
            'Assumes: 3 dependencies (min 1 required)',
            'All assumed axioms exist in vault (A1.1, A1.2, A1.3)',
            'No circular dependencies detected (DAG check passed)',
            'Defeat conditions: 3 listed (min 1 required)',
            'Spine mappings: 7 of 10 domains mapped',
          ].map((check) => (
            <div className="result-row" key={check}>
              <span className="r-status text-green">&#10003;</span>
              <span style={{ flex: 1 }}>{check}</span>
            </div>
          ))}
          <div className="result-row">
            <span className="r-status text-yellow">&#9888;</span>
            <span className="text-yellow" style={{ flex: 1 }}>
              3 unmapped domains: Biology, Philosophy, Mathematics (formal)
            </span>
          </div>
          {[
            'Forward links: 6 (auto-verified targets exist)',
            'Physics layer equations: 2 (dimensionally checked)',
            'Math layer equations: 2 (symbolically valid)',
          ].map((check) => (
            <div className="result-row" key={check}>
              <span className="r-status text-green">&#10003;</span>
              <span style={{ flex: 1 }}>{check}</span>
            </div>
          ))}
          <div className="success-box mt-14">
            <p className="text-green fw-600" style={{ fontSize: '.82rem' }}>
              Result: 9/10 checks passed, 1 warning
            </p>
            <p className="text-dim mt-4" style={{ fontSize: '.82rem' }}>
              Note is structurally valid. Consider mapping remaining 3 domains
              for full bridge coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <div
        className={`modal-overlay ${activeModal === 'export' ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveModal(null);
        }}
      >
        <div className="modal">
          <h3>
            &#128196; Export Options
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>
          </h3>
          <p className="text-dim mb-14" style={{ fontSize: '.85rem' }}>
            Choose an export format for D1.2 Bit Definition:
          </p>
          <div className="export-grid">
            {[
              {
                icon: '&#128196;',
                title: 'PDF (LaTeX)',
                desc: 'Publication-grade via MD \u2192 LaTeX \u2192 PDF pipeline',
              },
              {
                icon: '&#128209;',
                title: 'LaTeX Source',
                desc: 'Raw .tex file for academic submission',
              },
              {
                icon: '&#128187;',
                title: 'JSON-LD',
                desc: 'Machine-readable structured data',
              },
              {
                icon: '&#127760;',
                title: 'Static HTML',
                desc: 'Shareable single-page site (like this demo)',
              },
            ].map((item) => (
              <div className="link-card export-card" key={item.title}>
                <div
                  className="icon"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Control Deck Modal - NEW FROM CODEX */}
      <div
        className={`modal-overlay ${activeModal === 'ai-control' ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveModal(null);
        }}
      >
        <div className="modal" style={{ width: '800px' }}>
          <h3>
            &#129302; AI Control Deck (3 Assistants)
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>
          </h3>
          <p className="text-dim mb-14" style={{ fontSize: '.85rem' }}>
            Rotate assistants by task: suggestion, integration logic, and
            conversational guide.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {/* AI-1 Suggest */}
            <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(210,153,34,.15)', color: 'var(--yellow)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem', fontWeight: '600' }}>AI-1 Suggest</span>
                <span style={{ background: 'rgba(210,153,34,.15)', color: 'var(--yellow)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem' }}>Active</span>
              </div>
              <p className="text-dim" style={{ fontSize: '.82rem', marginBottom: '10px' }}>
                Proposes edits, spell-corrects, and suggests new blocks as you type.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '.8rem', color: 'var(--text-dim)' }}>
                <li style={{ marginBottom: '4px' }}>&bull; "Add a Quick Summary card?"</li>
                <li style={{ marginBottom: '4px' }}>&bull; "Clarify Genesis 1:4 note"</li>
                <li style={{ marginBottom: '4px' }}>&bull; "Fix spelling: distinguishability"</li>
              </ul>
              <button type="button" className="action-btn" style={{ width: '100%', marginTop: '10px', fontSize: '.78rem' }}>
                Switch to AI-2
              </button>
            </div>

            {/* AI-2 Logic */}
            <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(63,185,80,.15)', color: 'var(--green)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem', fontWeight: '600' }}>AI-2 Logic</span>
                <span style={{ background: 'rgba(63,185,80,.15)', color: 'var(--green)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem' }}>Running</span>
              </div>
              <p className="text-dim" style={{ fontSize: '.82rem', marginBottom: '10px' }}>
                Handles integration/logic checks: bridges, contradictions, and schema validation.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '.8rem', color: 'var(--text-dim)' }}>
                <li style={{ marginBottom: '4px' }}>&bull; Bridge count: 7/10 &#10003;</li>
                <li style={{ marginBottom: '4px' }}>&bull; Defeat conditions: 3</li>
                <li style={{ marginBottom: '4px' }}>&bull; Cross-domain coherence: High</li>
              </ul>
              <button type="button" className="action-btn" style={{ width: '100%', marginTop: '10px', fontSize: '.78rem' }}>
                Open Logic Report
              </button>
            </div>

            {/* AI-3 Guide */}
            <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(88,166,255,.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem', fontWeight: '600' }}>AI-3 Guide</span>
                <span style={{ background: 'rgba(63,185,80,.15)', color: 'var(--green)', padding: '2px 8px', borderRadius: '12px', fontSize: '.75rem' }}>Listening</span>
              </div>
              <p className="text-dim" style={{ fontSize: '.82rem', marginBottom: '10px' }}>
                Conversational coach. Ask "why" and it teaches the framework in plain language.
              </p>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px', fontSize: '.78rem', marginBottom: '10px' }}>
                <p style={{ marginBottom: '4px' }}><strong>You:</strong> "How does this connect to physics?"</p>
                <p><strong>AI-3:</strong> "The Bekenstein bound ties information to area, so bits stay finite."</p>
              </div>
              <button type="button" className="action-btn" style={{ width: '100%', fontSize: '.78rem' }}>
                Talk to AI-3
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(63,185,80,.06)', border: '1px solid rgba(63,185,80,.2)', borderRadius: 'var(--radius)' }}>
            <p className="text-green" style={{ fontSize: '.82rem', fontWeight: '600' }}>
              &#10003; All AI layers active and monitoring your work
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
