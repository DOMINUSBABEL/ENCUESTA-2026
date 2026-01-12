export interface Candidate {
  name: string;
  party?: string;
  percentage: number;
  color: string;
}

export interface Scenario {
  id: string;
  title: string;
  candidates: Candidate[];
}

export interface RunoffScenario {
  candidate1: Candidate;
  candidate2: Candidate;
  nsNr: number;
  nullVote: number;
}

export interface ApprovalRating {
  category: string;
  percentage: number;
  color: string;
}

export interface Problem {
  issue: string;
  percentage: number;
}

export interface DemographicBreakdown {
  category: string;
  segments: {
    segmentName: string;
    values: { [candidateName: string]: number };
  }[];
}
