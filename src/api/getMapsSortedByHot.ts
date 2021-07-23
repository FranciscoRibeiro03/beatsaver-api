import { AxiosInstance } from 'axios';
import { BeatSaverSearchResult } from '../types/BeatSaverSearchResult';

async function getMapsSortedByHot(
  axiosInstance: AxiosInstance,
  page: number = 0,
): Promise<BeatSaverSearchResult | null> {
  try {

    const response = await axiosInstance.get(`/maps/hot/${page}`);
    return response.data as BeatSaverSearchResult;
    
  } catch (err) {
    const response = err.response;
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default getMapsSortedByHot;
