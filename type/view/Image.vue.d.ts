import { uni } from '@delta-comic/model';
import { ContentImagePage } from '../model';
import type * as ImageViewInject from './image';
type __VLS_Props = {
    page: ContentImagePage;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        topBar(args: ImageViewInject.BarProps): any;
        content(args: ImageViewInject.ContentProps): any;
        bottomBar(args: ImageViewInject.BarProps): any;
    }> & {
        topBar(args: ImageViewInject.BarProps): any;
        content(args: ImageViewInject.ContentProps): any;
        bottomBar(args: ImageViewInject.BarProps): any;
    };
    refs: {
        imgIns: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly src?: uni.image.Image_ | undefined;
                readonly alt?: string | undefined;
                readonly previewable?: boolean | undefined;
                readonly retryMax?: number | undefined;
                readonly round?: boolean | undefined;
                readonly fit?: "fill" | "none" | "cover" | "contain" | "scale-down" | undefined;
                readonly class?: any;
                readonly hideLoading?: boolean | undefined;
                readonly hideError?: boolean | undefined;
                readonly inline?: boolean | undefined;
                readonly style?: import('vue').StyleValue;
                readonly imgProp?: import('vue').ImgHTMLAttributes | undefined;
                readonly useList?: {
                    loaded: Set<string>;
                    error: Set<string>;
                } | undefined;
                readonly fetchpriority?: "high" | "low" | "auto" | undefined;
                readonly fallback?: uni.image.Image_ | undefined;
                readonly onLoad?: ((...args: any[]) => any) | undefined | undefined;
                readonly onClick?: (() => any) | undefined | undefined;
                readonly onError?: (() => any) | undefined | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            } & {
                img: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                    onPreviewPrev: import('vue').PropType<() => void>;
                    onPreviewNext: import('vue').PropType<() => void>;
                    showToolbar: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    showToolbarTooltip: BooleanConstructor;
                    renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                    theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>;
                    themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    alt: StringConstructor;
                    height: import('vue').PropType<string | number>;
                    imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    lazy: BooleanConstructor;
                    intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                    objectFit: {
                        type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                        default: string;
                    };
                    previewSrc: StringConstructor;
                    fallbackSrc: StringConstructor;
                    width: import('vue').PropType<string | number>;
                    src: StringConstructor;
                    previewDisabled: BooleanConstructor;
                    loadDescription: StringConstructor;
                    onError: import('vue').PropType<(e: Event) => void>;
                    onLoad: import('vue').PropType<(e: Event) => void>;
                }>> & Readonly<{}>, {
                    click: () => void;
                    showPreview: () => void;
                    mergedClsPrefix: import('vue').Ref<string, string>;
                    groupId: string | undefined;
                    previewInstRef: import('vue').Ref<{
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null, import('naive-ui').ImagePreviewInst | {
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null>;
                    imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                    mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                    showError: import('vue').Ref<boolean, boolean>;
                    shouldStartLoading: import('vue').Ref<boolean, boolean>;
                    loaded: import('vue').Ref<boolean, boolean>;
                    mergedOnClick: (e: PointerEvent) => void;
                    onPreviewClose: () => void;
                    mergedOnError: (e: Event) => void;
                    mergedOnLoad: (e: Event) => void;
                    previewShow: import('vue').Ref<boolean, boolean>;
                }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
                    objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                    lazy: boolean;
                    showToolbar: boolean;
                    showToolbarTooltip: boolean;
                    previewDisabled: boolean;
                }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
                    P: {};
                    B: {};
                    D: {};
                    C: {};
                    M: {};
                    Defaults: {};
                }, Readonly<import('vue').ExtractPropTypes<{
                    onPreviewPrev: import('vue').PropType<() => void>;
                    onPreviewNext: import('vue').PropType<() => void>;
                    showToolbar: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    showToolbarTooltip: BooleanConstructor;
                    renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                    theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>;
                    themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    alt: StringConstructor;
                    height: import('vue').PropType<string | number>;
                    imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    lazy: BooleanConstructor;
                    intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                    objectFit: {
                        type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                        default: string;
                    };
                    previewSrc: StringConstructor;
                    fallbackSrc: StringConstructor;
                    width: import('vue').PropType<string | number>;
                    src: StringConstructor;
                    previewDisabled: BooleanConstructor;
                    loadDescription: StringConstructor;
                    onError: import('vue').PropType<(e: Event) => void>;
                    onLoad: import('vue').PropType<(e: Event) => void>;
                }>> & Readonly<{}>, {
                    click: () => void;
                    showPreview: () => void;
                    mergedClsPrefix: import('vue').Ref<string, string>;
                    groupId: string | undefined;
                    previewInstRef: import('vue').Ref<{
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null, import('naive-ui').ImagePreviewInst | {
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null>;
                    imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                    mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                    showError: import('vue').Ref<boolean, boolean>;
                    shouldStartLoading: import('vue').Ref<boolean, boolean>;
                    loaded: import('vue').Ref<boolean, boolean>;
                    mergedOnClick: (e: PointerEvent) => void;
                    onPreviewClose: () => void;
                    mergedOnError: (e: Event) => void;
                    mergedOnLoad: (e: Event) => void;
                    previewShow: import('vue').Ref<boolean, boolean>;
                }, {}, {}, {}, {
                    objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                    lazy: boolean;
                    showToolbar: boolean;
                    showToolbarTooltip: boolean;
                    previewDisabled: boolean;
                }> | null;
            };
            $slots: Readonly<{
                [name: string]: import('vue').Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: ((event: "error") => void) & ((event: "click") => void) & ((event: "load", ...args: any[]) => void);
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<{
                src?: uni.image.Image_;
                alt?: string;
                previewable?: boolean;
                retryMax?: number;
                round?: boolean;
                fit?: import('naive-ui').ImageProps["objectFit"];
                class?: any;
                hideLoading?: boolean;
                hideError?: boolean;
                inline?: boolean;
                style?: import('vue').StyleValue;
                imgProp?: import('vue').ImgHTMLAttributes;
                useList?: {
                    loaded: Set<string>;
                    error: Set<string>;
                };
                fetchpriority?: "high" | "low" | "auto";
                fallback?: uni.image.Image_;
            }> & Readonly<{
                onLoad?: ((...args: any[]) => any) | undefined;
                onClick?: (() => any) | undefined;
                onError?: (() => any) | undefined;
            }>, {
                isLoaded: import('vue').ComputedRef<boolean>;
                imageEl: import('vue').ComputedRef<HTMLImageElement | null | undefined>;
                imageIns: Readonly<import('vue').ShallowRef<import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                    onPreviewPrev: import('vue').PropType<() => void>;
                    onPreviewNext: import('vue').PropType<() => void>;
                    showToolbar: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    showToolbarTooltip: BooleanConstructor;
                    renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                    theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>;
                    themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    alt: StringConstructor;
                    height: import('vue').PropType<string | number>;
                    imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    lazy: BooleanConstructor;
                    intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                    objectFit: {
                        type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                        default: string;
                    };
                    previewSrc: StringConstructor;
                    fallbackSrc: StringConstructor;
                    width: import('vue').PropType<string | number>;
                    src: StringConstructor;
                    previewDisabled: BooleanConstructor;
                    loadDescription: StringConstructor;
                    onError: import('vue').PropType<(e: Event) => void>;
                    onLoad: import('vue').PropType<(e: Event) => void>;
                }>> & Readonly<{}>, {
                    click: () => void;
                    showPreview: () => void;
                    mergedClsPrefix: import('vue').Ref<string, string>;
                    groupId: string | undefined;
                    previewInstRef: import('vue').Ref<{
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null, import('naive-ui').ImagePreviewInst | {
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null>;
                    imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                    mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                    showError: import('vue').Ref<boolean, boolean>;
                    shouldStartLoading: import('vue').Ref<boolean, boolean>;
                    loaded: import('vue').Ref<boolean, boolean>;
                    mergedOnClick: (e: PointerEvent) => void;
                    onPreviewClose: () => void;
                    mergedOnError: (e: Event) => void;
                    mergedOnLoad: (e: Event) => void;
                    previewShow: import('vue').Ref<boolean, boolean>;
                }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
                    objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                    lazy: boolean;
                    showToolbar: boolean;
                    showToolbarTooltip: boolean;
                    previewDisabled: boolean;
                }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
                    P: {};
                    B: {};
                    D: {};
                    C: {};
                    M: {};
                    Defaults: {};
                }, Readonly<import('vue').ExtractPropTypes<{
                    onPreviewPrev: import('vue').PropType<() => void>;
                    onPreviewNext: import('vue').PropType<() => void>;
                    showToolbar: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    showToolbarTooltip: BooleanConstructor;
                    renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                    theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>;
                    themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                        toolbarIconColor: string;
                        toolbarColor: string;
                        toolbarBoxShadow: string;
                        toolbarBorderRadius: string;
                    }, {
                        Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                            borderRadius: string;
                            boxShadow: string;
                            color: string;
                            textColor: string;
                            padding: string;
                        }, {
                            Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                                fontSize: string;
                                borderRadius: string;
                                color: string;
                                dividerColor: string;
                                textColor: string;
                                boxShadow: string;
                                space: string;
                                spaceArrow: string;
                                arrowOffset: string;
                                arrowOffsetVertical: string;
                                arrowHeight: string;
                                padding: string;
                            }, {
                                Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                    height: string;
                                    width: string;
                                    borderRadius: string;
                                    color: string;
                                    colorHover: string;
                                    railInsetHorizontalBottom: string;
                                    railInsetHorizontalTop: string;
                                    railInsetVerticalRight: string;
                                    railInsetVerticalLeft: string;
                                    railColor: string;
                                }, any>;
                            }>;
                        }>;
                    }>>>;
                    alt: StringConstructor;
                    height: import('vue').PropType<string | number>;
                    imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                    lazy: BooleanConstructor;
                    intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                    objectFit: {
                        type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                        default: string;
                    };
                    previewSrc: StringConstructor;
                    fallbackSrc: StringConstructor;
                    width: import('vue').PropType<string | number>;
                    src: StringConstructor;
                    previewDisabled: BooleanConstructor;
                    loadDescription: StringConstructor;
                    onError: import('vue').PropType<(e: Event) => void>;
                    onLoad: import('vue').PropType<(e: Event) => void>;
                }>> & Readonly<{}>, {
                    click: () => void;
                    showPreview: () => void;
                    mergedClsPrefix: import('vue').Ref<string, string>;
                    groupId: string | undefined;
                    previewInstRef: import('vue').Ref<{
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null, import('naive-ui').ImagePreviewInst | {
                        setThumbnailEl: (e: HTMLImageElement | null) => void;
                    } | null>;
                    imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                    mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                    showError: import('vue').Ref<boolean, boolean>;
                    shouldStartLoading: import('vue').Ref<boolean, boolean>;
                    loaded: import('vue').Ref<boolean, boolean>;
                    mergedOnClick: (e: PointerEvent) => void;
                    onPreviewClose: () => void;
                    mergedOnError: (e: Event) => void;
                    mergedOnLoad: (e: Event) => void;
                    previewShow: import('vue').Ref<boolean, boolean>;
                }, {}, {}, {}, {
                    objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                    lazy: boolean;
                    showToolbar: boolean;
                    showToolbarTooltip: boolean;
                    previewDisabled: boolean;
                }> | null>>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                load: (...args: any[]) => any;
                click: () => any;
                error: () => any;
            }, string, {
                retryMax: number;
                fetchpriority: "high" | "low" | "auto";
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
            retryMax: number;
            fetchpriority: "high" | "low" | "auto";
        }> & Omit<Readonly<{
            src?: uni.image.Image_;
            alt?: string;
            previewable?: boolean;
            retryMax?: number;
            round?: boolean;
            fit?: import('naive-ui').ImageProps["objectFit"];
            class?: any;
            hideLoading?: boolean;
            hideError?: boolean;
            inline?: boolean;
            style?: import('vue').StyleValue;
            imgProp?: import('vue').ImgHTMLAttributes;
            useList?: {
                loaded: Set<string>;
                error: Set<string>;
            };
            fetchpriority?: "high" | "low" | "auto";
            fallback?: uni.image.Image_;
        }> & Readonly<{
            onLoad?: ((...args: any[]) => any) | undefined;
            onClick?: (() => any) | undefined;
            onError?: (() => any) | undefined;
        }>, "retryMax" | "fetchpriority" | "isLoaded" | "imageEl" | "imageIns"> & import('vue').ShallowUnwrapRef<{
            isLoaded: import('vue').ComputedRef<boolean>;
            imageEl: import('vue').ComputedRef<HTMLImageElement | null | undefined>;
            imageIns: Readonly<import('vue').ShallowRef<import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }> | null>>;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: Readonly<{
                loading?(): any;
                fail?(): any;
            }> & {
                loading?(): any;
                fail?(): any;
            };
        }) | null;
        epSelList: import('vue').ShallowUnwrapRef<{
            scrollTop: import('vue').WritableComputedRef<number, number>;
            listInstance: import('vue').Ref<import('naive-ui').VirtualListInst>;
        }> | null;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    imgIns: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly src?: uni.image.Image_ | undefined;
            readonly alt?: string | undefined;
            readonly previewable?: boolean | undefined;
            readonly retryMax?: number | undefined;
            readonly round?: boolean | undefined;
            readonly fit?: "fill" | "none" | "cover" | "contain" | "scale-down" | undefined;
            readonly class?: any;
            readonly hideLoading?: boolean | undefined;
            readonly hideError?: boolean | undefined;
            readonly inline?: boolean | undefined;
            readonly style?: import('vue').StyleValue;
            readonly imgProp?: import('vue').ImgHTMLAttributes | undefined;
            readonly useList?: {
                loaded: Set<string>;
                error: Set<string>;
            } | undefined;
            readonly fetchpriority?: "high" | "low" | "auto" | undefined;
            readonly fallback?: uni.image.Image_ | undefined;
            readonly onLoad?: ((...args: any[]) => any) | undefined | undefined;
            readonly onClick?: (() => any) | undefined | undefined;
            readonly onError?: (() => any) | undefined | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        } & {
            img: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }> | null;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "error") => void) & ((event: "click") => void) & ((event: "load", ...args: any[]) => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<{
            src?: uni.image.Image_;
            alt?: string;
            previewable?: boolean;
            retryMax?: number;
            round?: boolean;
            fit?: import('naive-ui').ImageProps["objectFit"];
            class?: any;
            hideLoading?: boolean;
            hideError?: boolean;
            inline?: boolean;
            style?: import('vue').StyleValue;
            imgProp?: import('vue').ImgHTMLAttributes;
            useList?: {
                loaded: Set<string>;
                error: Set<string>;
            };
            fetchpriority?: "high" | "low" | "auto";
            fallback?: uni.image.Image_;
        }> & Readonly<{
            onLoad?: ((...args: any[]) => any) | undefined;
            onClick?: (() => any) | undefined;
            onError?: (() => any) | undefined;
        }>, {
            isLoaded: import('vue').ComputedRef<boolean>;
            imageEl: import('vue').ComputedRef<HTMLImageElement | null | undefined>;
            imageIns: Readonly<import('vue').ShallowRef<import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
                P: {};
                B: {};
                D: {};
                C: {};
                M: {};
                Defaults: {};
            }, Readonly<import('vue').ExtractPropTypes<{
                onPreviewPrev: import('vue').PropType<() => void>;
                onPreviewNext: import('vue').PropType<() => void>;
                showToolbar: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                showToolbarTooltip: BooleanConstructor;
                renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
                theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>;
                themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                    toolbarIconColor: string;
                    toolbarColor: string;
                    toolbarBoxShadow: string;
                    toolbarBorderRadius: string;
                }, {
                    Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                        borderRadius: string;
                        boxShadow: string;
                        color: string;
                        textColor: string;
                        padding: string;
                    }, {
                        Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                            fontSize: string;
                            borderRadius: string;
                            color: string;
                            dividerColor: string;
                            textColor: string;
                            boxShadow: string;
                            space: string;
                            spaceArrow: string;
                            arrowOffset: string;
                            arrowOffsetVertical: string;
                            arrowHeight: string;
                            padding: string;
                        }, {
                            Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                                height: string;
                                width: string;
                                borderRadius: string;
                                color: string;
                                colorHover: string;
                                railInsetHorizontalBottom: string;
                                railInsetHorizontalTop: string;
                                railInsetVerticalRight: string;
                                railInsetVerticalLeft: string;
                                railColor: string;
                            }, any>;
                        }>;
                    }>;
                }>>>;
                alt: StringConstructor;
                height: import('vue').PropType<string | number>;
                imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
                lazy: BooleanConstructor;
                intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
                objectFit: {
                    type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                    default: string;
                };
                previewSrc: StringConstructor;
                fallbackSrc: StringConstructor;
                width: import('vue').PropType<string | number>;
                src: StringConstructor;
                previewDisabled: BooleanConstructor;
                loadDescription: StringConstructor;
                onError: import('vue').PropType<(e: Event) => void>;
                onLoad: import('vue').PropType<(e: Event) => void>;
            }>> & Readonly<{}>, {
                click: () => void;
                showPreview: () => void;
                mergedClsPrefix: import('vue').Ref<string, string>;
                groupId: string | undefined;
                previewInstRef: import('vue').Ref<{
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null, import('naive-ui').ImagePreviewInst | {
                    setThumbnailEl: (e: HTMLImageElement | null) => void;
                } | null>;
                imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
                mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
                showError: import('vue').Ref<boolean, boolean>;
                shouldStartLoading: import('vue').Ref<boolean, boolean>;
                loaded: import('vue').Ref<boolean, boolean>;
                mergedOnClick: (e: PointerEvent) => void;
                onPreviewClose: () => void;
                mergedOnError: (e: Event) => void;
                mergedOnLoad: (e: Event) => void;
                previewShow: import('vue').Ref<boolean, boolean>;
            }, {}, {}, {}, {
                objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
                lazy: boolean;
                showToolbar: boolean;
                showToolbarTooltip: boolean;
                previewDisabled: boolean;
            }> | null>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            load: (...args: any[]) => any;
            click: () => any;
            error: () => any;
        }, string, {
            retryMax: number;
            fetchpriority: "high" | "low" | "auto";
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
        retryMax: number;
        fetchpriority: "high" | "low" | "auto";
    }> & Omit<Readonly<{
        src?: uni.image.Image_;
        alt?: string;
        previewable?: boolean;
        retryMax?: number;
        round?: boolean;
        fit?: import('naive-ui').ImageProps["objectFit"];
        class?: any;
        hideLoading?: boolean;
        hideError?: boolean;
        inline?: boolean;
        style?: import('vue').StyleValue;
        imgProp?: import('vue').ImgHTMLAttributes;
        useList?: {
            loaded: Set<string>;
            error: Set<string>;
        };
        fetchpriority?: "high" | "low" | "auto";
        fallback?: uni.image.Image_;
    }> & Readonly<{
        onLoad?: ((...args: any[]) => any) | undefined;
        onClick?: (() => any) | undefined;
        onError?: (() => any) | undefined;
    }>, "retryMax" | "fetchpriority" | "isLoaded" | "imageEl" | "imageIns"> & import('vue').ShallowUnwrapRef<{
        isLoaded: import('vue').ComputedRef<boolean>;
        imageEl: import('vue').ComputedRef<HTMLImageElement | null | undefined>;
        imageIns: Readonly<import('vue').ShallowRef<import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
            onPreviewPrev: import('vue').PropType<() => void>;
            onPreviewNext: import('vue').PropType<() => void>;
            showToolbar: {
                type: BooleanConstructor;
                default: boolean;
            };
            showToolbarTooltip: BooleanConstructor;
            renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
            theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>;
            themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>>;
            builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>>;
            alt: StringConstructor;
            height: import('vue').PropType<string | number>;
            imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
            previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
            lazy: BooleanConstructor;
            intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
            objectFit: {
                type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                default: string;
            };
            previewSrc: StringConstructor;
            fallbackSrc: StringConstructor;
            width: import('vue').PropType<string | number>;
            src: StringConstructor;
            previewDisabled: BooleanConstructor;
            loadDescription: StringConstructor;
            onError: import('vue').PropType<(e: Event) => void>;
            onLoad: import('vue').PropType<(e: Event) => void>;
        }>> & Readonly<{}>, {
            click: () => void;
            showPreview: () => void;
            mergedClsPrefix: import('vue').Ref<string, string>;
            groupId: string | undefined;
            previewInstRef: import('vue').Ref<{
                setThumbnailEl: (e: HTMLImageElement | null) => void;
            } | null, import('naive-ui').ImagePreviewInst | {
                setThumbnailEl: (e: HTMLImageElement | null) => void;
            } | null>;
            imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
            mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
            showError: import('vue').Ref<boolean, boolean>;
            shouldStartLoading: import('vue').Ref<boolean, boolean>;
            loaded: import('vue').Ref<boolean, boolean>;
            mergedOnClick: (e: PointerEvent) => void;
            onPreviewClose: () => void;
            mergedOnError: (e: Event) => void;
            mergedOnLoad: (e: Event) => void;
            previewShow: import('vue').Ref<boolean, boolean>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {
            objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
            lazy: boolean;
            showToolbar: boolean;
            showToolbarTooltip: boolean;
            previewDisabled: boolean;
        }, true, {}, import('vue').SlotsType<import('naive-ui').ImageSlots>, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('vue').ExtractPropTypes<{
            onPreviewPrev: import('vue').PropType<() => void>;
            onPreviewNext: import('vue').PropType<() => void>;
            showToolbar: {
                type: BooleanConstructor;
                default: boolean;
            };
            showToolbarTooltip: BooleanConstructor;
            renderToolbar: import('vue').PropType<import('naive-ui').ImageRenderToolbar>;
            theme: import('vue').PropType<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>;
            themeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>>;
            builtinThemeOverrides: import('vue').PropType<import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<import('naive-ui/es/_mixins').Theme<"Image", {
                toolbarIconColor: string;
                toolbarColor: string;
                toolbarBoxShadow: string;
                toolbarBorderRadius: string;
            }, {
                Tooltip: import('naive-ui/es/_mixins').Theme<"Tooltip", {
                    borderRadius: string;
                    boxShadow: string;
                    color: string;
                    textColor: string;
                    padding: string;
                }, {
                    Popover: import('naive-ui/es/_mixins').Theme<"Popover", {
                        fontSize: string;
                        borderRadius: string;
                        color: string;
                        dividerColor: string;
                        textColor: string;
                        boxShadow: string;
                        space: string;
                        spaceArrow: string;
                        arrowOffset: string;
                        arrowOffsetVertical: string;
                        arrowHeight: string;
                        padding: string;
                    }, {
                        Scrollbar: import('naive-ui/es/_mixins').Theme<"Scrollbar", {
                            height: string;
                            width: string;
                            borderRadius: string;
                            color: string;
                            colorHover: string;
                            railInsetHorizontalBottom: string;
                            railInsetHorizontalTop: string;
                            railInsetVerticalRight: string;
                            railInsetVerticalLeft: string;
                            railColor: string;
                        }, any>;
                    }>;
                }>;
            }>>>;
            alt: StringConstructor;
            height: import('vue').PropType<string | number>;
            imgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
            previewedImgProps: import('vue').PropType<import('vue').ImgHTMLAttributes>;
            lazy: BooleanConstructor;
            intersectionObserverOptions: import('vue').PropType<import('naive-ui/es/image/src/utils').IntersectionObserverOptions>;
            objectFit: {
                type: import('vue').PropType<"fill" | "contain" | "cover" | "none" | "scale-down">;
                default: string;
            };
            previewSrc: StringConstructor;
            fallbackSrc: StringConstructor;
            width: import('vue').PropType<string | number>;
            src: StringConstructor;
            previewDisabled: BooleanConstructor;
            loadDescription: StringConstructor;
            onError: import('vue').PropType<(e: Event) => void>;
            onLoad: import('vue').PropType<(e: Event) => void>;
        }>> & Readonly<{}>, {
            click: () => void;
            showPreview: () => void;
            mergedClsPrefix: import('vue').Ref<string, string>;
            groupId: string | undefined;
            previewInstRef: import('vue').Ref<{
                setThumbnailEl: (e: HTMLImageElement | null) => void;
            } | null, import('naive-ui').ImagePreviewInst | {
                setThumbnailEl: (e: HTMLImageElement | null) => void;
            } | null>;
            imageRef: import('vue').Ref<HTMLImageElement | null, HTMLImageElement | null>;
            mergedPreviewSrc: import('vue').ComputedRef<string | undefined>;
            showError: import('vue').Ref<boolean, boolean>;
            shouldStartLoading: import('vue').Ref<boolean, boolean>;
            loaded: import('vue').Ref<boolean, boolean>;
            mergedOnClick: (e: PointerEvent) => void;
            onPreviewClose: () => void;
            mergedOnError: (e: Event) => void;
            mergedOnLoad: (e: Event) => void;
            previewShow: import('vue').Ref<boolean, boolean>;
        }, {}, {}, {}, {
            objectFit: "none" | "fill" | "contain" | "cover" | "scale-down";
            lazy: boolean;
            showToolbar: boolean;
            showToolbarTooltip: boolean;
            previewDisabled: boolean;
        }> | null>>;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Readonly<{
            loading?(): any;
            fail?(): any;
        }> & {
            loading?(): any;
            fail?(): any;
        };
    }) | null;
    epSelList: import('vue').ShallowUnwrapRef<{
        scrollTop: import('vue').WritableComputedRef<number, number>;
        listInstance: import('vue').Ref<import('naive-ui').VirtualListInst>;
    }> | null;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
