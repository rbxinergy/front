import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecompanyComponent } from './servicecompany.component';

describe('ServicecompanyComponent', () => {
  let component: ServicecompanyComponent;
  let fixture: ComponentFixture<ServicecompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServicecompanyComponent]
    });
    fixture = TestBed.createComponent(ServicecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
