import { AxiosInstance } from 'axios';
import * as path from 'path';
import * as fs from 'fs';

async function downloadMapByHash(hash: string, directory: string, axiosInstance: AxiosInstance): Promise<void> {
  try {
    const response = await axiosInstance.get(`/download/hash/${hash}`, { responseType: 'blob' });

    if (response.status === 404) throw new Error('Song not found.');
    if (response.status === 429)
      throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    if (response.status !== 200) throw new Error('Unknown error. Please contact rui2015.');

    await response.data.pipe(fs.createWriteStream(path.resolve(directory, `${hash}.zip`)));

    return;
  } catch (err) {
    throw new Error(err);
  }
}

export default downloadMapByHash;
