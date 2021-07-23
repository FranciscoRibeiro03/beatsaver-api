import { AxiosInstance } from 'axios';
import { BeatSaverSearchResult } from '../types/BeatSaverSearchResult';

async function getMapsByUploader(
  userID: string,
  axiosInstance: AxiosInstance,
  page: number = 0,
): Promise<BeatSaverSearchResult | null> {
  try {

    const response = await axiosInstance.get(`/maps/uploader/${userID}/${page}`);
    return response.data as BeatSaverSearchResult;

  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new Error('User ID not found.');
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default getMapsByUploader;
