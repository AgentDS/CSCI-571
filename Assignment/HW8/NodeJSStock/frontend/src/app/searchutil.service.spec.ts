/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchutilService } from './searchutil.service';

describe('Service: Searchutil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchutilService]
    });
  });

  it('should ...', inject([SearchutilService], (service: SearchutilService) => {
    expect(service).toBeTruthy();
  }));
});
