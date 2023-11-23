import { Order } from '@kt/model/order';
import { createReducer, on } from '@ngrx/store';
import { OrdersActions, OrdersApiActions } from '@kt/state/orders.actions';

export const initialState: ReadonlyArray<Order> = [];

export const ordersReducer = createReducer(
  initialState,
  on(OrdersApiActions.loadOrders, (state, { orders }) => orders),
  on(OrdersActions.addOrder, (state, order) => [...state, order])
);
