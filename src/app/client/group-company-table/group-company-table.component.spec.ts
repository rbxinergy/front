import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCompanyTableComponent } from './group-company-table.component';

describe('CompanyTableComponent', () => {
  let component: GroupCompanyTableComponent;
  let fixture: ComponentFixture<GroupCompanyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCompanyTableComponent]
    });
    fixture = TestBed.createComponent(GroupCompanyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
