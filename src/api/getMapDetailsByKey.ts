import { AxiosInstance } from 'axios';
import { BeatSaverSong } from '../types/BeatSaverSong';

async function getMapDetailsByKey(key: string, axiosInstance: AxiosInstance): Promise<BeatSaverSong | null> {
  try {

    const response = await axiosInstance.get(`/maps/detail/${key}`);
    return response.data as BeatSaverSong;

  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new Error(`Song with key ${key} not found.`);
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default getMapDetailsByKey;
