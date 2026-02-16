import { ConfigPointer } from '@delta-comic/plugin';
export declare const imageViewConfig: ConfigPointer<{
    doubleImage: {
        type: "switch";
        defaultValue: false;
        info: string;
    };
    preloadImages: {
        type: "number";
        defaultValue: number;
        info: string;
        range: [number, number];
        float: false;
    };
    isFollowView: {
        type: "switch";
        defaultValue: false;
        info: string;
    };
}>;
