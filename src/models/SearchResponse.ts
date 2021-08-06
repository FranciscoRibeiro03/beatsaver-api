import { MapDetail } from "./MapDetail";
import { UserDetail } from "./UserDetail";

export interface SearchResponse {
    docs: MapDetail[],
    redirect: string,
    user: UserDetail
}