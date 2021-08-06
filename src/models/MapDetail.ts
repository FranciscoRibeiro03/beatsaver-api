export interface MapDetail {
    automapper: boolean,
    curator: string,
    description: string,
    id: string,
    metadata: MapDetailMetadata,
    name: string,
    qualified: boolean,
    ranked: boolean,
    stats: MapStats,
    uploaded: Instant,
    uploader: UserDetail,
    versions: MapVersion[]
}