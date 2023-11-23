import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';
import { OrderDto } from '@kt/model/krapi';
import { HALResponse } from '@kt/model/HALResponse';
import { of } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(OrderService);
  });

  it('should call backend 1 time', (done ) => {
    const expectedOrders: OrderDto[] = [
      {
        id: 1, amount: 10,
        advanceAmount: 10,
        date: new Date(),
        customerId: '10',
        agentId: '10',
        description: 'description'
      }
    ];

    const expectedHalResponse: HALResponse<OrderDto[]> = {
      _embedded: { 'orders': expectedOrders },
      _links: {_self: { href: "dummy-link"} }
    }
    httpClientSpy.get.and.returnValue(of(expectedHalResponse));

    service.getOrders(200).subscribe(orders => {
      expect(orders).withContext('expected orders').toEqual(expectedOrders);
      done();
    })

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
