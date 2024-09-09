import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLibraryComponent } from './question-library.component';

describe('QuestionLibraryComponent', () => {
  let component: QuestionLibraryComponent;
  let fixture: ComponentFixture<QuestionLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionLibraryComponent]
    });
    fixture = TestBed.createComponent(QuestionLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
