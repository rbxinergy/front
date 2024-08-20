import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryTableComponent } from './service-category-table.component';

describe('ServiceCategoryTableComponent', () => {
  let component: ServiceCategoryTableComponent;
  let fixture: ComponentFixture<ServiceCategoryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCategoryTableComponent]
    });
    fixture = TestBed.createComponent(ServiceCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
