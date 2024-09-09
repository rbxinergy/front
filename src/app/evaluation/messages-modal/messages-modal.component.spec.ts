import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesModalComponent } from './messages-modal.component';

describe('MessagesModalComponent', () => {
  let component: MessagesModalComponent;
  let fixture: ComponentFixture<MessagesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesModalComponent]
    });
    fixture = TestBed.createComponent(MessagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
