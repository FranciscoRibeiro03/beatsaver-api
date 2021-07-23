import { AxiosInstance } from 'axios';
import { BeatSaverSong } from '../types/BeatSaverSong';

async function getMapDetailsByKey(key: string, axiosInstance: AxiosInstance): Promise<BeatSaverSong | null> {
  try {
    const response = await axiosInstance.get(`/maps/detail/${key}`);

    if (response.status === 404) throw new Error('Song not found.');
    if (response.status === 429)
      throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    if (response.status !== 200) throw new Error('Unknown error. Please contact rui2015.');

    return response.data as BeatSaverSong;
  } catch (err) {
    throw new Error(err);
  }
}

export default getMapDetailsByKey;
