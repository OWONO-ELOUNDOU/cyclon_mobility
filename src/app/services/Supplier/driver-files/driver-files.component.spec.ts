import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFilesComponent } from './driver-files.component';

describe('DriverFilesComponent', () => {
  let component: DriverFilesComponent;
  let fixture: ComponentFixture<DriverFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
