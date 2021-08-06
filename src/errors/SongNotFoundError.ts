export default class SongNotFoundError extends Error {
  constructor(type: string, idOrHash: string) {
    super(`Song with ${type} ${idOrHash} not found.`);
    this.name = 'SongNotFoundError';
  }
}
