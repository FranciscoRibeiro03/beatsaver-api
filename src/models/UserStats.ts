import { Instant } from './Instant';
import { UserDiffStats } from './UserDiffStats';

export interface UserStats {
  avgBpm: number;
  avgDuration: number;
  avgScore: number;
  diffStats: UserDiffStats;
  firstUpload: Instant;
  lastUpload: Instant;
  rankedMaps: number;
  totalDownvotes: number;
  totalMaps: number;
  totalUpvotes: number;
}
