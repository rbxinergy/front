import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessagesModalComponent } from '../../components/messages-modal/messages-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ServiceCategoryComponent } from '../service-category/service-category.component';
import { DomainCategoryComponent } from '../domain-category/domain-category.component';
import { DomainCategoryTableComponent } from '../domain-category-table/domain-category-table.component';
import { ServiceCategoryTableComponent } from '../service-category-table/service-category-table.component';

@Component({
  selector: 'app-corp-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    ServiceCategoryComponent,
    DomainCategoryComponent,
    DomainCategoryTableComponent,
    ServiceCategoryTableComponent
  ],
  templateUrl: './corp-categories.component.html',
  styleUrl: './corp-categories.component.scss'
})
export class CorpCategoriesComponent {
  form: FormGroup;
  hasError = false;

  constructor(private dialog: MatDialog) {


  }

  newDomainCategory() {

  }

  newServiceCategory() {

  }
}