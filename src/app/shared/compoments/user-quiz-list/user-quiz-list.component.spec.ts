import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizListComponent } from './user-quiz-list.component';

describe('UserQuizListComponent', () => {
  let component: UserQuizListComponent;
  let fixture: ComponentFixture<UserQuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQuizListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
