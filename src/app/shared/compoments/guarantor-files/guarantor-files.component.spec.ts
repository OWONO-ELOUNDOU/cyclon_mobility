import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorFilesComponent } from './guarantor-files.component';

describe('GuarantorFilesComponent', () => {
  let component: GuarantorFilesComponent;
  let fixture: ComponentFixture<GuarantorFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuarantorFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuarantorFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
