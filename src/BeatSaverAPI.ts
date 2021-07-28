import axios, { AxiosInstance } from 'axios';
import { valid } from 'semver';
import getMapDetailsByHash from './api/getMapDetailsByHash';
import getMapDetailsByKey from './api/getMapDetailsByKey';
import getMapsByUploader from './api/getMapsByUploader';
import getMapsSortedByDownloads from './api/getMapsSortedByDownloads';
import getMapsSortedByHot from './api/getMapsSortedByHot';
import getMapsSortedByLatest from './api/getMapsSortedByLatest';
import getMapsSortedByPlays from './api/getMapsSortedByPlays';
import getMapsSortedByRating from './api/getMapsSortedByRating';
import searchMap from './api/searchMap';

interface BeatSaverAPIOptions {
  AppName: string;
  Version: string;
}

class BeatSaverAPI {
  private appName: string;
  private appVersion: string;
  private axiosInstance: AxiosInstance;

  constructor(options: BeatSaverAPIOptions) {
    this.appName = options.AppName;

    const appVersionSemVer = valid(options.Version);
    if (!appVersionSemVer) throw new Error('Invalid App Version. App Version needs to be valid SemVer.');
    this.appVersion = appVersionSemVer;

    this.axiosInstance = axios.create({
      baseURL: 'https://beatsaver.com/api',
      headers: {
        'User-Agent': `${this.appName}/${this.appVersion}`,
      },
    });
  }

  public async getMapDetailsByKey(key: string) {
    return getMapDetailsByKey(key, this.axiosInstance);
  }

  public async getMapDetailsByHash(hash: string) {
    return getMapDetailsByHash(hash, this.axiosInstance);
  }

  public async getMapsByUploader(userID: string, page: number = 0) {
    return getMapsByUploader(userID, this.axiosInstance, page);
  }

  public async getMapsSortedByDownloads(page: number = 0) {
    return getMapsSortedByDownloads(this.axiosInstance, page);
  }

  public async getMapsSortedByHot(page: number = 0) {
    return getMapsSortedByHot(this.axiosInstance, page);
  }

  public async getMapsSortedByLatest(page: number = 0) {
    return getMapsSortedByLatest(this.axiosInstance, page);
  }

  public async getMapsSortedByPlays(page: number = 0) {
    return getMapsSortedByPlays(this.axiosInstance, page);
  }

  public async getMapsSortedByRating(page: number = 0) {
    return getMapsSortedByRating(this.axiosInstance, page);
  }

  public async searchMap(searchString: string, page: number = 0) {
    return searchMap(searchString, this.axiosInstance, page);
  }

  public async downloadMapByHash(hash: string, directory: string) {
    const { default: downloadMapByHash } = await import('./api/downloadMapByHash');
    return downloadMapByHash(hash, directory, this.axiosInstance);
  }

  public async downloadMapByKey(key: string, directory: string) {
    const { default: downloadMapByKey } = await import('./api/downloadMapByKey');
    return downloadMapByKey(key, directory, this.axiosInstance);
  }
}

export = BeatSaverAPI;
