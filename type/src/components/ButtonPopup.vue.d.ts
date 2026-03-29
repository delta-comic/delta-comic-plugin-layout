import { PopupProps } from 'vant';
type __VLS_Props = Partial<PopupProps> & {
    class: any;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        button(): void;
        default(): void;
    }> & {
        button(): void;
        default(): void;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    overlay: boolean;
    closeOnClickOverlay: boolean;
    round: boolean;
    position: import('vant').PopupPosition;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
