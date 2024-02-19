import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './stepper/client/client.component';
import { DomainsComponent } from './stepper/domains/domains.component';
import { CompanyComponent } from './stepper/company/company.component';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { UsersComponent } from './stepper/users/users.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClientComponent,
    DomainsComponent,
    CompanyComponent,
    UsersComponent
  ],
  exports:[
    ClientComponent,
    DomainsComponent,
    CompanyComponent,
    UsersComponent
  ],
  providers :[
    DomainsService
  ]
})
export class StepperModule { }