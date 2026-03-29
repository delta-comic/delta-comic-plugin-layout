import { uni } from '@delta-comic/model';
export declare const useLike: () => {
    likeItem: (vars: uni.item.Item) => Promise<any>;
    key?: import('@pinia/colada').EntryKey | ((vars: NoInfer<uni.item.Item>) => import('@pinia/colada').EntryKey) | undefined;
    state: import('vue').ComputedRef<import('@pinia/colada').DataState<any, Error, undefined>>;
    status: import('vue').ShallowRef<import('@pinia/colada').DataStateStatus>;
    asyncStatus: import('vue').ShallowRef<import('@pinia/colada').AsyncStatus>;
    data: import('vue').ShallowRef<any>;
    error: import('vue').ShallowRef<Error | null>;
    isLoading: import('vue').ComputedRef<boolean>;
    variables: import('vue').ShallowRef<uni.item.Item | undefined>;
    mutate: (vars: uni.item.Item) => void;
    reset: () => void;
};
