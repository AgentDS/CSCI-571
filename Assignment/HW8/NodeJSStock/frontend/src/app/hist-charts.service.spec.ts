/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistChartsService } from './hist-charts.service';

describe('Service: HistCharts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistChartsService]
    });
  });

  it('should ...', inject([HistChartsService], (service: HistChartsService) => {
    expect(service).toBeTruthy();
  }));
});
