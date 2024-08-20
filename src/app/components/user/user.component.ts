import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { Role } from 'src/app/interfaces/role.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Users } from 'src/app/interfaces/users';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userForm: FormGroup;

  
  roles = new FormControl('');
  rolesList : any= [{name: 'administrador', id: '123'},{name: 'lectura', id: '1234'} ];

  constructor( private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder) {
    if(data) {
      this.userForm = new FormGroup({
        id: new FormControl(data?.id || null, Validators.required),
        name: new FormControl( data?.name || '', Validators.required),
        lastName: new FormControl( data?.lastName|| '', Validators.required),
        email: new FormControl( data?.email || '', [Validators.required, Validators.email]),
        jobTitle: new FormControl( data?.jobTitle || ''),
        tag: new FormControl( data?.tag || ''),
        idRole: new FormControl( data?.idRole || ''),
        active: new FormControl( data?.idRole || false),
      });
    }
  }


  

  save() {
    this.dialogRef.close(this.userForm.getRawValue());
  }

}
