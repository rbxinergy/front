import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectionDialogComponent } from './client-selection-dialog.component';

describe('ClientSelectionDialogComponent', () => {
  let component: ClientSelectionDialogComponent;
  let fixture: ComponentFixture<ClientSelectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSelectionDialogComponent]
    });
    fixture = TestBed.createComponent(ClientSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
