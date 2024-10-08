import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCategoriesComponent } from './corp-categories.component';

describe('CorpCategoriesComponent', () => {
  let component: CorpCategoriesComponent;
  let fixture: ComponentFixture<CorpCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorpCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorpCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
