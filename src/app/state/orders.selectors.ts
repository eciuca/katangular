import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '@kt/model/order';


export const selectOrders = createFeatureSelector<Order[]>('orders');
