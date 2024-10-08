import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCategoryTableComponent } from './domain-category-table.component';

describe('DomainCategoryTableComponent', () => {
  let component: DomainCategoryTableComponent;
  let fixture: ComponentFixture<DomainCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainCategoryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
