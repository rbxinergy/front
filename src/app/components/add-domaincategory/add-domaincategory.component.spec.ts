import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomaincategoryComponent } from './add-domaincategory.component';

describe('AddDomaincategoryComponent', () => {
  let component: AddDomaincategoryComponent;
  let fixture: ComponentFixture<AddDomaincategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDomaincategoryComponent]
    });
    fixture = TestBed.createComponent(AddDomaincategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
