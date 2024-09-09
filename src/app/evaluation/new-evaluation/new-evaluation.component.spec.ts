import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEvaluationComponent } from './new-evaluation.component';

describe('EvaluationComponent', () => {
  let component: NewEvaluationComponent;
  let fixture: ComponentFixture<NewEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEvaluationComponent]
    });
    fixture = TestBed.createComponent(NewEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
