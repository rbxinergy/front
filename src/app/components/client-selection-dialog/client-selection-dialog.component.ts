import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-selection-dialog',
  templateUrl: './client-selection-dialog.component.html',
  styleUrls: ['./client-selection-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule, CommonModule]
})
export class ClientSelectionDialogComponent {
  selectedClient: string;

  constructor(
    public dialogRef: MatDialogRef<ClientSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clients: string[] }
  ) {
    console.log("DATA CLIENT SELECTION", data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect(): void {
    sessionStorage.setItem('client', this.selectedClient);
    this.dialogRef.close();
  }
}
