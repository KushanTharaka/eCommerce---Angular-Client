import { TestBed } from '@angular/core/testing';

import { AdminCategoryProductServiceService } from './admin-category-product-service.service';

describe('AdminCategoryProductServiceService', () => {
  let service: AdminCategoryProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategoryProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
