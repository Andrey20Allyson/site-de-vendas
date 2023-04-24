export type ReducerCallback<T> = (product: T) => T;
export interface ReducerObject<T> {
  reduce(acc: T): T;
}
export type Reducer<T> = ReducerCallback<T> | ReducerObject<T>;

export function callReducer<T>(reducer: Reducer<T>, acc: T): T {
  return typeof reducer === 'function' ? reducer(acc) : reducer.reduce(acc);
}