import { TestBed } from '@angular/core/testing';

import { RegisterAuthService } from './register-auth.service';

describe('RegisterAuthService', () => {
  let service: RegisterAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
