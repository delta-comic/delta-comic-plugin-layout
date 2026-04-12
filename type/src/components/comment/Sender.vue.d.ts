import { uni } from '@delta-comic/model';
type __VLS_Props = {
    class?: any;
    aim: uni.item.Item | uni.comment.Comment;
    item: uni.item.Item;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputEl: {
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
            readonly center: boolean;
            readonly tag: keyof HTMLElementTagNameMap;
            readonly isLink: boolean;
            readonly border: boolean;
            readonly autofocus: boolean;
            readonly clearable: boolean;
            readonly clearIcon: string;
            readonly modelValue: string | number;
            readonly clearTrigger: import('vant').FieldClearTrigger;
            readonly formatTrigger: import('vant').FieldFormatTrigger;
            readonly type: import('vant').FieldType;
            readonly showWordLimit: boolean;
            readonly iconPrefix?: string;
            readonly icon?: string;
            readonly size?: import('vant').CellSize;
            readonly title?: string | number;
            readonly value?: string | number;
            readonly label?: string | number;
            readonly valueClass?: unknown;
            readonly labelClass?: unknown;
            readonly titleClass?: unknown;
            readonly titleStyle?: string | import('vue').CSSProperties;
            readonly arrowDirection?: import('vant').CellArrowDirection;
            readonly required?: boolean | "auto";
            readonly clickable?: boolean;
            readonly id?: string;
            readonly name?: string;
            readonly leftIcon?: string;
            readonly rightIcon?: string;
            readonly maxlength?: string | number;
            readonly max?: number;
            readonly min?: number;
            readonly formatter?: (value: string) => string;
            readonly inputAlign?: import('vant').FieldTextAlign;
            readonly placeholder?: string;
            readonly autocomplete?: string;
            readonly autocapitalize?: string;
            readonly autocorrect?: string;
            readonly errorMessage?: string;
            readonly enterkeyhint?: import('vant').FieldEnterKeyHint;
            readonly spellcheck?: boolean;
            readonly error?: boolean;
            readonly disabled?: boolean;
            readonly readonly?: boolean;
            readonly inputmode?: "search" | "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal";
            readonly rows?: string | number;
            readonly rules?: import('vant').FieldRule[];
            readonly autosize?: unknown;
            readonly labelWidth?: string | number;
            readonly labelAlign?: import('vant').FieldTextAlign;
            readonly errorMessageAlign?: import('vant').FieldTextAlign;
            readonly colon?: boolean;
            readonly onFocus?: ((...args: any[]) => any) | undefined;
            readonly onBlur?: ((...args: any[]) => any) | undefined;
            readonly onKeypress?: ((...args: any[]) => any) | undefined;
            readonly onClear?: ((...args: any[]) => any) | undefined;
            readonly onClickInput?: ((...args: any[]) => any) | undefined;
            readonly onEndValidate?: ((...args: any[]) => any) | undefined;
            readonly onStartValidate?: ((...args: any[]) => any) | undefined;
            readonly onClickLeftIcon?: ((...args: any[]) => any) | undefined;
            readonly onClickRightIcon?: ((...args: any[]) => any) | undefined;
            readonly "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "center" | "tag" | "isLink" | "border" | "required" | "clickable" | "autofocus" | "clearable" | "clearIcon" | "modelValue" | "clearTrigger" | "formatTrigger" | "spellcheck" | "error" | "disabled" | "readonly" | "type" | "showWordLimit" | "colon">;
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
    }>, "center" | "tag" | "isLink" | "border" | "required" | "clickable" | "autofocus" | "clearable" | "clearIcon" | "modelValue" | "clearTrigger" | "formatTrigger" | "spellcheck" | "error" | "disabled" | "readonly" | "type" | "showWordLimit" | "colon"> & {} & {} & import('vue').ComponentCustomProperties & {} & {
        $props: {
            onClick?: (...args: any[]) => void;
        };
    };
}, any>;
export default _default;
