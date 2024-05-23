import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainComponent } from './subdomain.component';

describe('SubdomainComponent', () => {
  let component: SubdomainComponent;
  let fixture: ComponentFixture<SubdomainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubdomainComponent]
    });
    fixture = TestBed.createComponent(SubdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
