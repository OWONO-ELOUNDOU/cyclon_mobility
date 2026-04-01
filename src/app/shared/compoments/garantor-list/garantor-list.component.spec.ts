import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantorListComponent } from './garantor-list.component';

describe('GarantorListComponent', () => {
  let component: GarantorListComponent;
  let fixture: ComponentFixture<GarantorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarantorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarantorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
