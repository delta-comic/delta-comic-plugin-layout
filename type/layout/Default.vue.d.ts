import { uni } from '@delta-comic/model'
type __VLS_Props = { page: uni.content.ContentPage; isR18g?: boolean }
declare function __VLS_template(): {
  attrs: Partial<{}>
  slots: Readonly<{ view(): void }> & { view(): void }
  refs: {
    scrollbar:
      | import('vue').CreateComponentPublicInstanceWithMixins<
          Readonly<
            import('vue').ExtractPropTypes<{
              readonly trigger: import('vue').PropType<'none' | 'hover'>
              readonly xScrollable: BooleanConstructor
              readonly onScroll: import('vue').PropType<(e: Event) => void>
              readonly contentClass: StringConstructor
              readonly contentStyle: import('vue').PropType<string | Record<string, any>>
              readonly size: NumberConstructor
              readonly yPlacement: {
                readonly type: import('vue').PropType<'left' | 'right'>
                readonly default: 'right'
              }
              readonly xPlacement: {
                readonly type: import('vue').PropType<'top' | 'bottom'>
                readonly default: 'bottom'
              }
              readonly theme: import('vue').PropType<
                import('naive-ui/es/_mixins').Theme<
                  'Scrollbar',
                  {
                    height: string
                    width: string
                    borderRadius: string
                    color: string
                    colorHover: string
                    railInsetHorizontalBottom: string
                    railInsetHorizontalTop: string
                    railInsetVerticalRight: string
                    railInsetVerticalLeft: string
                    railColor: string
                  },
                  any
                >
              >
              readonly themeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
              readonly builtinThemeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
            }>
          > &
            Readonly<{}>,
          {
            scrollbarInstRef: import('vue').Ref<
              {
                $el: HTMLElement
                containerRef: HTMLElement | null
                contentRef: HTMLElement | null
                containerScrollTop: number
                syncUnifiedContainer: () => void
                scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                sync: () => void
                handleMouseEnterWrapper: () => void
                handleMouseLeaveWrapper: () => void
              } | null,
              | import('naive-ui/es/_internal').ScrollbarInst
              | {
                  $el: HTMLElement
                  containerRef: HTMLElement | null
                  contentRef: HTMLElement | null
                  containerScrollTop: number
                  syncUnifiedContainer: () => void
                  scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                  scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                  sync: () => void
                  handleMouseEnterWrapper: () => void
                  handleMouseLeaveWrapper: () => void
                }
              | null
            >
            scrollTo: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollTo
            scrollBy: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollBy
          },
          {},
          {},
          {},
          import('vue').ComponentOptionsMixin,
          import('vue').ComponentOptionsMixin,
          {},
          import('vue').PublicProps,
          {
            readonly xScrollable: boolean
            readonly yPlacement: 'left' | 'right'
            readonly xPlacement: 'top' | 'bottom'
          },
          true,
          {},
          {},
          import('vue').GlobalComponents,
          import('vue').GlobalDirectives,
          string,
          {},
          any,
          import('vue').ComponentProvideOptions,
          { P: {}; B: {}; D: {}; C: {}; M: {}; Defaults: {} },
          Readonly<
            import('vue').ExtractPropTypes<{
              readonly trigger: import('vue').PropType<'none' | 'hover'>
              readonly xScrollable: BooleanConstructor
              readonly onScroll: import('vue').PropType<(e: Event) => void>
              readonly contentClass: StringConstructor
              readonly contentStyle: import('vue').PropType<string | Record<string, any>>
              readonly size: NumberConstructor
              readonly yPlacement: {
                readonly type: import('vue').PropType<'left' | 'right'>
                readonly default: 'right'
              }
              readonly xPlacement: {
                readonly type: import('vue').PropType<'top' | 'bottom'>
                readonly default: 'bottom'
              }
              readonly theme: import('vue').PropType<
                import('naive-ui/es/_mixins').Theme<
                  'Scrollbar',
                  {
                    height: string
                    width: string
                    borderRadius: string
                    color: string
                    colorHover: string
                    railInsetHorizontalBottom: string
                    railInsetHorizontalTop: string
                    railInsetVerticalRight: string
                    railInsetVerticalLeft: string
                    railColor: string
                  },
                  any
                >
              >
              readonly themeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
              readonly builtinThemeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
            }>
          > &
            Readonly<{}>,
          {
            scrollbarInstRef: import('vue').Ref<
              {
                $el: HTMLElement
                containerRef: HTMLElement | null
                contentRef: HTMLElement | null
                containerScrollTop: number
                syncUnifiedContainer: () => void
                scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                sync: () => void
                handleMouseEnterWrapper: () => void
                handleMouseLeaveWrapper: () => void
              } | null,
              | import('naive-ui/es/_internal').ScrollbarInst
              | {
                  $el: HTMLElement
                  containerRef: HTMLElement | null
                  contentRef: HTMLElement | null
                  containerScrollTop: number
                  syncUnifiedContainer: () => void
                  scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                  scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                  sync: () => void
                  handleMouseEnterWrapper: () => void
                  handleMouseLeaveWrapper: () => void
                }
              | null
            >
            scrollTo: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollTo
            scrollBy: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollBy
          },
          {},
          {},
          {},
          {
            readonly xScrollable: boolean
            readonly yPlacement: 'left' | 'right'
            readonly xPlacement: 'top' | 'bottom'
          }
        >
      | null
    epSelList:
      | import('vue').ShallowUnwrapRef<{
          scrollTop: import('vue').WritableComputedRef<number, number>
          listInstance: import('vue').Ref<import('naive-ui').VirtualListInst>
        }>
      | null
  }
  rootEl: any
}
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>
declare const __VLS_component: import('vue').DefineComponent<
  __VLS_Props,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<__VLS_Props> & Readonly<{}>,
  {},
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  false,
  {
    scrollbar:
      | import('vue').CreateComponentPublicInstanceWithMixins<
          Readonly<
            import('vue').ExtractPropTypes<{
              readonly trigger: import('vue').PropType<'none' | 'hover'>
              readonly xScrollable: BooleanConstructor
              readonly onScroll: import('vue').PropType<(e: Event) => void>
              readonly contentClass: StringConstructor
              readonly contentStyle: import('vue').PropType<string | Record<string, any>>
              readonly size: NumberConstructor
              readonly yPlacement: {
                readonly type: import('vue').PropType<'left' | 'right'>
                readonly default: 'right'
              }
              readonly xPlacement: {
                readonly type: import('vue').PropType<'top' | 'bottom'>
                readonly default: 'bottom'
              }
              readonly theme: import('vue').PropType<
                import('naive-ui/es/_mixins').Theme<
                  'Scrollbar',
                  {
                    height: string
                    width: string
                    borderRadius: string
                    color: string
                    colorHover: string
                    railInsetHorizontalBottom: string
                    railInsetHorizontalTop: string
                    railInsetVerticalRight: string
                    railInsetVerticalLeft: string
                    railColor: string
                  },
                  any
                >
              >
              readonly themeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
              readonly builtinThemeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
            }>
          > &
            Readonly<{}>,
          {
            scrollbarInstRef: import('vue').Ref<
              {
                $el: HTMLElement
                containerRef: HTMLElement | null
                contentRef: HTMLElement | null
                containerScrollTop: number
                syncUnifiedContainer: () => void
                scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                sync: () => void
                handleMouseEnterWrapper: () => void
                handleMouseLeaveWrapper: () => void
              } | null,
              | import('naive-ui/es/_internal').ScrollbarInst
              | {
                  $el: HTMLElement
                  containerRef: HTMLElement | null
                  contentRef: HTMLElement | null
                  containerScrollTop: number
                  syncUnifiedContainer: () => void
                  scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                  scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                  sync: () => void
                  handleMouseEnterWrapper: () => void
                  handleMouseLeaveWrapper: () => void
                }
              | null
            >
            scrollTo: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollTo
            scrollBy: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollBy
          },
          {},
          {},
          {},
          import('vue').ComponentOptionsMixin,
          import('vue').ComponentOptionsMixin,
          {},
          import('vue').PublicProps,
          {
            readonly xScrollable: boolean
            readonly yPlacement: 'left' | 'right'
            readonly xPlacement: 'top' | 'bottom'
          },
          true,
          {},
          {},
          import('vue').GlobalComponents,
          import('vue').GlobalDirectives,
          string,
          {},
          any,
          import('vue').ComponentProvideOptions,
          { P: {}; B: {}; D: {}; C: {}; M: {}; Defaults: {} },
          Readonly<
            import('vue').ExtractPropTypes<{
              readonly trigger: import('vue').PropType<'none' | 'hover'>
              readonly xScrollable: BooleanConstructor
              readonly onScroll: import('vue').PropType<(e: Event) => void>
              readonly contentClass: StringConstructor
              readonly contentStyle: import('vue').PropType<string | Record<string, any>>
              readonly size: NumberConstructor
              readonly yPlacement: {
                readonly type: import('vue').PropType<'left' | 'right'>
                readonly default: 'right'
              }
              readonly xPlacement: {
                readonly type: import('vue').PropType<'top' | 'bottom'>
                readonly default: 'bottom'
              }
              readonly theme: import('vue').PropType<
                import('naive-ui/es/_mixins').Theme<
                  'Scrollbar',
                  {
                    height: string
                    width: string
                    borderRadius: string
                    color: string
                    colorHover: string
                    railInsetHorizontalBottom: string
                    railInsetHorizontalTop: string
                    railInsetVerticalRight: string
                    railInsetVerticalLeft: string
                    railColor: string
                  },
                  any
                >
              >
              readonly themeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
              readonly builtinThemeOverrides: import('vue').PropType<
                import('naive-ui/es/_mixins/use-theme').ExtractThemeOverrides<
                  import('naive-ui/es/_mixins').Theme<
                    'Scrollbar',
                    {
                      height: string
                      width: string
                      borderRadius: string
                      color: string
                      colorHover: string
                      railInsetHorizontalBottom: string
                      railInsetHorizontalTop: string
                      railInsetVerticalRight: string
                      railInsetVerticalLeft: string
                      railColor: string
                    },
                    any
                  >
                >
              >
            }>
          > &
            Readonly<{}>,
          {
            scrollbarInstRef: import('vue').Ref<
              {
                $el: HTMLElement
                containerRef: HTMLElement | null
                contentRef: HTMLElement | null
                containerScrollTop: number
                syncUnifiedContainer: () => void
                scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                sync: () => void
                handleMouseEnterWrapper: () => void
                handleMouseLeaveWrapper: () => void
              } | null,
              | import('naive-ui/es/_internal').ScrollbarInst
              | {
                  $el: HTMLElement
                  containerRef: HTMLElement | null
                  contentRef: HTMLElement | null
                  containerScrollTop: number
                  syncUnifiedContainer: () => void
                  scrollTo: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollTo
                  scrollBy: import('naive-ui/es/_internal/scrollbar/src/Scrollbar').ScrollBy
                  sync: () => void
                  handleMouseEnterWrapper: () => void
                  handleMouseLeaveWrapper: () => void
                }
              | null
            >
            scrollTo: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollTo
            scrollBy: import('naive-ui/es/scrollbar/src/Scrollbar').ScrollBy
          },
          {},
          {},
          {},
          {
            readonly xScrollable: boolean
            readonly yPlacement: 'left' | 'right'
            readonly xPlacement: 'top' | 'bottom'
          }
        >
      | null
    epSelList:
      | import('vue').ShallowUnwrapRef<{
          scrollTop: import('vue').WritableComputedRef<number, number>
          listInstance: import('vue').Ref<import('naive-ui').VirtualListInst>
        }>
      | null
  },
  any
>
declare const _default: __VLS_WithTemplateSlots<
  typeof __VLS_component,
  __VLS_TemplateResult['slots']
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & { new (): { $slots: S } }