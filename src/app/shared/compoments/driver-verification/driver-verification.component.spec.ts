import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVerificationComponent } from './driver-verification.component';

describe('DriverVerificationComponent', () => {
  let component: DriverVerificationComponent;
  let fixture: ComponentFixture<DriverVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
