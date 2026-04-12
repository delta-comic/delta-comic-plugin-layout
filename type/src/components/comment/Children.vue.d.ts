import { uni } from '@delta-comic/model';
type __VLS_Props = {
    item: uni.item.Item;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {
    loadChild(parent: uni.comment.Comment): void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    user: (u: uni.user.User) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onUser?: (u: uni.user.User) => any;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    floatPopup: {
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly show: boolean;
            readonly overlay?: boolean;
            readonly lockScroll?: boolean;
            readonly lazyRender?: boolean;
            readonly transitionAppear?: boolean;
            readonly closeOnClickOverlay?: boolean;
            readonly round?: boolean;
            readonly position?: import('vant').PopupPosition;
            readonly closeIcon?: string;
            readonly closeable?: boolean;
            readonly closeOnPopstate?: boolean;
            readonly closeIconPosition?: import('vant').PopupCloseIconPosition;
            readonly destroyOnClose?: boolean;
            readonly safeAreaInsetTop?: boolean;
            readonly safeAreaInsetBottom?: boolean;
            readonly zIndex?: string | number;
            readonly duration?: string | number;
            readonly teleport?: string | import('vue').RendererElement;
            readonly beforeClose?: import('vant/lib/utils').Interceptor;
            readonly overlayProps?: Partial<import('vant').OverlayProps>;
            readonly overlayStyle?: import('vue').CSSProperties;
            readonly overlayClass?: unknown;
            readonly transition?: string;
            readonly iconPrefix?: string;
            readonly style?: import('vue').StyleValue;
            readonly class?: any;
            readonly onClosed?: (() => any) | undefined;
            readonly "onUpdate:show"?: ((value: boolean) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: import('vue').Attrs;
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any>;
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
            zIndex?: string | number;
            duration?: string | number;
            teleport?: string | import('vue').RendererElement;
            beforeClose?: import('vant/lib/utils').Interceptor;
            overlayProps?: Partial<import('vant').OverlayProps>;
            overlayStyle?: import('vue').CSSProperties;
            overlayClass?: unknown;
            transition?: string;
            iconPrefix?: string;
        } & import('@delta-comic/ui').StyleProps>> & Readonly<{
            onClosed?: (() => any) | undefined;
            "onUpdate:show"?: ((value: boolean) => any) | undefined;
        }>, {
            zIndex: import('vue').ComputedRef<number>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            closed: () => any;
            "update:show": (value: boolean) => any;
        }, string, {
            teleport: string | import('vue').RendererElement | null;
            closeOnClickOverlay: boolean;
            overlay: boolean;
            position: import('vant').PopupPosition;
            destroyOnClose: boolean;
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
        teleport: string | import('vue').RendererElement | null;
        closeOnClickOverlay: boolean;
        overlay: boolean;
        position: import('vant').PopupPosition;
        destroyOnClose: boolean;
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
        zIndex?: string | number;
        duration?: string | number;
        teleport?: string | import('vue').RendererElement;
        beforeClose?: import('vant/lib/utils').Interceptor;
        overlayProps?: Partial<import('vant').OverlayProps>;
        overlayStyle?: import('vue').CSSProperties;
        overlayClass?: unknown;
        transition?: string;
        iconPrefix?: string;
    } & import('@delta-comic/ui').StyleProps>> & Readonly<{
        onClosed?: (() => any) | undefined;
        "onUpdate:show"?: ((value: boolean) => any) | undefined;
    }>, "zIndex" | "overlay" | "teleport" | "closeOnClickOverlay" | "position" | "destroyOnClose"> & {
        zIndex: number;
    } & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Readonly<{
            default(): void;
        }> & {
            default(): void;
        };
    };
}, any>;
export default _default;
