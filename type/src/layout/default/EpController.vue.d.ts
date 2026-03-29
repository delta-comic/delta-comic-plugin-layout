import { uni } from '@delta-comic/model';
import { NScrollbar } from 'naive-ui';
type __VLS_Props = {
    union?: uni.item.Item;
    page: uni.content.ContentPage;
    isR18g?: boolean;
    scrollbar: InstanceType<typeof NScrollbar> | null;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    epSelList: import('vue').ShallowUnwrapRef<{
        scrollTop: import('vue').WritableComputedRef<number, number>;
        listInstance: import('vue').Ref<import('naive-ui').VirtualListInst>;
    }> | null;
}, any>;
export default _default;
