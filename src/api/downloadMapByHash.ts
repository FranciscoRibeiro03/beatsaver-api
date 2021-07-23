import { AxiosInstance } from 'axios';
import { existsSync, unlinkSync } from 'fs';
import * as path from 'path';
import { downloadFile } from '../utils/Utils';

async function downloadMapByHash(hash: string, directory: string, axiosInstance: AxiosInstance): Promise<string> {
  const fileLocation = path.resolve(directory, `${hash}.zip`);

  try {
    await downloadFile(`/download/hash/${hash}`, fileLocation, axiosInstance);
    return fileLocation;
  } catch (err) {
    if (!existsSync(fileLocation)) unlinkSync(fileLocation);
    const response = err.response;
    if (response.status === 404) throw new Error(`Song with hash ${hash} not found.`);
    if (response.status === 429)
      throw new Error(`Rate limit exceeded. Please wait ${response.headers['x-ratelimit-reset-after']} seconds.`);
    throw new Error(err);
  }
}

export default downloadMapByHash;
