import axios, { AxiosInstance } from 'axios';
import RateLimitError from '../errors/RateLimitError';
import SongNotFoundError from '../errors/SongNotFoundError';
import { MapDetail } from '../models/MapDetail';
import { SearchResponse } from '../models/SearchResponse';

const beforeRegex = /[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\+[\d]{2}:[\d]{2}/g;

export async function getMapByID(axiosInstance: AxiosInstance, id: string): Promise<MapDetail> {
  try {
    const response = await axiosInstance.get<MapDetail>(`/maps/id/${id}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw err;
      const response = err.response;
      if (response.status === 404) throw new SongNotFoundError('ID', id);
      if (response.status === 429) throw new RateLimitError();
    }
    throw err;
  }
}

export async function getMapByHash(axiosInstance: AxiosInstance, hash: string): Promise<MapDetail> {
  try {
    const response = await axiosInstance.get<MapDetail>(`/maps/hash/${hash}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw err;
      const response = err.response;
      if (response.status === 404) throw new SongNotFoundError('hash', hash);
      if (response.status === 429) throw new RateLimitError();
    }
    throw err;
  }
}

export async function getMapsByUploader(
  axiosInstance: AxiosInstance,
  id: number,
  page: number = 0,
): Promise<SearchResponse> {
  try {
    const response = await axiosInstance.get<SearchResponse>(`/maps/uploader/${id}/${page}`);
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
    const response = await axiosInstance.get<SearchResponse>(endpoint);
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
