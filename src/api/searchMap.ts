import { AxiosInstance } from 'axios';
import { BeatSaverSearchResult } from '../types/BeatSaverSearchResult';

async function searchMap(
  searchString: string,
  axiosInstance: AxiosInstance,
  page: number = 0,
): Promise<BeatSaverSearchResult | null> {
  try {

    const response = await axiosInstance.get(`/search/text/${page}?q=${encodeURIComponent(searchString)}`);
    return response.data as BeatSaverSearchResult;
    
  } catch (err) {
    const response = err.response;
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${err.response.headers['x-ratelimit-reset-after']} seconds.`);
    if (response.status !== 200) throw new Error('Unknown error. Please contact rui2015.');
    throw err;
  }
}

export default searchMap;
