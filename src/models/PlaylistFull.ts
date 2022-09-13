import { Instant } from './Instant';
import { UserDetail } from './UserDetail';
import { PlaylistStats } from './PlaylistStats';

export interface PlaylistFull {
  createdAt: Instant;
  curatedAt: Instant;
  curator: UserDetail;
  deletedAt: Instant;
  description: string;
  name: string;
  owner: UserDetail;
  playlistId: number;
  playlistImage: string;
  public: boolean;
  songsChangedAt: Instant;
  stats: PlaylistStats;
  updatedAt: Instant;
}
