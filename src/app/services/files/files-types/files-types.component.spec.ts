import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTypesComponent } from './files-types.component';

describe('FilesTypesComponent', () => {
  let component: FilesTypesComponent;
  let fixture: ComponentFixture<FilesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
