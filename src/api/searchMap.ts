import { AxiosInstance } from 'axios';
import { BeatSaverSearchResult } from '../types/BeatSaverSearchResult';

async function searchMap(
  searchString: string,
  axiosInstance: AxiosInstance,
  page: number = 0,
): Promise<BeatSaverSearchResult | null> {
  try {
    const response = await axiosInstance.get(`/search/text/${page}&q=${encodeURIComponent(searchString)}`);

    if (response.status === 429)
      throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    if (response.status !== 200) throw new Error('Unknown error. Please contact rui2015.');

    return response.data as BeatSaverSearchResult;
  } catch (err) {
    throw new Error(err);
  }
}

export default searchMap;
