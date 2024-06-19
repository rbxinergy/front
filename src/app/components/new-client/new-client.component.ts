import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class NewClientComponent implements AfterViewInit {

  @ViewChild(ClientComponent) clientComponent: ClientComponent
  errorSteps: Set<number> = new Set();

  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    business_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    county: new FormControl(''),
    district: new FormControl(''),
    country: new FormControl('', Validators.required),
    document_type: new FormControl('RUT', Validators.required),
    document: new FormControl('', Validators.required),
    is_active: new FormControl(true),
    tag: new FormControl('')
  });
  
  constructor(){}

  ngAfterViewInit(): void {
    this.clientComponent.validationStatus.subscribe(isValid => {
      console.log(isValid);
      if (!isValid) {
        this.errorSteps.add(0);
      } else {
        this.errorSteps.delete(0);
      }
    });
  }

  hasError(stepIndex: number): boolean {
    return this.errorSteps.has(stepIndex);
  }

  onValidationStatus($event: boolean) {
    console.log($event);
    if (!$event) {
      this.errorSteps.add(0);
    } else {
      this.errorSteps.delete(0);
    }
  }

  save() {
    console.log(this.clientForm.getRawValue());
  }
}
