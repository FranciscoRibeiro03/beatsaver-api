import { AxiosInstance } from 'axios';
import { BeatSaverSearchResult } from '../types/BeatSaverSearchResult';

async function getMapsSortedByPlays(
  axiosInstance: AxiosInstance,
  page: number = 0,
): Promise<BeatSaverSearchResult | null> {
  try {
    const response = await axiosInstance.get(`/maps/plays/${page}`);

    if (response.status === 429)
      throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    if (response.status !== 200) throw new Error('Unknown error. Please contact rui2015.');

    return response.data as BeatSaverSearchResult;
  } catch (err) {
    throw new Error(err);
  }
}

export default getMapsSortedByPlays;
