import { TestBed } from '@angular/core/testing';

import { CarTypesService } from './car-types.service';

describe('CarTypesService', () => {
  let service: CarTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
