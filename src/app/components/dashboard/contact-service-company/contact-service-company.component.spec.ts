import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactServiceCompanyComponent } from './contact-service-company.component';

describe('ContactServiceCompanyComponent', () => {
  let component: ContactServiceCompanyComponent;
  let fixture: ComponentFixture<ContactServiceCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactServiceCompanyComponent]
    });
    fixture = TestBed.createComponent(ContactServiceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
