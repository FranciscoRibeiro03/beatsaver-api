import { Instant } from './Instant';
import { MapDetailMetadata } from './MapDetailMetadata';
import { MapStats } from './MapStats';
import { MapVersion } from './MapVersion';
import { UserDetail } from './UserDetail';

export interface MapDetail {
  automapper: boolean;
  curator: string;
  description: string;
  id: string;
  metadata: MapDetailMetadata;
  name: string;
  qualified: boolean;
  ranked: boolean;
  stats: MapStats;
  uploaded: Instant;
  uploader: UserDetail;
  versions: MapVersion[];
}
