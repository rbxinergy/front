import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadComponent } from './bulk-upload.component';

describe('BulkUploadComponent', () => {
  let component: BulkUploadComponent;
  let fixture: ComponentFixture<BulkUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BulkUploadComponent]
    });
    fixture = TestBed.createComponent(BulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
