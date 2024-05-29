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
import { ResponsiveMenuComponent } from './responsive-menu/responsive-menu.component';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';

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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
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
  ],
  declarations: [
    DashboardComponent
  ],
  bootstrap: [DashboardComponent]
})
export class StepperModule { }