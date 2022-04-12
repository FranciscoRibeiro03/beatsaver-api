import { Instant } from "./Instant";
import { UserDetail } from "./UserDetail";

export interface PlaylistFull {
    createdAt: Instant;
    deletedAt: Instant;
    description: string;
    name: string;
    owner: UserDetail;
    playlistId: number;
    playlistImage: string;
    public: boolean;
    songsChangedAt: Instant;
    updatedAt: Instant;
}