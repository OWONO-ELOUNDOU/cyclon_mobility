import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSearchResultComponent } from './driver-search-result.component';

describe('DriverSearchResultComponent', () => {
  let component: DriverSearchResultComponent;
  let fixture: ComponentFixture<DriverSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
