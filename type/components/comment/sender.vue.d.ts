import { uni } from '@delta-comic/model';
type __VLS_Props = {
    class?: any;
    aim: uni.item.Item | uni.comment.Comment;
    item: uni.item.Item;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputEl: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            type: import('vant').FieldType;
            tag: keyof HTMLElementTagNameMap;
            center: boolean;
            autofocus: boolean;
            disabled: boolean;
            border: boolean;
            isLink: boolean;
            required: boolean | "auto";
            clickable: boolean | null;
            clearable: boolean;
            clearIcon: string;
            modelValue: string | number;
            clearTrigger: import('vant').FieldClearTrigger;
            formatTrigger: import('vant').FieldFormatTrigger;
            spellcheck: boolean;
            error: boolean;
            readonly: boolean;
            showWordLimit: boolean;
            colon: boolean;
        }> & Omit<{
            readonly tag: keyof HTMLElementTagNameMap;
            readonly center: boolean;
            readonly isLink: boolean;
            readonly border: boolean;
            readonly required: boolean | "auto";
            readonly clickable: boolean | null;
            readonly autofocus: boolean;
            readonly clearable: boolean;
            readonly clearIcon: string;
            readonly modelValue: string | number;
            readonly clearTrigger: import('vant').FieldClearTrigger;
            readonly formatTrigger: import('vant').FieldFormatTrigger;
            readonly spellcheck: boolean;
            readonly error: boolean;
            readonly disabled: boolean;
            readonly readonly: boolean;
            readonly type: import('vant').FieldType;
            readonly showWordLimit: boolean;
            readonly colon: boolean;
            readonly icon?: string | undefined;
            readonly size?: import('vant').CellSize | undefined;
            readonly title?: string | number | undefined;
            readonly value?: string | number | undefined;
            readonly label?: string | number | undefined;
            readonly iconPrefix?: string | undefined;
            readonly valueClass?: unknown;
            readonly labelClass?: unknown;
            readonly titleClass?: unknown;
            readonly titleStyle?: string | import('vue').CSSProperties | undefined;
            readonly arrowDirection?: import('vant').CellArrowDirection | undefined;
            readonly id?: string | undefined;
            readonly name?: string | undefined;
            readonly leftIcon?: string | undefined;
            readonly rightIcon?: string | undefined;
            readonly maxlength?: string | number | undefined;
            readonly max?: number | undefined;
            readonly min?: number | undefined;
            readonly formatter?: ((value: string) => string) | undefined;
            readonly inputAlign?: import('vant').FieldTextAlign | undefined;
            readonly placeholder?: string | undefined;
            readonly autocomplete?: string | undefined;
            readonly autocapitalize?: string | undefined;
            readonly autocorrect?: string | undefined;
            readonly errorMessage?: string | undefined;
            readonly enterkeyhint?: import('vant').FieldEnterKeyHint | undefined;
            readonly inputmode?: "search" | "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
            readonly rows?: string | number | undefined;
            readonly rules?: import('vant').FieldRule[] | undefined;
            readonly autosize?: boolean | import('vant').FieldAutosizeConfig | undefined;
            readonly labelWidth?: string | number | undefined;
            readonly labelAlign?: import('vant').FieldTextAlign | undefined;
            readonly errorMessageAlign?: import('vant').FieldTextAlign | undefined;
            readonly onFocus?: ((...args: any[]) => any) | undefined | undefined;
            readonly onBlur?: ((...args: any[]) => any) | undefined | undefined;
            readonly onKeypress?: ((...args: any[]) => any) | undefined | undefined;
            readonly onClear?: ((...args: any[]) => any) | undefined | undefined;
            readonly onClickInput?: ((...args: any[]) => any) | undefined | undefined;
            readonly onEndValidate?: ((...args: any[]) => any) | undefined | undefined;
            readonly onStartValidate?: ((...args: any[]) => any) | undefined | undefined;
            readonly onClickLeftIcon?: ((...args: any[]) => any) | undefined | undefined;
            readonly onClickRightIcon?: ((...args: any[]) => any) | undefined | undefined;
            readonly "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "tag" | "center" | "isLink" | "border" | "required" | "clickable" | "autofocus" | "clearable" | "clearIcon" | "modelValue" | "clearTrigger" | "formatTrigger" | "spellcheck" | "error" | "disabled" | "readonly" | "type" | "showWordLimit" | "colon">;
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
        $emit: (event: "focus" | "blur" | "clear" | "keypress" | "clickInput" | "endValidate" | "startValidate" | "clickLeftIcon" | "clickRightIcon" | "update:modelValue", ...args: any[]) => void;
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
            tag: {
                type: import('vue').PropType<keyof HTMLElementTagNameMap>;
                default: keyof HTMLElementTagNameMap;
            };
            icon: StringConstructor;
            size: import('vue').PropType<import('vant').CellSize>;
            title: (NumberConstructor | StringConstructor)[];
            value: (NumberConstructor | StringConstructor)[];
            label: (NumberConstructor | StringConstructor)[];
            center: BooleanConstructor;
            isLink: BooleanConstructor;
            border: {
                type: BooleanConstructor;
                default: true;
            };
            iconPrefix: StringConstructor;
            valueClass: import('vue').PropType<unknown>;
            labelClass: import('vue').PropType<unknown>;
            titleClass: import('vue').PropType<unknown>;
            titleStyle: import('vue').PropType<string | import('vue').CSSProperties>;
            arrowDirection: import('vue').PropType<import('vant').CellArrowDirection>;
            required: {
                type: import('vue').PropType<boolean | "auto">;
                default: null;
            };
            clickable: {
                type: import('vue').PropType<boolean | null>;
                default: null;
            };
        } & {
            id: StringConstructor;
            name: StringConstructor;
            leftIcon: StringConstructor;
            rightIcon: StringConstructor;
            autofocus: BooleanConstructor;
            clearable: BooleanConstructor;
            maxlength: (NumberConstructor | StringConstructor)[];
            max: NumberConstructor;
            min: NumberConstructor;
            formatter: import('vue').PropType<(value: string) => string>;
            clearIcon: {
                type: import('vue').PropType<string>;
                default: string;
            };
            modelValue: {
                type: (NumberConstructor | StringConstructor)[];
                default: string;
            };
            inputAlign: import('vue').PropType<import('vant').FieldTextAlign>;
            placeholder: StringConstructor;
            autocomplete: StringConstructor;
            autocapitalize: StringConstructor;
            autocorrect: StringConstructor;
            errorMessage: StringConstructor;
            enterkeyhint: import('vue').PropType<import('vant').FieldEnterKeyHint>;
            clearTrigger: {
                type: import('vue').PropType<import('vant').FieldClearTrigger>;
                default: import('vant').FieldClearTrigger;
            };
            formatTrigger: {
                type: import('vue').PropType<import('vant').FieldFormatTrigger>;
                default: import('vant').FieldFormatTrigger;
            };
            spellcheck: {
                type: BooleanConstructor;
                default: null;
            };
            error: {
                type: BooleanConstructor;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: null;
            };
            readonly: {
                type: BooleanConstructor;
                default: null;
            };
            inputmode: import('vue').PropType<import('vue').HTMLAttributes["inputmode"]>;
        } & {
            rows: (NumberConstructor | StringConstructor)[];
            type: {
                type: import('vue').PropType<import('vant').FieldType>;
                default: import('vant').FieldType;
            };
            rules: import('vue').PropType<import('vant').FieldRule[]>;
            autosize: import('vue').PropType<boolean | import('vant').FieldAutosizeConfig>;
            labelWidth: (NumberConstructor | StringConstructor)[];
            labelClass: import('vue').PropType<unknown>;
            labelAlign: import('vue').PropType<import('vant').FieldTextAlign>;
            showWordLimit: BooleanConstructor;
            errorMessageAlign: import('vue').PropType<import('vant').FieldTextAlign>;
            colon: {
                type: BooleanConstructor;
                default: null;
            };
        }>> & Readonly<{
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onKeypress?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            onClickInput?: ((...args: any[]) => any) | undefined;
            onEndValidate?: ((...args: any[]) => any) | undefined;
            onStartValidate?: ((...args: any[]) => any) | undefined;
            onClickLeftIcon?: ((...args: any[]) => any) | undefined;
            onClickRightIcon?: ((...args: any[]) => any) | undefined;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("focus" | "blur" | "clear" | "keypress" | "clickInput" | "endValidate" | "startValidate" | "clickLeftIcon" | "clickRightIcon" | "update:modelValue")[], string, {
            type: import('vant').FieldType;
            tag: keyof HTMLElementTagNameMap;
            center: boolean;
            autofocus: boolean;
            disabled: boolean;
            border: boolean;
            isLink: boolean;
            required: boolean | "auto";
            clickable: boolean | null;
            clearable: boolean;
            clearIcon: string;
            modelValue: string | number;
            clearTrigger: import('vant').FieldClearTrigger;
            formatTrigger: import('vant').FieldFormatTrigger;
            spellcheck: boolean;
            error: boolean;
            readonly: boolean;
            showWordLimit: boolean;
            colon: boolean;
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
        type: import('vant').FieldType;
        tag: keyof HTMLElementTagNameMap;
        center: boolean;
        autofocus: boolean;
        disabled: boolean;
        border: boolean;
        isLink: boolean;
        required: boolean | "auto";
        clickable: boolean | null;
        clearable: boolean;
        clearIcon: string;
        modelValue: string | number;
        clearTrigger: import('vant').FieldClearTrigger;
        formatTrigger: import('vant').FieldFormatTrigger;
        spellcheck: boolean;
        error: boolean;
        readonly: boolean;
        showWordLimit: boolean;
        colon: boolean;
    }> & Omit<Readonly<import('vue').ExtractPropTypes<{
        tag: {
            type: import('vue').PropType<keyof HTMLElementTagNameMap>;
            default: keyof HTMLElementTagNameMap;
        };
        icon: StringConstructor;
        size: import('vue').PropType<import('vant').CellSize>;
        title: (NumberConstructor | StringConstructor)[];
        value: (NumberConstructor | StringConstructor)[];
        label: (NumberConstructor | StringConstructor)[];
        center: BooleanConstructor;
        isLink: BooleanConstructor;
        border: {
            type: BooleanConstructor;
            default: true;
        };
        iconPrefix: StringConstructor;
        valueClass: import('vue').PropType<unknown>;
        labelClass: import('vue').PropType<unknown>;
        titleClass: import('vue').PropType<unknown>;
        titleStyle: import('vue').PropType<string | import('vue').CSSProperties>;
        arrowDirection: import('vue').PropType<import('vant').CellArrowDirection>;
        required: {
            type: import('vue').PropType<boolean | "auto">;
            default: null;
        };
        clickable: {
            type: import('vue').PropType<boolean | null>;
            default: null;
        };
    } & {
        id: StringConstructor;
        name: StringConstructor;
        leftIcon: StringConstructor;
        rightIcon: StringConstructor;
        autofocus: BooleanConstructor;
        clearable: BooleanConstructor;
        maxlength: (NumberConstructor | StringConstructor)[];
        max: NumberConstructor;
        min: NumberConstructor;
        formatter: import('vue').PropType<(value: string) => string>;
        clearIcon: {
            type: import('vue').PropType<string>;
            default: string;
        };
        modelValue: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        inputAlign: import('vue').PropType<import('vant').FieldTextAlign>;
        placeholder: StringConstructor;
        autocomplete: StringConstructor;
        autocapitalize: StringConstructor;
        autocorrect: StringConstructor;
        errorMessage: StringConstructor;
        enterkeyhint: import('vue').PropType<import('vant').FieldEnterKeyHint>;
        clearTrigger: {
            type: import('vue').PropType<import('vant').FieldClearTrigger>;
            default: import('vant').FieldClearTrigger;
        };
        formatTrigger: {
            type: import('vue').PropType<import('vant').FieldFormatTrigger>;
            default: import('vant').FieldFormatTrigger;
        };
        spellcheck: {
            type: BooleanConstructor;
            default: null;
        };
        error: {
            type: BooleanConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: null;
        };
        readonly: {
            type: BooleanConstructor;
            default: null;
        };
        inputmode: import('vue').PropType<import('vue').HTMLAttributes["inputmode"]>;
    } & {
        rows: (NumberConstructor | StringConstructor)[];
        type: {
            type: import('vue').PropType<import('vant').FieldType>;
            default: import('vant').FieldType;
        };
        rules: import('vue').PropType<import('vant').FieldRule[]>;
        autosize: import('vue').PropType<boolean | import('vant').FieldAutosizeConfig>;
        labelWidth: (NumberConstructor | StringConstructor)[];
        labelClass: import('vue').PropType<unknown>;
        labelAlign: import('vue').PropType<import('vant').FieldTextAlign>;
        showWordLimit: BooleanConstructor;
        errorMessageAlign: import('vue').PropType<import('vant').FieldTextAlign>;
        colon: {
            type: BooleanConstructor;
            default: null;
        };
    }>> & Readonly<{
        onFocus?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onKeypress?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
        onClickInput?: ((...args: any[]) => any) | undefined;
        onEndValidate?: ((...args: any[]) => any) | undefined;
        onStartValidate?: ((...args: any[]) => any) | undefined;
        onClickLeftIcon?: ((...args: any[]) => any) | undefined;
        onClickRightIcon?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, "tag" | "center" | "isLink" | "border" | "required" | "clickable" | "autofocus" | "clearable" | "clearIcon" | "modelValue" | "clearTrigger" | "formatTrigger" | "spellcheck" | "error" | "disabled" | "readonly" | "type" | "showWordLimit" | "colon"> & import('vue').ShallowUnwrapRef<() => import("vue/jsx-runtime").JSX.Element> & {} & import('vue').ComponentCustomProperties & {} & {
        $props: {
            onClick?: (...args: any[]) => void;
        };
    }) | null;
}, any>;
export default _default;
