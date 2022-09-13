import axios, { AxiosInstance } from 'axios';
import PlaylistNotFoundError from '../errors/PlaylistNotFoundError';
import RateLimitError from '../errors/RateLimitError';
import { PlaylistPage } from '../models/PlaylistPage';
import { PlaylistSearchResponse } from '../models/PlaylistSearchResponse';

const timeRegex = /[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\+[\d]{2}:[\d]{2}/g;

export async function getPlaylistByID(
  axiosInstance: AxiosInstance,
  id: number,
  page: number = 0,
): Promise<PlaylistPage> {
  try {
    const response = await axiosInstance.get<PlaylistPage>(`/playlists/id/${id}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) throw err;
      const response = err.response;
      if (response.status === 404) throw new PlaylistNotFoundError(id);
      if (response.status === 429) throw new RateLimitError();
    }
    throw err;
  }
}

export async function getLatestPlaylists(
  axiosInstance: AxiosInstance,
  after: string,
  before: string,
  sort: 'UPDATED' | 'SONGS_UPDATED' | 'CREATED',
): Promise<PlaylistSearchResponse> {
  try {
    const response = await axiosInstance.get<PlaylistSearchResponse>('/playlists/latest', {
      params: { after, before, sort },
    });
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

export async function getPlaylistsByUser(
  axiosInstance: AxiosInstance,
  userId: number,
  page: number = 0,
): Promise<PlaylistSearchResponse> {
  try {
    const response = await axiosInstance.get<PlaylistSearchResponse>(`/playlists/user/${userId}/${page}`);
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
