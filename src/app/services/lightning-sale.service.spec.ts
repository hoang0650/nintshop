import { TestBed } from '@angular/core/testing';

import { LightningSaleService } from './lightning-sale.service';

describe('LightningSaleService', () => {
  let service: LightningSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightningSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
