import { PluginExpose } from '@delta-comic/plugin';
import { default as Children } from './components/comment/children.vue';
import { default as Comment } from './components/comment/Comment.vue';
import { default as CommentRow } from './components/comment/commentRow.vue';
import { default as Sender } from './components/comment/sender.vue';
import { default as CreateFavouriteCard } from './components/CreateFavouriteCard.vue';
import { default as FavouriteSelect } from './components/FavouriteSelect.vue';
import { default as ItemCard } from './components/ItemCard.vue';
import { default as ShareButton } from './components/ShareButton.vue';
import { default as Default } from './layout/default.vue';
import { createDateString } from './utils/date';
import { default as Image } from './view/image.vue';
import { default as Video } from './view/video.vue';
import * as model from './model';
declare const plugin: Promise<{
    name: string;
    onBooted: () => {
        view: {
            Image: typeof Image;
            Video: typeof Video;
        };
        layout: {
            Default: typeof Default;
        };
        model: typeof model;
        component: {
            ShareButton: typeof ShareButton;
            ItemCard: typeof ItemCard;
            FavouriteSelect: typeof FavouriteSelect;
            CreateFavouriteCard: typeof CreateFavouriteCard;
            comment: {
                Comment: typeof Comment;
                Children: typeof Children;
                Sender: typeof Sender;
                CommentRow: typeof CommentRow;
            };
        };
        helper: {
            createDateString: typeof createDateString;
        };
    };
    config: import('@delta-comic/plugin').ConfigPointer<{
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
    }>[];
}>;
export type LayoutLib = PluginExpose<() => typeof plugin>;
export {};
