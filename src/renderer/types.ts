export interface Equation {
  id: string;
  label: string;
  math: string;
  note: string;
  dimsCheck: string;
  layer: 'physics' | 'math';
}

export type MappingStatus =
  | 'grounded'
  | 'scripture'
  | 'suggest'
  | 'eigenstates'
  | 'empirical'
  | 'shannon';

export interface SpineMapping {
  domain: string;
  domainIcon: string;
  mapping: string;
  status: MappingStatus;
  statusLabel: string;
  source: string;
}

export interface Objection {
  question: string;
  response: string;
  aiSuggest: string;
}

export interface ForwardLink {
  ref: string;
  title: string;
  type: string;
}

export interface AssumedAxiom {
  ref: string;
  name: string;
  validated: boolean;
}

export interface DefeatCondition {
  description: string;
  defeated: boolean;
  statusText: string;
}

export interface CoOccurrence {
  name: string;
  pct: number;
  color: string;
}

export interface SpinePosition {
  id: string;
  chainNumber: number;
  totalPositions: number;
  ref: string;
  title: string;
  objectType: string;
  category: string;
  spineType: string;
  stage: string;
  cr: string;

  formalDefinition: string;

  assumes: AssumedAxiom[];
  mappings: SpineMapping[];
  bridgeScore: number;
  bridgeTotal: number;

  enables: ForwardLink[];
  defeatConditions: DefeatCondition[];
  equations: Equation[];
  objections: Objection[];

  tags: string[];
  coOccurrences: CoOccurrence[];

  physicsMapping: string;
  theologyMapping: string;

  prevRef: string | null;
  nextRef: string | null;
}
