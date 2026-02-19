import { uni } from '@delta-comic/model';
type __VLS_Props = {
    item: uni.item.Item;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    loadChild(parent: uni.comment.Comment): void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    user: (u: uni.user.User) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onUser?: ((u: uni.user.User) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    floatPopup: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly show: boolean;
            readonly overlay?: boolean | undefined;
            readonly lockScroll?: boolean | undefined;
            readonly lazyRender?: boolean | undefined;
            readonly transitionAppear?: boolean | undefined;
            readonly closeOnClickOverlay?: boolean | undefined;
            readonly round?: boolean | undefined;
            readonly position?: import('vant').PopupPosition | undefined;
            readonly closeIcon?: string | undefined;
            readonly closeable?: boolean | undefined;
            readonly closeOnPopstate?: boolean | undefined;
            readonly closeIconPosition?: import('vant').PopupCloseIconPosition | undefined;
            readonly destroyOnClose?: boolean | undefined;
            readonly safeAreaInsetTop?: boolean | undefined;
            readonly safeAreaInsetBottom?: boolean | undefined;
            readonly iconPrefix?: string | undefined;
            readonly transition?: string | undefined;
            readonly zIndex?: string | number | undefined;
            readonly duration?: string | number | undefined;
            readonly teleport?: string | import('vue').RendererElement | null | undefined;
            readonly beforeClose?: import('vant/lib/utils').Interceptor | undefined;
            readonly overlayProps?: Partial<import('vant').OverlayProps> | undefined;
            readonly overlayStyle?: import('vue').CSSProperties | undefined;
            readonly overlayClass?: unknown;
            readonly noBorder?: boolean | undefined;
            readonly useTrulyShow?: boolean | undefined;
            readonly style?: import('vue').StyleValue;
            readonly onClosed?: (() => any) | undefined | undefined;
            readonly "onUpdate:show"?: ((value: boolean) => any) | undefined | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "closed") => void) & ((event: "update:show", value: boolean) => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<{
            show: boolean;
        } & Partial<{
            show: boolean;
            overlay: boolean;
            lockScroll: boolean;
            lazyRender: boolean;
            transitionAppear: boolean;
            closeOnClickOverlay: boolean;
            round: boolean;
            position: import('vant').PopupPosition;
            closeIcon: string;
            closeable: boolean;
            closeOnPopstate: boolean;
            closeIconPosition: import('vant').PopupCloseIconPosition;
            destroyOnClose: boolean;
            safeAreaInsetTop: boolean;
            safeAreaInsetBottom: boolean;
        } & {
            iconPrefix?: string | undefined;
            transition?: string | undefined;
            zIndex?: string | number | undefined;
            duration?: string | number | undefined;
            teleport?: string | import('vue').RendererElement | null | undefined;
            beforeClose?: import('vant/lib/utils').Interceptor | undefined;
            overlayProps?: Partial<import('vant').OverlayProps> | undefined;
            overlayStyle?: import('vue').CSSProperties | undefined;
            overlayClass?: unknown;
        } & {
            noBorder?: boolean;
            useTrulyShow: boolean;
            style?: import('vue').StyleValue;
        }>> & Readonly<{
            onClosed?: (() => any) | undefined;
            "onUpdate:show"?: ((value: boolean) => any) | undefined;
        }>, {
            zIndex: import('vue').ComputedRef<number>;
            trulyShow: import('vue').ShallowRef<boolean, boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            closed: () => any;
            "update:show": (value: boolean) => any;
        }, string, {
            position: import('vant').PopupPosition;
            noBorder: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        position: import('vant').PopupPosition;
        noBorder: boolean;
    }> & Omit<Readonly<{
        show: boolean;
    } & Partial<{
        show: boolean;
        overlay: boolean;
        lockScroll: boolean;
        lazyRender: boolean;
        transitionAppear: boolean;
        closeOnClickOverlay: boolean;
        round: boolean;
        position: import('vant').PopupPosition;
        closeIcon: string;
        closeable: boolean;
        closeOnPopstate: boolean;
        closeIconPosition: import('vant').PopupCloseIconPosition;
        destroyOnClose: boolean;
        safeAreaInsetTop: boolean;
        safeAreaInsetBottom: boolean;
    } & {
        iconPrefix?: string | undefined;
        transition?: string | undefined;
        zIndex?: string | number | undefined;
        duration?: string | number | undefined;
        teleport?: string | import('vue').RendererElement | null | undefined;
        beforeClose?: import('vant/lib/utils').Interceptor | undefined;
        overlayProps?: Partial<import('vant').OverlayProps> | undefined;
        overlayStyle?: import('vue').CSSProperties | undefined;
        overlayClass?: unknown;
    } & {
        noBorder?: boolean;
        useTrulyShow: boolean;
        style?: import('vue').StyleValue;
    }>> & Readonly<{
        onClosed?: (() => any) | undefined;
        "onUpdate:show"?: ((value: boolean) => any) | undefined;
    }>, "zIndex" | "position" | "noBorder" | "trulyShow"> & import('vue').ShallowUnwrapRef<{
        zIndex: import('vue').ComputedRef<number>;
        trulyShow: import('vue').ShallowRef<boolean, boolean>;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Readonly<{
            default(): void;
        }> & {
            default(): void;
        };
    }) | null;
}, any>;
export default _default;
