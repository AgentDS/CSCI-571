import { TestBed, inject } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService]
    });
  });

  it('should be created', inject([FavoriteService], (service: FavoriteService) => {
    expect(service).toBeTruthy();
  }));
});
