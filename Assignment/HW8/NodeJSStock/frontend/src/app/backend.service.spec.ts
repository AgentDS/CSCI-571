/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendService } from './backend.service';

describe('Service: Backend', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService]
    });
  });

  it('should ...', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
