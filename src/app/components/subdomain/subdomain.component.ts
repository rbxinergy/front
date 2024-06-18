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
import { Company } from 'src/app/intefaces/company.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Domain, SubDomain } from 'src/app/intefaces/domain.interface';

@Component({
  selector: 'app-subdomain',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatIconModule
  ],
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.css']
})
export class SubdomainComponent {
  selectedDomainId = this.data.id
  selectedDomainName = this.data.name
  domainsMap: { [key: string]: SubDomain[] } = {};
  subdomainForm: FormGroup;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<SubdomainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder) {
      if(data) {
        this. subdomainForm = new FormGroup({
          id: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          is_active: new FormControl(true),
          is_delete: new FormControl(false),
          created_date: new FormControl(new Date(), Validators.required),
          modificated_date: new FormControl(new Date(), Validators.required),
          tag: new FormControl(''),
          id_domain: new FormControl(data?.id, Validators.required),
        });
      }
    }

  addSubdomain(selectedDomainId:string){
    console.log(this.selectedDomainId)
    if (!this.domainsMap[selectedDomainId]) {
      this.domainsMap[selectedDomainId] = [];
    }
   
    this.domainsMap[selectedDomainId].push({
      name: '',
      description: '',
      is_active: false,
      is_delete: false,
      created_date: '',
      modificated_date: '',
      tag: '',
      id_domain: ''
    });
  }

  
  saveSubdomain() {
    this.dialog.open(MessagesModalComponent, {
      width: '500px',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data: {
        message: 'Elemento creado satisfactoriamente',
        type: 'sucsess'
      }
    });
  }
}
