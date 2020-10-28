/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyChartsService } from './daily-charts.service';

describe('Service: DailyCharts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyChartsService]
    });
  });

  it('should ...', inject([DailyChartsService], (service: DailyChartsService) => {
    expect(service).toBeTruthy();
  }));
});
