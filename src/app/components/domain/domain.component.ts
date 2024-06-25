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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { Domain } from 'src/app/intefaces/domain.interface';



@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent {
  domainForm: FormGroup;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<DomainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Domain,
    private fb: FormBuilder) {
      if(data) {
        this.domainForm = new FormGroup({
          id: new FormControl(data?.id || '', Validators.required),
          name: new FormControl(data?.name || '', Validators.required),
          description: new FormControl(data?.description || '', Validators.required),
          code: new FormControl(data?.code || '', Validators.required),
          tag: new FormControl(data?.tag || ''),
          idDomainCategory: new FormControl(data?.idDomainCategory || '', Validators.required),
          idCompany: new FormControl(data?.idCompany || '', Validators.required),
        });
      
      }
    }

  closeModal(){
    this.dialogRef.close(this.domainForm.getRawValue());
  }
}
