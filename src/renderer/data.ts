import { SpinePosition } from './types';

const d12: SpinePosition = {
  id: 'D1.2',
  chainNumber: 5,
  totalPositions: 188,
  ref: 'D1.2',
  title: 'Bit Definition',
  objectType: 'Axiom',
  category: 'Information Theory',
  spineType: 'Definition',
  stage: 'Definition 1',
  cr: 'Critical',

  formalDefinition: 'Bit \u2261 min( distinction(binary) )',

  assumes: [
    { ref: 'A1.1', name: 'Existence', validated: true },
    { ref: 'A1.2', name: 'Binary distinction', validated: true },
    { ref: 'A1.3', name: 'Bit primacy (Information Primacy)', validated: true },
  ],

  mappings: [
    {
      domain: 'Physics',
      domainIcon: '\u269B',
      mapping: 'Observables / Contrast',
      status: 'grounded',
      statusLabel: 'Grounded',
      source: 'Bekenstein bound',
    },
    {
      domain: 'Theology',
      domainIcon: '\u271D',
      mapping: 'Genesis 1 ordering',
      status: 'scripture',
      statusLabel: 'Scripture',
      source: 'Gen 1:1\u20134',
    },
    {
      domain: 'Consciousness',
      domainIcon: '\u1F9E0',
      mapping: 'Qualia',
      status: 'suggest',
      statusLabel: 'AI Suggest',
      source: 'Binary percept?',
    },
    {
      domain: 'Quantum',
      domainIcon: '\u269B',
      mapping: 'Distinguishability',
      status: 'eigenstates',
      statusLabel: 'Eigenstates',
      source: 'QM formalism',
    },
    {
      domain: 'Scripture',
      domainIcon: '\u1F4D6',
      mapping: 'Gen 1:4 light/dark',
      status: 'scripture',
      statusLabel: 'Scripture',
      source: 'Genesis 1:4',
    },
    {
      domain: 'Evidence',
      domainIcon: '\u1F52C',
      mapping: 'QM experiments',
      status: 'empirical',
      statusLabel: 'Empirical',
      source: 'Stern-Gerlach',
    },
    {
      domain: 'Information',
      domainIcon: '\u1F4BE',
      mapping: 'Distinction = bit',
      status: 'shannon',
      statusLabel: 'Shannon',
      source: 'Shannon 1948',
    },
  ],

  bridgeScore: 7,
  bridgeTotal: 10,

  enables: [
    { ref: 'LN1.1', title: 'Matter-Energy Derivative', type: 'Lemma \u2022 Matter-bits' },
    { ref: 'LN1.2', title: 'It-From-Bit (Wheeler)', type: 'Lemma \u2022 Wheeler principle' },
    { ref: 'LN1.3', title: 'Holographic Bound', type: 'Lemma \u2022 Auto-linked' },
    { ref: 'LN1.4', title: 'Computational Irreducibility', type: 'Lemma \u2022 Auto-linked' },
    { ref: 'T2.1', title: 'Theorem: Finite Universe', type: 'Theorem \u2022 Auto-linked' },
    { ref: 'C3.1', title: 'Corollary: Discrete Spacetime', type: 'Corollary \u2022 Auto-linked' },
  ],

  defeatConditions: [
    { description: 'Sub-bit information unit discovered', defeated: false, statusText: 'No empirical defeat' },
    { description: 'Non-binary minimal distinction demonstrated', defeated: false, statusText: 'No empirical defeat' },
    { description: 'Nats shown to be more fundamental than bits', defeated: false, statusText: 'No empirical defeat' },
  ],

  equations: [
    {
      id: 'bekenstein',
      label: 'Bekenstein Bound',
      math: 'N &le; A / (4 l<sub>P</sub><sup>2</sup> ln 2)',
      note: 'Maximum information (bits) in a region bounded by area A',
      dimsCheck: '&#10003; Dimensionally consistent &bull; Units: [bits] = [L<sup>2</sup>] / [L<sup>2</sup>]',
      layer: 'physics',
    },
    {
      id: 'landauer',
      label: 'Landauer\u2019s Principle',
      math: 'E = k<sub>B</sub> T ln 2',
      note: 'Minimum energy to erase one bit at temperature T &bull; Experimentally confirmed',
      dimsCheck: '&#10003; Dimensionally consistent &bull; Units: [J] = [J/K] &middot; [K]',
      layer: 'physics',
    },
    {
      id: 'shannon',
      label: 'Shannon Entropy',
      math: 'H = &minus;&sum; p<sub>i</sub> log<sub>2</sub> p<sub>i</sub>',
      note: 'Information entropy measured in bits &bull; Foundation of information theory',
      dimsCheck: '&#10003; Valid &bull; Units: [bits]',
      layer: 'math',
    },
    {
      id: 'boolean',
      label: 'Boolean Universality',
      math: 'Bit &rarr; NAND universal gate',
      note: 'Any Boolean function can be constructed from NAND gates operating on bits',
      dimsCheck: '&#10003; Proven (computational universality)',
      layer: 'math',
    },
  ],

  objections: [
    {
      question: '\u201CReality is continuous, not discrete\u201D',
      response: 'Bekenstein bound proves finite bits per region; real numbers are approximations of discrete substrates. Planck scale sets minimum distinguishable length.',
      aiSuggest: 'AI1 Suggest: Cite Planck length l<sub>P</sub> = 1.616\u00d710<sup>-35</sup> m as natural discretization threshold',
    },
    {
      question: '\u201CNats are more natural than bits (base e vs base 2)\u201D',
      response: 'Bit is the minimal distinction (two states). Nats use continuous e-base which presupposes reals. Bits are operationally primary\u2014every measurement resolves a binary question.',
      aiSuggest: 'AI1 Suggest: Reference Wheeler\u2019s \u201Cit from bit\u201D \u2014 physical existence arises from binary yes/no',
    },
    {
      question: '\u201CQubits supersede classical bits\u201D',
      response: 'Qubits are measured in bits upon observation (Born rule). Superposition collapses to binary outcomes. The bit remains the unit of extracted information.',
      aiSuggest: 'AI1 Suggest: Holevo bound \u2014 n qubits carry at most n classical bits of accessible information',
    },
  ],

  tags: ['information-theory', 'axiom', 'validated', 'physics', 'theology'],

  coOccurrences: [
    { name: 'Distinction', pct: 85, color: '#58a6ff' },
    { name: 'It-From-Bit', pct: 42, color: '#bc8cff' },
    { name: 'Holographic', pct: 38, color: '#39d2c0' },
    { name: 'Shannon', pct: 67, color: '#3fb950' },
  ],

  physicsMapping: 'Observables / Contrast',
  theologyMapping: 'Genesis 1:4 (light/dark)',

  prevRef: 'A1.3',
  nextRef: 'LN1.1',
};

export const spineNavItems = [
  { section: 'Axioms', items: [
    { num: '001', ref: 'A1.1', name: 'A1.1 Existence' },
    { num: '002', ref: 'A1.2', name: 'A1.2 Distinction' },
    { num: '003', ref: 'A1.3', name: 'A1.3 Information Primacy' },
    { num: '004', ref: 'A1.4', name: 'A1.4 Logical Precedence' },
  ]},
  { section: 'Definitions', items: [
    { num: '005', ref: 'D1.2', name: 'D1.2 Bit Definition' },
  ]},
  { section: 'Lemmas', items: [
    { num: '006', ref: 'LN1.1', name: 'LN1.1 Matter-Energy' },
    { num: '007', ref: 'LN1.2', name: 'LN1.2 It-From-Bit' },
    { num: '008', ref: 'LN1.3', name: 'LN1.3 Holographic' },
    { num: '009', ref: 'LN1.4', name: 'LN1.4 Computational' },
  ]},
];

const allPositions: Record<string, SpinePosition> = {
  'D1.2': d12,
};

export function getPosition(ref: string): SpinePosition | undefined {
  return allPositions[ref];
}

export function getAllPositions(): SpinePosition[] {
  return Object.values(allPositions);
}

export default allPositions;
