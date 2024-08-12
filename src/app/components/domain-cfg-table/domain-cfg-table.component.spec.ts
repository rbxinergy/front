import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCfgTableComponent } from './domain-cfg-table.component';

describe('DomainCfgTableComponent', () => {
  let component: DomainCfgTableComponent;
  let fixture: ComponentFixture<DomainCfgTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DomainCfgTableComponent]
    });
    fixture = TestBed.createComponent(DomainCfgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
