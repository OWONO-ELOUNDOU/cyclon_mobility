import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBadgetComponent } from './stat-badget.component';

describe('StatBadgetComponent', () => {
  let component: StatBadgetComponent;
  let fixture: ComponentFixture<StatBadgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatBadgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatBadgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
