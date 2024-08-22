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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      if(data) {
        this.roleForm = new FormGroup({
          accessType: new FormControl(data?.role?.accessType || ''),
          active: new FormControl(data?.role?.active || false),
          company: new FormControl(data?.role?.company || ''),
          client: new FormControl(data?.role?.client || ''),
          create: new FormControl(data?.role?.create || false),
          delete: new FormControl(data?.role?.delete || false),
          description: new FormControl(data?.role?.description || ''),
          name: new FormControl(data?.role?.name || ''),
          read: new FormControl(data?.role?.read || false),
          tag: new FormControl(data?.role?.tag || ''),
          update: new FormControl(data?.role?.update || false)
        });
      }
    }

  closeModal() {
    this.dialogRef.close({role: this.roleForm?.getRawValue(), id: this.data?.id});
  }
}