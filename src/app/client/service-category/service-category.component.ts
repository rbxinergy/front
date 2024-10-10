import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientDataService } from '../services/client-data.service';
import { ServiceCategoryService } from '../../services/servicecategory.service';
import { BaseComponent } from '../../shared/core/base-componente.component';
import { HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-service-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './service-category.component.html',
  styleUrl: './service-category.component.scss',
})
export class ServiceCategoryComponent extends BaseComponent implements OnInit{

  dataSource: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private serviceCategoryService: ServiceCategoryService,
    private clientDataService: ClientDataService, private dialogRef: MatDialogRef<ServiceCategoryComponent>
  ) {
    super();
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  getServiceCategories() {
    const clientId = this.clientDataService.getClientData().id;
    this.serviceCategoryService.getServiceCategoriesByClient(clientId).subscribe((data: HttpResponse<any>) => {

    });
  }

  saveServiceCategory() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
