import { PluginExpose } from '@delta-comic/plugin';
import { Component } from 'vue';
import { default as Children } from './components/comment/Children.vue';
import { default as Comment } from './components/comment/Comment.vue';
import { default as CommentRow } from './components/comment/CommentRow.vue';
import { default as Sender } from './components/comment/Sender.vue';
import { default as CreateFavouriteCard } from './components/CreateFavouriteCard.vue';
import { default as FavouriteSelect } from './components/FavouriteSelect.vue';
import { default as ItemCard } from './components/ItemCard.vue';
import { default as ShareButton } from './components/ShareButton.vue';
import { default as PreviewUser } from './components/user/PreviewUser.vue';
import { default as Default } from './layout/Default.vue';
import { createDateString } from './utils/date';
import { default as Image } from './view/Image.vue';
import { default as Video } from './view/Video.vue';
import type * as DefaultLayoutInject from './layout/default';
import * as model from './model';
import type * as ImageViewInject from './view/image';
import type * as VideoViewInject from './view/video';
declare module '@delta-comic/plugin' {
    interface GlobalInjections {
        'layout::view::image.top-bar': Component<ImageViewInject.BarProps>;
        'layout::view::image.content': Component<ImageViewInject.ContentProps>;
        'layout::view::image.bottom-bar': Component<ImageViewInject.BarProps>;
        'layout::view::video.top-bar': Component<VideoViewInject.BarProps>;
        'layout::view::video.center-bar': Component<VideoViewInject.BarProps>;
        'layout::view::video.bottom-bar': Component<VideoViewInject.BarProps>;
        'layout::view::video.content': Component<VideoViewInject.BarProps>;
        'layout::layout::default.subscribe-row': Component<DefaultLayoutInject.SubscribeRowProps>;
        'layout::layout::default.action': Component<DefaultLayoutInject.ContentProps>;
        'layout::layout::default.description': Component<DefaultLayoutInject.ContentProps>;
        'layout::layout::default.recommend': Component<DefaultLayoutInject.ContentProps>;
        'layout::layout::default.tab': Component<DefaultLayoutInject.TabProps>;
    }
}
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
            previewUser: typeof PreviewUser;
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
