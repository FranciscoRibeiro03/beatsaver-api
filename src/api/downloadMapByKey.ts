import { AxiosInstance } from 'axios';
import * as path from 'path';
import * as fs from 'fs';

async function downloadMapByKey(key: string, directory: string, axiosInstance: AxiosInstance): Promise<void> {
  try {

    const response = await axiosInstance.get(`/download/key/${key}`, { responseType: 'blob' });
    await response.data.pipe(fs.createWriteStream(path.resolve(directory, `${key}.zip`)));

  } catch (err) {
    const response = err.response;
    if (response.status === 404) throw new Error('Song not found.');
    if (response.status === 429) throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default downloadMapByKey;
