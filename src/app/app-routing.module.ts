import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ConfigsComponent } from './components/dashboard/domains/domains.component';
import { StepperComponent } from './components/dashboard/stepper/stepper.component';
import { CompanyComponent } from './components/dashboard/company/company.component';
import { IntegrationsComponent } from './components/dashboard/integrations/integrations.component';
import { ClientsComponent } from './components/dashboard/clients/clients.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { ContactServiceCompanyComponent } from './components/dashboard/contact-service-company/contact-service-company.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicecategoryComponent } from './components/servicecategory/servicecategory.component';
import { ProviderComponent } from './components/provider/provider.component';
import { CompanyComponent as CompanyCmp } from './components/company/company.component';
import { DomainComponent } from './components/domain/domain.component';
import { SubdomainComponent } from './components/subdomain/subdomain.component';
import { DomaincategoryComponent } from './components/domaincategory/domaincategory.component';
import { GroupcompanyComponent } from './components/groupcompany/groupcompany.component';
import { ClientComponent } from './components/client/client.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SessionComponent } from './components/session/session.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:[
      { path: 'stepper', component: StepperComponent},
      { title: 'Clientes', path: 'clients', component: ClientsComponent},
      { path: 'configs', component: ConfigsComponent},
      { path: 'company', component: CompanyComponent},
      { path: 'integrations', component: IntegrationsComponent},
      { path: 'roles', component: RolesComponent },
      { path: 'contact-service-company', component: ContactServiceCompanyComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'servicecategory', component: ServicecategoryComponent },
      { path: 'servicecompany', component: ServicecategoryComponent },
      { path: 'provider', component: ProviderComponent },
      { path: 'company2', component: CompanyCmp },
      { path: 'domain', component: DomainComponent },
      { path: 'subdomain', component: SubdomainComponent },
      { path: 'domaincategory', component: DomaincategoryComponent },
      { path: 'groupcompany', component: GroupcompanyComponent },
      { path: 'client', component: ClientComponent },
      { path: 'user', component: UserComponent },
      { path: 'roles2', component: RoleComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'session', component: SessionComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
