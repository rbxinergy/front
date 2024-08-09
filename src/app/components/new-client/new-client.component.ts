import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
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
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { DomainTableComponent } from "../domain-table/domain-table.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomainCategoryTableComponent } from '../domain-category-table/domain-category-table.component';
import { ClientDataService } from 'src/app/services/client-data.service';
import { GroupCompanyTableComponent } from '../group-company-table/group-company-table.component';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client.interface';


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
        MatSelectModule,
        GroupCompanyTableComponent,
        MessagesModalComponent
    ]
})
export class NewClientComponent implements AfterViewInit {

  @ViewChild(ClientComponent) clientComponent: ClientComponent;
  @ViewChild(CompanyTableComponent) companyTableComponent: CompanyTableComponent;
  @ViewChild(RoleTableComponent) roleTableComponent: RoleTableComponent;
  @ViewChild(DomainCategoryTableComponent) domainCategoryTableComponent: DomainCategoryTableComponent;
  @ViewChild(GroupCompanyTableComponent) groupCompanyTableComponent: GroupCompanyTableComponent;

  showAppCompany: boolean = false;
  showAppRole: boolean = false;
  showAppDomainCategory: boolean = false;
  showAppGroupCompany: boolean = false;

  clientFormValid: boolean = false;
  companyFormValid: boolean = false;
  roleFormValid: boolean = false;
  domainCategoryFormValid: boolean = false;
  groupCompanyFormValid: boolean = false;


  subscriptions: Subscription[] = [];

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

  // get roleTableForm() {
  //   return this.roleTableComponent?.formRoleTable;
  // }

  get domainCategoryTableForm() {
    return this.domainCategoryTableComponent?.formDomainCategoryTable
  }

  get groupCompanyForm() {
    return this.groupCompanyTableComponent?.formGroupCompanyTable;
  }

  constructor(private cdr: ChangeDetectorRef, private clientDataService: ClientDataService,
    private clientService: ClientService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.clientForm?.statusChanges.subscribe(status => {
        this.clientFormValid = status === 'VALID'? true : false;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.companyTableForm?.statusChanges.subscribe(status => {
        this.companyFormValid = status === 'VALID'? true : false;
        this.cdr.detectChanges();
      })
    );

    // this.subscriptions.push(
    //   this.roleTableForm?.statusChanges.subscribe(status => {
    //     this.roleFormValid = status === 'VALID'? true : false;
    //     this.cdr.detectChanges();
    //   })
    // );

    this.subscriptions.push(
      this.groupCompanyForm?.statusChanges.subscribe(status => {
        this.groupCompanyFormValid = status === 'VALID'? true : false;
        this.cdr.detectChanges();
      })
    );  

    this.subscriptions.push(
      this.domainCategoryTableForm?.statusChanges.subscribe(status => {
        this.domainCategoryFormValid = status === 'VALID'? true : false;
        this.cdr.detectChanges();
      })
    );  
    this.cdr.detectChanges();
  }

  onValidationStatus($event: boolean) {
    if (!$event) {
      this.errorSteps.add(0);
    } else {
      this.errorSteps.delete(0);
    }
  }

  onStepChange(event: StepperSelectionEvent) {
    // console.log('Step changed', event);
    switch(event.selectedIndex) {
      case 0:
        this.clientDataService.setClientData(this.clientForm.getRawValue() as unknown as Client);
        break;
      case 1:
        this.showAppGroupCompany = true;
        break;
      case 2:
        this.showAppCompany = true;
        break;
      case 3:
        this.showAppDomainCategory = true;
        break;
    }
    this.cdr.detectChanges();
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
}
