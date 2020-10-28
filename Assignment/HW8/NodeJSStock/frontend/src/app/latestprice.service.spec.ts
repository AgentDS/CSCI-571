/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LatestpriceService } from './latestprice.service';

describe('Service: Latestprice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatestpriceService]
    });
  });

  it('should ...', inject([LatestpriceService], (service: LatestpriceService) => {
    expect(service).toBeTruthy();
  }));
});
