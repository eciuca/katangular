import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getEmbeddedField, HALResponse } from '@kt/model/HALResponse';
import { OrderDto } from '@kt/model/krapi';
import { map, shareReplay } from 'rxjs/operators';
import { Order } from '@kt/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(size = 20) {
    return this.httpClient.get<HALResponse<OrderDto[]>>('/krapi/orders', { params: { size } }).pipe(
      map(response => getEmbeddedField<OrderDto[]>(response, 'orders', [])),
      map(orderDtos => orderDtos.map(orderDto => this.toOrder(orderDto))),
      shareReplay()
    );
  }

  private toOrder(orderDto: OrderDto): Order {
    return { ...orderDto };
  }
}
