import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionnaireComponent } from './new-questionnaire.component';

describe('NewQuestionnaireComponent', () => {
  let component: NewQuestionnaireComponent;
  let fixture: ComponentFixture<NewQuestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewQuestionnaireComponent]
    });
    fixture = TestBed.createComponent(NewQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
