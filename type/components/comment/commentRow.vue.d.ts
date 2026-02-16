import { uni } from '@delta-comic/model';
type __VLS_Props = {
    comment: uni.comment.Comment;
    parentComment?: uni.comment.Comment;
    usernameHighlight?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        default(): void;
        userExtra(): void;
    }> & {
        default(): void;
        userExtra(): void;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (c: uni.comment.Comment) => any;
    clickUser: (u: uni.user.User) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((c: uni.comment.Comment) => any) | undefined;
    onClickUser?: ((u: uni.user.User) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
