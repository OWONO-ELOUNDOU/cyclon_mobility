import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizFormComponent } from './user-quiz-form.component';

describe('UserQuizFormComponent', () => {
  let component: UserQuizFormComponent;
  let fixture: ComponentFixture<UserQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQuizFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
