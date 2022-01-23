import { Instant } from './Instant';
import { MapDifficulty } from './MapDifficulty';
import { MapTestplay } from './MapTestplay';

export interface MapVersion {
  coverURL: string;
  createdAt: Instant;
  diffs: MapDifficulty[];
  downloadURL: string;
  feedback: string;
  hash: string;
  key: string;
  previewURL: string;
  sageScore: number;
  scheduledAt: Instant;
  state: string;
  testplayAt: Instant;
  testplays: MapTestplay[];
}
