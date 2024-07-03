import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientComponent } from '../client/client.component';
import { CompanyComponent } from '../company/company.component';
import { RoleComponent } from '../role/role.component';
import { UserComponent } from '../user/user.component';
import { DomainComponent } from '../domain/domain.component';
import { SubdomainComponent } from '../subdomain/subdomain.component';
import { MatTableModule } from '@angular/material/table';
import { RoleTableComponent } from '../role-table/role-table.component';
import { CompanyTableComponent } from "../company-table/company-table.component";
import { TranslateModule } from "@ngx-translate/core";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomainTableComponent } from "../domain-table/domain-table.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomainCategoryTableComponent } from '../domain-category-table/domain-category-table.component';


@Component({
    selector: 'app-new-client',
    standalone: true,
    templateUrl: './new-client.component.html',
    styleUrls: ['./new-client.component.css'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        },
        DomainTableComponent
    ],
    imports: [
        CommonModule,
        MatStepperModule,
        MatButtonModule,
        ReactiveFormsModule,
        ClientComponent,
        CompanyComponent,
        RoleComponent,
        UserComponent,
        DomainComponent,
        SubdomainComponent,
        RoleTableComponent,
        MatTableModule,
        CompanyTableComponent,
        TranslateModule,
        DomainTableComponent,
        DomainCategoryTableComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class NewClientComponent implements AfterViewInit {

  @ViewChild(ClientComponent) clientComponent: ClientComponent;
  @ViewChild(CompanyTableComponent) companyTableComponent: CompanyTableComponent;
  @ViewChild(RoleTableComponent) roleTableComponent: RoleTableComponent;
  @ViewChild(RoleTableComponent) domainCategoryTableComponent: DomainCategoryTableComponent;

  companyForm: FormGroup = new FormGroup({
    field1: new FormControl('', Validators.required)
  });

  errorSteps: Set<number> = new Set();

  get clientForm() {
    return this.clientComponent?.clientForm;
  }

  get companyTableForm() {
    return this.companyTableComponent?.formCompanyTable;
  }

  get roleTableForm() {
    return this.roleTableComponent?.formRoleTable;
  }

  get domainCategoryTableForm() {
    return this.domainCategoryTableComponent
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onValidationStatus($event: boolean) {
    console.log($event);
    if (!$event) {
      this.errorSteps.add(0);
    } else {
      this.errorSteps.delete(0);
    }
  }
}
