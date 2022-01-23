import { Instant } from './Instant';
import { MapDetailMetadata } from './MapDetailMetadata';
import { MapStats } from './MapStats';
import { MapVersion } from './MapVersion';
import { UserDetail } from './UserDetail';

export interface MapDetail {
  automapper: boolean;
  createdAt: Instant;
  curator: string;
  deletedAt: Instant;
  description: string;
  id: string;
  lastPublishedAt: Instant;
  metadata: MapDetailMetadata;
  name: string;
  qualified: boolean;
  ranked: boolean;
  stats: MapStats;
  tags: string[];
  uploadedAt: Instant;
  uploaded: Instant;
  uploader: UserDetail;
  versions: MapVersion[];
}
