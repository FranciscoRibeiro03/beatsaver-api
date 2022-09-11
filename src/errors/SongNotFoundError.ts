type SearchType = 'ID' | 'hash';

export default class SongNotFoundError extends Error {
  constructor(type: SearchType, idOrHash: string) {
    super(`Song with ${type} ${idOrHash} not found.`);
    this.name = 'SongNotFoundError';
  }
}
