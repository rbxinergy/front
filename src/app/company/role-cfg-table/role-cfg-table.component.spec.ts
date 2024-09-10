import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCfgTableComponent } from './role-cfg-table.component';

describe('RoleCfgTableComponent', () => {
  let component: RoleCfgTableComponent;
  let fixture: ComponentFixture<RoleCfgTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoleCfgTableComponent]
    });
    fixture = TestBed.createComponent(RoleCfgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
