export default class PlaylistNotFoundError extends Error {
  constructor(id: number) {
    super(`Song with ID ${id} not found.`);
    this.name = 'PlaylistNotFoundError';
  }
}
