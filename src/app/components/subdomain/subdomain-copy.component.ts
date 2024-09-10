import { Component, Inject, ChangeDetectorRef, Optional } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormArray, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SubDomain } from 'src/app/interfaces/domain.interface';

import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Company } from 'src/app/company/interfaces/company.interface';


@Component({
  selector: 'app-subdomain',
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.css'],
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatIconModule,
    MatTableModule, NgFor
  ]
})
export class SubdomainComponent {
  selectedDomainId = this.data?.idDomain
  selectedDomainName = this.data?.name
  domainsMap: { [key: string]: SubDomain[] } = {};
  subdomainForm: FormGroup;
  subdomainsForm: FormGroup;
  subdomains: SubDomain[] = [];
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["Nombre", "Descripción", "Tags", "Eliminar"]


  constructor(@Optional() public dialog: MatDialog, @Optional() private dialogRef: MatDialogRef<SubdomainComponent>,
  @Inject(MAT_DIALOG_DATA) public data,
    private cd: ChangeDetectorRef,
    private _fb: FormBuilder) {
      if(data.data) {
        this.subdomainForm = this._fb.group({
          id: new FormControl(data?.data?.id || '', Validators.required),
          name: new FormControl(data?.data?.name || '', Validators.required),
          description: new FormControl(data?.data?.description || '', Validators.required),
          tag: new FormControl(data?.data?.tag || ''),
          idDomain: new FormControl(data?.data?.idDomain || '', Validators.required)
        })
      }

      this.subdomainsForm = this._fb.group({
        id: new FormControl([''], Validators.required),
        name: new FormControl([''], Validators.required),
        description: new FormControl([''], Validators.required),
        tag: new FormControl([''])
      })
      
    }
  
    get subdomainss() {
      return this.subdomainsForm.controls["subdominios"] as FormArray;
    };
  
  addSubdomains(selectedDomainId: string): void {
    const subdomainsForm = this._fb.group({
      name: [''],
      description: [''],
      tag: [''],
      idDomain: ['']
    }) as unknown as any;

    this.subdomains.push(subdomainsForm.value);
    this.dataSourcePacks = new MatTableDataSource(this.subdomains);
    this.cd.detectChanges();
  };
  
  onSubmit(selectedDomainId: string):void {
    this.dialogRef.close(this.subdomains)
    
  }
  onUpdate(){
    this.dialogRef.close(this.subdomainForm.getRawValue());
  }
  
  closeModal(selectedDomainId:string){
    const subdominios = []
    subdominios.push(this.subdomainForm.getRawValue())
    console.log('GUARDAR',subdominios)
    this.dialogRef.close(this.subdomainForm.getRawValue());
  }

  deleteSubdomain(i: number): void {
    console.log(i)
    console.log(this.subdomains)
    this.subdomains.splice(i, 1);
    this.dataSourcePacks = new MatTableDataSource(this.subdomains);
  };

}
