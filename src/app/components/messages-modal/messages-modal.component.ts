import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, TranslateModule]
})
export class MessagesModalComponent {
  modalTitle: string = '';
  modalMessage: string = '';
  modalColor: string = '';
  showCancel: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MessagesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, type: string, showCancel: boolean}
  ) {
    this.modalTitle = this.data.type;
    this.showCancel = this.data.showCancel;
  }


  onClose() {
    this.dialogRef.close();
  }
}
