import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule
  ],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  permissionForm = new FormGroup({
    id: new FormBuilder().control(null, Validators.required),
    is_create: new FormBuilder().control(false),
    is_read: new FormBuilder().control(false),
    is_update: new FormBuilder().control(false),
    is_delete: new FormBuilder().control(false),
    id_role: new FormBuilder().control(null, Validators.required),
  });

  roles: any[] = []
}
