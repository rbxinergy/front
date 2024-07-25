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
import { ServicecompanyComponent } from './components/servicecompany/servicecompany.component';
import { ResponsiveMenuComponent } from './components/dashboard/responsive-menu/responsive-menu.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { CompanyConfigComponent } from './components/company-config/company-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:[
      { path: 'new-client', component: NewClientComponent },
      { path: 'stepper', component: StepperComponent},
      { title: 'Clientes', path: 'clients', component: ClientsComponent},
      { path: 'configs', component: ConfigsComponent},
      { path: 'company', component: CompanyComponent},
      { path: 'integrations', component: IntegrationsComponent},
      { path: 'roles', component: RolesComponent },
      { path: 'nav', component: ResponsiveMenuComponent },
      { path: 'contact-service-company', component: ContactServiceCompanyComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'servicecategory', component: ServicecategoryComponent },
      { path: 'servicecompany', component: ServicecompanyComponent },
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
      { path: 'session', component: SessionComponent },
      { path: 'company-config/:client/:company', component: CompanyConfigComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'sign-up', component: SignUpComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
//     children:[
//       { path: 'new-client', component: NewClientComponent, canActivateChild: [AuthGuard] },
//       { path: 'stepper', component: StepperComponent, canActivateChild: [AuthGuard] },
//       { title: 'Clientes', path: 'clients', component: ClientsComponent, canActivateChild: [AuthGuard] },
//       { path: 'configs', component: ConfigsComponent, canActivateChild: [AuthGuard] },
//       { path: 'company', component: CompanyComponent, canActivateChild: [AuthGuard] },
//       { path: 'integrations', component: IntegrationsComponent, canActivateChild: [AuthGuard] },
//       { path: 'roles', component: RolesComponent, canActivateChild: [AuthGuard] },
//       { path: 'nav', component: ResponsiveMenuComponent, canActivateChild: [AuthGuard] },
//       { path: 'contact-service-company', component: ContactServiceCompanyComponent, canActivateChild: [AuthGuard] },
//       { path: 'contact', component: ContactComponent, canActivateChild: [AuthGuard] },
//       { path: 'servicecategory', component: ServicecategoryComponent, canActivateChild: [AuthGuard] },
//       { path: 'servicecompany', component: ServicecompanyComponent, canActivateChild: [AuthGuard] },
//       { path: 'provider', component: ProviderComponent, canActivateChild: [AuthGuard] },
//       { path: 'company2', component: CompanyCmp, canActivateChild: [AuthGuard] },
//       { path: 'domain', component: DomainComponent, canActivateChild: [AuthGuard] },
//       { path: 'subdomain', component: SubdomainComponent, canActivateChild: [AuthGuard] },
//       { path: 'domaincategory', component: DomaincategoryComponent, canActivateChild: [AuthGuard] },
//       { path: 'groupcompany', component: GroupcompanyComponent, canActivateChild: [AuthGuard] },
//       { path: 'client', component: ClientComponent, canActivateChild: [AuthGuard] },
//       { path: 'user', component: UserComponent, canActivateChild: [AuthGuard] },
//       { path: 'roles2', component: RoleComponent, canActivateChild: [AuthGuard] },
//       { path: 'permission', component: PermissionComponent, canActivateChild: [AuthGuard] },  
//       { path: 'company-config/:client/:company', component: CompanyConfigComponent, canActivateChild: [AuthGuard] }
//     ]
//   },
// ];