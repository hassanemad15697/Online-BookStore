import { TestBed } from '@angular/core/testing';

import { SearchByCategoryService } from './search-by-category.service';

describe('SearchByCategoryService', () => {
  let service: SearchByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
