import { Component, Inject, ChangeDetectorRef, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Company } from 'src/app/interfaces/company.interface';


@Component({
  selector: 'app-subdomain',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatIconModule,
    MatTableModule
  ],
  templateUrl: './subdomain.component.html',
  styleUrls: ['./subdomain.component.css']
})
export class SubdomainComponent {
  selectedDomainId = this.data?.id
  selectedDomainName = this.data?.name
  domainsMap: { [key: string]: SubDomain[] } = {};
  subdomainForm: FormGroup;

  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["Nombre", "Descripción", "Tags", "Eliminar"]

  name = new FormControl('')
  description = new FormControl('')
  tag = new FormControl('')


  subdomainsMap: { [key: string]: SubDomain[] } = {};

  constructor(@Optional() public dialog: MatDialog, @Optional() private dialogRef: MatDialogRef<SubdomainComponent>,
  @Inject(MAT_DIALOG_DATA) public data: SubDomain,
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: Company,
    private cd: ChangeDetectorRef,
    private _fb: FormBuilder) {
      if(data) {
        this.subdomainForm = new FormGroup({
          id: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          is_active: new FormControl(true),
          is_delete: new FormControl(false),
          created_date: new FormControl(new Date(), Validators.required),
          modificated_date: new FormControl(new Date(), Validators.required),
          tag: new FormControl(''),
          idDomain: new FormControl(data?.id, Validators.required),
        })
      }
    }
        



    ngOnInit(): void {

      this.subdomainForm = this._fb.group({
        name: this.name,
        description: this.description,
        tags: this.tag,
        subdominios: this._fb.array([])
      });
  
    };
  
    get subdomains() {
      return this.subdomainForm.controls["subdominios"] as FormArray;
    };
  
    addSubdomains(selectedDomainId: string): void {
  
      const subdomainsForm = this._fb.group({
        name: [''],
        description: [''],
        tag: ['']
      });
  
  
      this.subdomains.push(subdomainsForm);
      this.dataSourcePacks = new MatTableDataSource(this.subdomains.controls);
  
      this.cd.detectChanges();
  
    };
  
  
    deleteSubdomain(index: number): void {
  
      this.subdomains.removeAt(index);
      this.dataSourcePacks = new MatTableDataSource(this.subdomains.controls);
  
    };
  
  
    onSubmit(selectedDomainId: string):void {
    
      if (!this.subdomainsMap[selectedDomainId]) {
          this.subdomainsMap[selectedDomainId] = [];
      }

      this.dialogRef.close(this.subdomains.value);
    }
  
  closeModal(selectedDomainId:string){
    const subdominios = []
    subdominios.push(this.subdomainForm.getRawValue())
    console.log('GUARDAR',subdominios)
    this.dialogRef.close(this.subdomainForm.getRawValue());
  }

  // saveSubdomain() {
  //   this.dialog.open(MessagesModalComponent, {
  //     width: '500px',
  //     enterAnimationDuration:'500ms',
  //     exitAnimationDuration:'500ms',
  //     data: {
  //       message: 'Elemento creado satisfactoriamente',
  //       type: 'sucsess'
  //     }
  //   });
  // }
}






