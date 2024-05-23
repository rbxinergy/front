import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './stepper/client/client.component';
import { DomainsComponent } from './stepper/domains/domains.component';
import { CompanyComponent } from './stepper/company/company.component';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { UsersComponent } from './stepper/users/users.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactServiceCompanyComponent } from './contact-service-company/contact-service-company.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http)
}

@NgModule({
  imports: [
    CommonModule,
    ClientComponent,
    DomainsComponent,
    CompanyComponent,
    UsersComponent,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports:[
    ClientComponent,
    DomainsComponent,
    CompanyComponent,
    UsersComponent,
    TranslateModule
  ],
  providers :[
    DomainsService
  ]
})
export class StepperModule { }