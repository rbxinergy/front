import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule]
})
export class MessagesModalComponent {
  modalTitle: string = '';
  modalMessage: string = '';
  modalColor: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessagesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, type: string}
  ) {
    this.modalTitle = this.data.type === 'error' ? 'Error' : this.data.type === 'info' ? 'Información' : 'Correcto';
  }


  onClose() {
    this.dialogRef.close();
  }
}
