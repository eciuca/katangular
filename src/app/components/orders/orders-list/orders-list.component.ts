import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '@kt/shared/order.service';
import { Store } from '@ngrx/store';
import { OrdersApiActions } from '@kt/state/orders.actions';
import { Order } from '@kt/model/order';
import { MatTableModule } from '@angular/material/table';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { selectOrders } from '@kt/state/orders.selectors';


@Component({
  selector: 'kt-orders-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  dataSource: Signal<Order[] | undefined>;
  count = computed(() => this.dataSource()?.length ?? 0);

  displayedColumns: string[] = ['id', 'amount', 'advanceAmount', 'date', 'customerId', 'agentId', 'description'];

  constructor(private orderService: OrderService,
              private store: Store) {
    effect(() => {
      console.log('Orders loaded', this.dataSource())
    });
    this.loadOrders();
    this.dataSource = toSignal<Order[] | undefined>(this.store.select(selectOrders));
  }

  private loadOrders() {
    return this.orderService.getOrders(1000)
      .subscribe((orders) => {
        const loadOrders = OrdersApiActions.loadOrders({orders});
        this.store.dispatch(loadOrders);
      });
  }
}
