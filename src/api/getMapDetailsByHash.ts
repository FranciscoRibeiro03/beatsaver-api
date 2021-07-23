import { AxiosInstance } from 'axios';
import { BeatSaverSong } from '../types/BeatSaverSong';

async function getMapDetailsByHash(hash: string, axiosInstance: AxiosInstance): Promise<BeatSaverSong | null> {
  try {

    const response = await axiosInstance.get(`/maps/by-hash/${hash}`);
    return response.data as BeatSaverSong;
    
  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new Error(`Song with hash ${hash} not found.`);
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default getMapDetailsByHash;
