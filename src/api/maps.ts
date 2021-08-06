import { AxiosInstance } from 'axios';
import RateLimitError from '../errors/RateLimitError';
import SongNotFoundError from '../errors/SongNotFoundError';
import { MapDetail } from '../models/MapDetail';
import { SearchResponse } from '../models/SearchResponse';

export async function getMapByID(axiosInstance: AxiosInstance, id: string): Promise<MapDetail> {
  try {
    const response = await axiosInstance.get(`/maps/id/${id}`);
    return response.data as MapDetail;
  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new SongNotFoundError('ID', id);
    if (response.status === 429) throw new RateLimitError();
    throw err;
  }
}

export async function getMapByHash(axiosInstance: AxiosInstance, hash: string): Promise<MapDetail> {
  try {
    const response = await axiosInstance.get(`/maps/hash/${hash}`);
    return response.data as MapDetail;
  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new SongNotFoundError('hash', hash);
    if (response.status === 429) throw new RateLimitError();
    throw err;
  }
}

export async function getMapsByUploader(
  axiosInstance: AxiosInstance,
  id: number,
  page: number = 0,
): Promise<SearchResponse> {
  try {
    const response = await axiosInstance.get(`/maps/uploader/${id}/${page}`);
    return response.data as SearchResponse;
  } catch (err) {
    const response = err.response;
    if (response.status === 429) throw new RateLimitError();
    throw err;
  }
}

export async function getLatestMaps(
  axiosInstance: AxiosInstance,
  automapper: boolean,
  before?: string,
): Promise<SearchResponse> {
  try {
    let endpoint = `/maps/latest?automapper${automapper}`;
    if (before) endpoint += `&before=${encodeURIComponent(before)}`;
    const response = await axiosInstance.get(endpoint);
    return response.data as SearchResponse;
  } catch (err) {
    const response = err.response;
    if (response.status === 429) throw new RateLimitError();
    throw err;
  }
}
