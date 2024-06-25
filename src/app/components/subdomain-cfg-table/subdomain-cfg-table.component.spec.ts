import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainCfgTableComponent } from './subdomain-cfg-table.component';

describe('SubdomainCfgTableComponent', () => {
  let component: SubdomainCfgTableComponent;
  let fixture: ComponentFixture<SubdomainCfgTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubdomainCfgTableComponent]
    });
    fixture = TestBed.createComponent(SubdomainCfgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
