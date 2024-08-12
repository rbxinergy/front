import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersconfigsComponent } from './usersconfigs.component';

describe('UsersconfigsComponent', () => {
  let component: UsersconfigsComponent;
  let fixture: ComponentFixture<UsersconfigsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersconfigsComponent]
    });
    fixture = TestBed.createComponent(UsersconfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
