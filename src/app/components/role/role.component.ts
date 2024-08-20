import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { Role } from 'src/app/interfaces/role.interface';
import { ClientDataService } from 'src/app/services/client-data.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule
  ],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  roleForm: FormGroup;
  checked: false

  constructor(@Optional()private dialogRef: MatDialogRef<RoleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Role,
    private fb: FormBuilder, private clientDataService: ClientDataService) {
      if(data) {
        const clientData = this.clientDataService.getClientData();
        this.roleForm = new FormGroup({
          id: new FormControl(data?.id || null),
          name: new FormControl(data?.name || ''),
          description: new FormControl(data?.description || ''),
          client: new FormControl(data?.client || ''),
          company: new FormControl(data?.company || ''),
          create: new FormControl(data?.create || false),
          update: new FormControl(data?.update || false),
          read: new FormControl(data?.read || false),
          delete: new FormControl(data?.delete || false),
          tag: new FormControl(data?.tag || ''),
          accessType: new FormControl(data?.accessType || '')
        });
      }
    }

  closeModal() {
    this.dialogRef.close(this.roleForm?.getRawValue());
  }
}
