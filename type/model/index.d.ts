import { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack';
import { uni } from '@delta-comic/model';
export declare abstract class ContentImagePage extends uni.content.ContentPage {
    images: import('@delta-comic/model').PromiseWithResolvers<uni.image.Image[]>;
}
export type VideoConfig = {
    textTrack?: TextTrackInit[];
} & Exclude<MediaSrc, string | AudioSrc>[];
export declare abstract class ContentVideoPage extends uni.content.ContentPage {
    videos: import('@delta-comic/model').PromiseWithResolvers<VideoConfig>;
}
