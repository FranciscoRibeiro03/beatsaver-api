import { UserStats } from "./UserStats";

export interface UserDetail {
    avatar: string,
    hash: string,
    id: number,
    name: string,
    stats: UserStats,
    testplay: boolean
}