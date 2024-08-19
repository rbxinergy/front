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
import { Domain } from 'src/app/interfaces/domain.interface';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import { DomainCategory } from 'src/app/interfaces/domaincategory.interface';



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
  idGroupCompany: string = ''
  datos: any 
  companies: Company[] = []
  
  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<DomainComponent>, private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data:Domain ) {
      if(data) {
        console.log(data)
          this.datos = data
        this.domainForm = new FormGroup({
          id: new FormControl(data?.id || '', Validators.required),
          name: new FormControl(data?.name || '', Validators.required),
          description: new FormControl(data?.description || '', Validators.required),
          code: new FormControl(data?.code || '', Validators.required),
          tag: new FormControl(data?.tag || ''),
          idDomainCategory: new FormControl(data?.id || '', Validators.required),
          idCompany: new FormControl(data?.idCompany || '', Validators.required),
          idServiceCompany: new FormControl(data?.idServiceCompany || '3d447b9d-76d3-4d02-a045-67ca44d66664', Validators.required),
          active: new FormControl(data?.active || true, Validators.required),
        });
      
      }
      this.idGroupCompany = this.datos.idGroupCompany

      this.companyService.getCompaniesByGroup(this.idGroupCompany).subscribe((companies: Company[]) => {
        console.log('Empresas', companies)
        this.companies = companies
      });
      
    }

  
  
  closeModal(){
    this.dialogRef.close(this.domainForm.getRawValue());
  }
}
