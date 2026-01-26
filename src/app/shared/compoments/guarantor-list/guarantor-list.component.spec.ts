import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorListComponent } from './guarantor-list.component';

describe('GuarantorListComponent', () => {
  let component: GuarantorListComponent;
  let fixture: ComponentFixture<GuarantorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuarantorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuarantorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
