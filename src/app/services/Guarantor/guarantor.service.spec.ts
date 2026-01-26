import { TestBed } from '@angular/core/testing';

import { GuarantorService } from './guarantor.service';

describe('GuarantorService', () => {
  let service: GuarantorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuarantorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
