import { Instant } from "./Instant";

export interface MapVersion {
    coverURL: string,
    createdAt: Instant,
    diffs: MapDifficulty[],
    downloadURL: string,
    feedback: string,
    hash: string,
    key: string,
    previewURL: string,
    sageScore: number,
    state: string,
    testplayAt: Instant,
    testplays: MapTestplay[]
}