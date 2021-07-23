import { BeatSaverSong } from './BeatSaverSong';

export class BeatSaverSearchResult {
  public docs: BeatSaverSong[] = [];
  public totalDocs?: number;
  public lastPage?: number;
  public prevPage?: number;
  public nextPage?: number;
}
