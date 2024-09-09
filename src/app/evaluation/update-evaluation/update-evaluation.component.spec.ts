import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvaluationComponent } from './update-evaluation.component';

describe('EvaluationComponent', () => {
  let component: UpdateEvaluationComponent;
  let fixture: ComponentFixture<UpdateEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEvaluationComponent]
    });
    fixture = TestBed.createComponent(UpdateEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
