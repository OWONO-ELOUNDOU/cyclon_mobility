import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantorFormComponent } from './garantor-form.component';

describe('GarantorFormComponent', () => {
  let component: GarantorFormComponent;
  let fixture: ComponentFixture<GarantorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarantorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarantorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
