import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeLogger } from '@kt/components/ngrx-store-logger-local';
import { ordersReducer } from '@kt/state/orders.reducer';


export interface State {

}
export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}


export const reducers: ActionReducerMap<State> = {
  orders: ordersReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logger] : [];
