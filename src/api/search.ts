import axios, { AxiosInstance } from 'axios';
import RateLimitError from '../errors/RateLimitError';
import { Instant } from '../models/Instant';
import { SearchResponse } from '../models/SearchResponse';

export enum SortOrder {
  Latest = 'Latest',
  Relevance = 'Relevance',
  Rating = 'Rating',
}

export interface SearchOptions {
  sortOrder: SortOrder | 'Latest' | 'Relevance' | 'Rating';
  automapper?: boolean;
  chroma?: boolean;
  cinema?: boolean;
  curated?: boolean;
  from?: Instant;
  fullSpread?: boolean;
  maxBpm?: number;
  maxDuration?: number;
  maxNps?: number;
  maxRating?: number;
  me?: boolean;
  minBpm?: number;
  minDuration?: number;
  minNps?: number;
  minRating?: number;
  noodle?: boolean;
  q?: string;
  ranked?: boolean;
  tags?: string[] | string;
  to?: Instant;
  verified?: boolean;
}

export async function searchMaps(
  axiosInstance: AxiosInstance,
  searchOptions: SearchOptions = { sortOrder: SortOrder.Latest },
  page: number = 0,
): Promise<SearchResponse> {
  try {
    if (searchOptions.tags && Array.isArray(searchOptions.tags)) searchOptions.tags = searchOptions.tags.join(',');
    const response = await axiosInstance.get<SearchResponse>(`/search/text/${page}`, { params: searchOptions });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw err;
      const response = err.response;
      if (response.status === 429) throw new RateLimitError();
    }
    throw err;
  }
}
