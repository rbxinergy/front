import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaireComponent } from './questionaires.component';

describe('QuestionaireComponent', () => {
  let component: QuestionaireComponent;
  let fixture: ComponentFixture<QuestionaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionaireComponent]
    });
    fixture = TestBed.createComponent(QuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
