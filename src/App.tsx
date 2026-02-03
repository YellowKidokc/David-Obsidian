import { useState, useCallback, useMemo } from "react";
import "./App.css";
import axiomsData from "./data/axioms.json";
import {
  parseMarkdownSections,
  formatMarkdownContent,
} from "./utils/markdownParser";

interface Axiom {
  id: string;
  chainPosition: number;
  fileName: string;
  title: string;
  classification: string;
  stage: number;
  status: string;
  domain: string[];
  dependsOn: string[];
  enables: string[];
  sections: Record<string, string>;
  fullContent: string;
}

export default function App() {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(["content"]), // Start with content section open
  );
  const [currentAxiomId, setCurrentAxiomId] = useState<string>("A1.1");
  const [axioms] = useState<Axiom[]>(axiomsData as Axiom[]);

  const currentAxiom = axioms.find((a) => a.id === currentAxiomId) || axioms[0];

  const parsedSections = useMemo(() => {
    return parseMarkdownSections(currentAxiom.fullContent);
  }, [currentAxiom]);

  const toggleSection = useCallback((id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isOpen = (id: string) => !collapsedSections.has(id);

  // Group axioms by type
  const axiomsByType = {
    Axioms: axioms.filter((a) => a.id && String(a.id).startsWith("A")),
    Definitions: axioms.filter((a) => a.id && String(a.id).startsWith("D")),
    Lemmas: axioms.filter((a) => a.id && String(a.id).startsWith("LN")),
    "Boundary Conditions": axioms.filter(
      (a) => a.id && String(a.id).startsWith("BC"),
    ),
    Theorems: axioms.filter((a) => a.id && String(a.id).startsWith("T")),
    Proofs: axioms.filter((a) => a.id && String(a.id).startsWith("P")),
    Evidence: axioms.filter(
      (a) =>
        a.id &&
        (String(a.id).startsWith("EV") || String(a.id).startsWith("EXP")),
    ),
    Other: axioms.filter(
      (a) =>
        a.id &&
        !["A", "D", "LN", "BC", "T", "P", "EV", "EXP"].some((prefix) =>
          String(a.id).startsWith(prefix),
        ),
    ),
  };

  return (
    <>
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="sidebar-left">
        <div className="logo">
          <span>&#x2699;</span> Theophysics Engine
        </div>

        {Object.entries(axiomsByType).map(
          ([category, items]) =>
            items.length > 0 && (
              <div key={category} className="nav-section">
                <h3>{category}</h3>
                <ul className="nav-list">
                  {items.slice(0, 10).map((axiom) => (
                    <li
                      key={axiom.id}
                      className={currentAxiomId === axiom.id ? "active" : ""}
                      onClick={() => setCurrentAxiomId(axiom.id)}
                    >
                      <span className="chain-num">
                        {String(axiom.chainPosition).padStart(3, "0")}
                      </span>
                      {axiom.id}{" "}
                      {axiom.title.split("—")[1]?.trim() || axiom.title}
                    </li>
                  ))}
                  {items.length > 10 && (
                    <li
                      style={{
                        fontSize: ".75rem",
                        color: "var(--text-dim)",
                        fontStyle: "italic",
                      }}
                    >
                      +{items.length - 10} more...
                    </li>
                  )}
                </ul>
              </div>
            ),
        )}

        <div className="nav-divider" />

        <div className="nav-section">
          <h3>Tools</h3>
          <ul className="nav-list">
            <li>&#9881; Math Simulator</li>
            <li>&#9745; Structure Checker</li>
            <li>&#129302; AI Control Deck</li>
            <li>&#128190; Export Options</li>
          </ul>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        <div className="breadcrumb">
          <a href="#">Master Index</a> › <a href="#">Spine</a> ›{" "}
          <a href="#">{currentAxiom.classification}</a> › {currentAxiom.id}
        </div>

        <h1 className="page-title">{currentAxiom.title}</h1>
        <p className="page-subtitle">
          Chain Position: {currentAxiom.chainPosition} of {axioms.length} |
          Stage {currentAxiom.stage} | {currentAxiom.classification}
        </p>

        <div className="summary-card">
          <div className="sc-item">
            <span className="sc-label">Status:</span>
            <span className="badge badge-green">✓ {currentAxiom.status}</span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Domains:</span>
            <span className="sc-value">
              {currentAxiom.domain.slice(0, 3).join(", ")}
            </span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Depends On:</span>
            <span className="sc-value">
              {currentAxiom.dependsOn.length} axioms
            </span>
          </div>
          <div className="sc-item">
            <span className="sc-label">Enables:</span>
            <span className="sc-value">
              {currentAxiom.enables.length} axioms
            </span>
          </div>
        </div>

        {/* Render parsed sections */}
        {parsedSections.map((section, idx) => (
          <div key={idx} className="section">
            <div
              className="section-header"
              onClick={() => toggleSection(`section-${idx}`)}
            >
              <span className="section-icon">
                {section.title.includes("Formal")
                  ? "📐"
                  : section.title.includes("Physics")
                    ? "⚛️"
                    : section.title.includes("Math")
                      ? "🔢"
                      : section.title.includes("Objection")
                        ? "❌"
                        : section.title.includes("Defense")
                          ? "✅"
                          : "📋"}
              </span>
              <h2>{section.title}</h2>
              <span
                className={`section-toggle ${isOpen(`section-${idx}`) ? "open" : ""}`}
              >
                ▶
              </span>
            </div>
            {isOpen(`section-${idx}`) && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownContent(section.content),
                }}
              />
            )}
          </div>
        ))}

        <div className="actions-bar">
          <button type="button" className="action-btn primary">
            &#9881; Extract & Simulate Math
          </button>
          <button type="button" className="action-btn">
            &#9745; Check Structure
          </button>
          <button type="button" className="action-btn">
            &#129302; AI Control Deck
          </button>
        </div>

        <div className="page-footer">
          <p>
            Theophysics Engine | {axioms.length} Axioms Loaded | Built with
            React + Vite
          </p>
        </div>
      </main>

      {/* ===== RIGHT SIDEBAR ===== */}
      <aside className="sidebar-right">
        <h4>Metadata</h4>
        <div className="meta-row">
          <span className="label">Chain Position</span>
          <span className="value">
            {currentAxiom.chainPosition}/{axioms.length}
          </span>
        </div>
        <div className="meta-row">
          <span className="label">Stage</span>
          <span className="value">Stage {currentAxiom.stage}</span>
        </div>
        <div className="meta-row">
          <span className="label">Status</span>
          <span className="value">{currentAxiom.status}</span>
        </div>

        <h4>Domains</h4>
        <div>
          {currentAxiom.domain.map((d) => (
            <span key={d} className="tag tag-blue">
              {d}
            </span>
          ))}
        </div>

        <h4>Dependencies</h4>
        <div className="dep-graph">
          {currentAxiom.dependsOn.slice(0, 5).map((dep) => (
            <div key={dep}>↑ {dep}</div>
          ))}
          <div className="current">• {currentAxiom.id}</div>
          {currentAxiom.enables.slice(0, 5).map((en) => (
            <div key={en}>↓ {en}</div>
          ))}
        </div>

        <h4>Quick Actions</h4>
        <div className="quick-actions">
          <button type="button" className="action-btn">
            📤 Export
          </button>
          <button type="button" className="action-btn">
            🔗 Share
          </button>
          <button type="button" className="action-btn">
            📊 Analytics
          </button>
        </div>
      </aside>

      {/* MODALS - keeping original modal code */}
      {/* ... (modals remain the same) ... */}
    </>
  );
}
