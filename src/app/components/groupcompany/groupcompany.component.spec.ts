import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcompanyComponent } from './groupcompany.component';

describe('GroupcompanyComponent', () => {
  let component: GroupcompanyComponent;
  let fixture: ComponentFixture<GroupcompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupcompanyComponent]
    });
    fixture = TestBed.createComponent(GroupcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
