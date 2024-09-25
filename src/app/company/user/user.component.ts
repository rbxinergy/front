import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, AbstractControl } from '@angular/forms';
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
import { Role } from 'src/app/interfaces/role.interface';
import { RoleService } from '../services/role.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  roles: Role[] = [];
  hidePassword = true;
  hideConfirmPassword = true;

  constructor( private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private roleService: RoleService) {
    if(data) {
      this.userForm = this.fb.group({
        id: [data.id],
        name: [data.name, Validators.required],
        lastName: [data.lastName, Validators.required],
        jobTitle: [data.jobTitle, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        tag: [data.tag],
        idRole: [data.idRole, Validators.required],
        company: [data.company],
        passwd: [data.password, Validators.required],
        confirmPassword: [data.confirmPassword, Validators.required]
      }, {validator: this.passwordMatchValidator});
    }
  }

  ngOnInit(): void {
    console.log('Data', this.data);
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRolesByCompany(this.data.companyId).subscribe(
      (response: HttpResponse<any>) => {
        this.roles = response.body;
        console.log('Roles', this.roles);
      },
      (error) => {
        console.error('Error al cargar roles:', error);
      }
    );
  }

  save() {
    this.dialogRef.close(this.userForm.getRawValue());
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('passwd');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

}
