import { AxiosInstance } from 'axios';
import RateLimitError from '../errors/RateLimitError';
import SongNotFoundError from '../errors/SongNotFoundError';
import { MapDetail } from '../models/MapDetail';
import { SearchResponse } from '../models/SearchResponse';

var beforeRegex = /[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\+[\d]{2}:[\d]{2}/g;

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
    if (before) {
      if (!beforeRegex.test(before))
        throw new Error('The before parameter needs to be of the form "YYYY-MM-DDTHH:MM:SS+00:00"');
      endpoint += `&before=${encodeURIComponent(before)}`;
    }
    const response = await axiosInstance.get(endpoint);
    return response.data as SearchResponse;
  } catch (err) {
    const response = err.response;
    if (response.status === 429) throw new RateLimitError();
    throw err;
  }
}
