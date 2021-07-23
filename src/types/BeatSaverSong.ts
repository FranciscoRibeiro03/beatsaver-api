interface BeatSaverSongDifficulty {
  duration: number;
  length: number;
  njs: number;
  njsOffset: number;
  bombs: number;
  notes: number;
  obstacles: number;
}

interface BeatSaverSongCharacteristic {
  difficulties: {
    easy: null | BeatSaverSongDifficulty;
    expert: null | BeatSaverSongDifficulty;
    expertPlus: null | BeatSaverSongDifficulty;
    hard: null | BeatSaverSongDifficulty;
    normal: null | BeatSaverSongDifficulty;
  };
  name: string;
}

interface BeatSaverSongMetadata {
  difficulties: {
    easy: boolean;
    expert: boolean;
    expertPlus: boolean;
    hard: boolean;
    normal: boolean;
  };
  duration: number;
  automapper: string | null;
  characteristics: BeatSaverSongCharacteristic[];
  levelAuthorName: string;
  songAuthorName: string;
  songName: string;
  songSubName: string;
  bpm: number;
}

interface BeatSaverSongStats {
  downloads: number;
  plays: number;
  downVotes: number;
  upVotes: number;
  heat: number;
  rating: number;
}

interface BeatSaverSongUploader {
  _id: string;
  username: string;
}

export class BeatSaverSong {
  public metadata?: BeatSaverSongMetadata;
  public stats?: BeatSaverSongStats;
  public description?: string;
  public deletedAt?: string;
  public _id?: string;
  public key?: string;
  public name?: string;
  public uploader?: BeatSaverSongUploader;
  public hash?: string;
  public uploaded?: string;
  public directDownload?: string;
  public downloadURL?: string;
  public coverURL?: string;
}
