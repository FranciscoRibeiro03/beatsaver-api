import * as stream from 'stream';
import { promisify } from 'util';
import * as fs from 'fs';
import { AxiosInstance } from 'axios';

const finished = promisify(stream.finished);

export async function downloadFile(
  fileUrl: string,
  outputLocationPath: string,
  axiosInstance: AxiosInstance,
): Promise<any> {
  const writer = fs.createWriteStream(outputLocationPath);
  return axiosInstance({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(async (response) => {
    response.data.pipe(writer);
    return finished(writer);
  });
}
