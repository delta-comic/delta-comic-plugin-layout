import { uni } from '@delta-comic/model';
export interface SubscribeRowProps {
    page: uni.content.ContentPage;
    author: uni.item.Author;
    isSubscribe?: boolean;
    type: 'small' | 'common';
}
export interface TabProps {
    page: uni.content.ContentPage;
}
export interface ContentProps {
    page: uni.content.ContentPage;
    item?: uni.item.Item;
}
