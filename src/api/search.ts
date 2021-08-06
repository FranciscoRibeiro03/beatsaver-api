import { AxiosInstance } from "axios";
import RateLimitError from "../errors/RateLimitError";
import { Instant } from "../models/Instant";
import { SearchResponse } from "../models/SearchResponse";

export enum SortOrder {
    Latest = "Latest",
    Relevance = "Relevance",
    Rating = "Rating"
}

export interface SearchOptions {
    sortOrder: SortOrder,
    automapper?: boolean,
    chroma?: boolean,
    cinema?: boolean,
    from?: Instant,
    fullSpread?: boolean,
    maxBpm?: number,
    maxDuration?: number,
    maxNps?: number,
    maxRating?: number,
    me?: boolean,
    minBpm?: number,
    minDuration?: number,
    minNps?: number,
    noodle?: boolean,
    q?: string,
    ranked?: boolean,
    to?: Instant
}


export async function searchMaps(axiosInstance: AxiosInstance, searchOptions: SearchOptions = {sortOrder: SortOrder.Latest}, page: number = 0): Promise<SearchResponse> {
    try {
        if (searchOptions.q) searchOptions.q = encodeURIComponent(searchOptions.q);
        const response = await axiosInstance.get(`/search/text/${page}`, {params: searchOptions})
        return response.data as SearchResponse;
    } catch (err) {
        const response = err.response;
        if (response.status === 429) throw new RateLimitError();
        throw err;
    }
}