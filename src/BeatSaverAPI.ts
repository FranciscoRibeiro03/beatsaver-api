import axios, { AxiosInstance } from 'axios';
import { valid } from 'semver';
import isNode from 'detect-node';

import { getMapByID, getMapByHash, getMapsByUploader, getLatestMaps } from './api/maps';
import { searchMaps, SearchOptions } from './api/search';

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
      baseURL: 'https://api.beatsaver.com',
      headers: !isNode
        ? {}
        : {
            'User-Agent': `${this.appName}/${this.appVersion}`,
          },
    });
  }

  public async getMapByID(id: string) {
    return getMapByID(this.axiosInstance, id);
  }

  public async getMapByHash(hash: string) {
    return getMapByHash(this.axiosInstance, hash);
  }

  public async getMapsByUploader(userID: number, page: number = 0) {
    return getMapsByUploader(this.axiosInstance, userID, page);
  }

  public async getLatestMaps(automapper: boolean, before?: string) {
    return getLatestMaps(this.axiosInstance, automapper, before);
  }

  public async searchMaps(searchOptions: SearchOptions, page: number = 0) {
    return searchMaps(this.axiosInstance, searchOptions, page);
  }
}

export = BeatSaverAPI;
