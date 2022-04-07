import { TestBed } from '@angular/core/testing';

import { FeaturedBooksService } from './featured-books.service';

describe('FeaturedBooksService', () => {
  let service: FeaturedBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
