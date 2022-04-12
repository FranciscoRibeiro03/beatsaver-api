import { MapDetailWithOrder } from "./MapDetailWithOrder";
import { PlaylistFull } from "./PlaylistFull";

export interface PlaylistPage {
    maps: MapDetailWithOrder[];
    playlist: PlaylistFull;
}