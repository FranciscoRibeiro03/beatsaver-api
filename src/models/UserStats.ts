import { Instant } from "./Instant";

export interface UserStats {
    avgBpm: number,
    avgDuration: number,
    avgScore: number,
    diffStats: UserDiffStats,
    firstUpload: Instant,
    lastUpload: Instant,
    rankedMaps: number,
    totalDownvotes: number,
    totalMaps: number,
    totalUpvotes: number
}