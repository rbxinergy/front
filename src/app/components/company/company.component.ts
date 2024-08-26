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
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { Company } from 'src/app/interfaces/company.interface';
import { GroupCompany } from 'src/app/interfaces/groupcompany.interface';
import { GroupCompanyService } from 'src/app/services/groupcompany.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule
  ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  companyForm: FormGroup;
  groupCompany: GroupCompany[] = [];
  client: string = sessionStorage.getItem('client') || '';

  constructor(private dialogRef: MatDialogRef<CompanyComponent>,@Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder, private groupCompanyService: GroupCompanyService) {
    this.companyForm = new FormGroup({
      id: new FormControl(data?.id || null),
      name: new FormControl(data?.name || '', [Validators.required]),
      businessName: new FormControl(data?.businessName || '', [Validators.required]),
      address: new FormControl(data?.address || '', [Validators.required]),
      city: new FormControl(data?.city || ''),
      state: new FormControl(data?.state || ''),
      county: new FormControl(data?.county || ''),
      district: new FormControl(data?.district || ''),
      country: new FormControl(data?.country || '', [Validators.required]),
      documentType: new FormControl(data?.documentType || '', [Validators.required]),
      document: new FormControl(data?.document || '', [Validators.required]),
      headquarters: new FormControl(data?.headquarters || false),
      branch: new FormControl(data?.branch || false),
      active: new FormControl(data?.active || true),
      tag: new FormControl(data?.tag || ''),
      idContact: new FormControl(data?.idContact || []),
      idGroupCompany: new FormControl(data?.idGroupCompany || '')
    });

    this.groupCompanyService.getGroupCompanies(this.client).subscribe({
      next: (data: any) => {
        this.groupCompany = data.body;
      },
      error: (error: any) => {
        console.log(error);
        this.dialogRef.close(null);
      }
    })

  }

  closeModal() {
    this.dialogRef.close(this.companyForm.getRawValue());
  }
}
