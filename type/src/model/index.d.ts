import { uni } from '@delta-comic/model';
import { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack';
export declare abstract class ContentImagePage extends uni.content.ContentPage {
    abstract fetchImages: (signal?: AbortSignal) => Promise<uni.image.Image[]>;
}
export type VideoConfig = {
    textTrack?: TextTrackInit[];
} & Exclude<MediaSrc, string | AudioSrc>[];
export declare abstract class ContentVideoPage extends uni.content.ContentPage {
    abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>;
}
