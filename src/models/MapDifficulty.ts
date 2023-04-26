import { MapParitySummary } from './MapParitySummary';

export interface MapDifficulty {
  bombs: number;
  characteristic: string;
  chroma: boolean;
  cinema: boolean;
  difficulty: string;
  events: number;
  length: number;
  me: boolean;
  ne: boolean;
  njs: number;
  notes: number;
  nps: number;
  obstacles: number;
  offset: number;
  paritySummary: MapParitySummary;
  seconds: number;
  stars: number;
  label: string;
}
