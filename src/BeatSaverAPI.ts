import axios, { AxiosInstance } from 'axios';
import { valid } from 'semver';
import isNode from 'detect-node';

import { getMapByID, getMapByHash, getMapsByUploader, getLatestMaps } from './api/maps';
import { getLatestPlaylists, getPlaylistByID, getPlaylistsByUser } from './api/playlists';
import { searchMaps, SearchOptions } from './api/search';

import RateLimitError from './errors/RateLimitError';
import SongNotFoundError from './errors/SongNotFoundError';
import PlaylistNotFoundError from './errors/PlaylistNotFoundError';

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

  public static get Errors() {
    return {
      RateLimitError,
      SongNotFoundError,
      PlaylistNotFoundError,
    };
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

  public async getLatestPlaylists(after: string, before: string, sort: 'UPDATED' | 'SONGS_UPDATED' | 'CREATED') {
    return getLatestPlaylists(this.axiosInstance, after, before, sort);
  }

  public async getPlaylistByID(id: number, page: number = 0) {
    return getPlaylistByID(this.axiosInstance, id, page);
  }

  public async getPlaylistsByUser(userID: number, page: number = 0) {
    return getPlaylistsByUser(this.axiosInstance, userID, page);
  }
}

export = BeatSaverAPI;
