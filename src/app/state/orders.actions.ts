import { createActionGroup, props } from '@ngrx/store';
import { Order } from '@kt/model/order';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    'Add Order': props<Order>()
  }
})

export const OrdersApiActions = createActionGroup({
  source: 'Orders API',
  events: {
    'Load Orders': props<{ orders: ReadonlyArray<Order> }>()
  }
});

