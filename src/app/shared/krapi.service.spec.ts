import { TestBed } from '@angular/core/testing';

import { KrapiService } from './krapi.service';

describe('KrapiService', () => {
  let service: KrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
