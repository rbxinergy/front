import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionsComponent } from './new-questions.component';

describe('NewQuestionsComponent', () => {
  let component: NewQuestionsComponent;
  let fixture: ComponentFixture<NewQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewQuestionsComponent]
    });
    fixture = TestBed.createComponent(NewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
