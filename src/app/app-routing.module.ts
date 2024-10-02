import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { StepperComponent } from './components/dashboard/stepper/stepper.component';
import { CompanyComponent } from './components/dashboard/company/company.component';
import { IntegrationsComponent } from './components/dashboard/integrations/integrations.component';
import { ClientsComponent } from './components/dashboard/clients/clients.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { ContactServiceCompanyComponent } from './components/dashboard/contact-service-company/contact-service-company.component';
import { ServicecategoryComponent } from './components/servicecategory/servicecategory.component';
import { ProviderComponent } from './components/provider/provider.component';
import { CompanyComponent as CompanyCmp } from './components/company/company.component';
import { DomainComponent } from './components/domain/domain.component';
import { SubdomainComponent } from './components/subdomain/subdomain.component';
import { DomaincategoryComponent } from './components/domaincategory/domaincategory.component';
import { GroupcompanyComponent } from './components/groupcompany/groupcompany.component';
import { ClientComponent } from './components/client/client.component';
import { UserComponent } from './components/user/user.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SessionComponent } from './components/session/session.component';
import { ServicecompanyComponent } from './components/servicecompany/servicecompany.component';
import { ResponsiveMenuComponent } from './components/dashboard/responsive-menu/responsive-menu.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { CompanyTableComponent } from './components/company-table/company-table.component';
import { DomainCfgTableComponent } from './components/domain-cfg-table/domain-cfg-table.component';
import { DomainTableComponent } from './components/domain-table/domain-table.component';
import { GroupCompanyTableComponent } from './components/group-company-table/group-company-table.component';
import { DomainCategoryTableComponent } from './components/domain-category-table/domain-category-table.component';
import { ConfigsComponent } from './components/configs/configs.component';
import { RoleCfgTableComponent } from './company/role-cfg-table/role-cfg-table.component';
import { RoleClientComponent } from './components/role-client/role-client.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { CompanyConfigComponent } from './company/company-config/company-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:[
      { path: '', redirectTo: 'configs', pathMatch: 'full'},
      { path: 'configs', component: ConfigsComponent}, //TODO: Mantener
      { path: 'new-client', component: NewClientComponent }, //TODO: Mantener
      { path: 'stepper', component: StepperComponent}, //TODO: Mantener
      { path: 'clients', component: ClientsComponent}, //TODO: Mantener
      { path: 'company', component: CompanyComponent}, //TODO: Mantener
      { path: 'groupcompany/:client', component: GroupCompanyTableComponent}, //TODO: Mantener
      { path: 'company/:groupCompany', component: CompanyTableComponent}, //TODO: Mantener
      { path: 'integrations', component: IntegrationsComponent}, //TODO: Mantener
      { path: 'roles', component: RolesComponent }, //TODO: Mantener
      { path: 'nav', component: ResponsiveMenuComponent }, //TODO: Mantener
      { path: 'company-config/:company', component: CompanyConfigComponent }, //TODO: Mantener
      { path: 'company-config/:idCompany/:idGroupCompany', component: CompanyConfigComponent }, //TODO: Mantener
      { path: 'bulk-upload', component: BulkUploadComponent }, //TODO: Mantener
      { path: 'role-client', component: RoleClientComponent}, //TODO: Mantener
      {
        path: 'client-module',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [AuthGuard],
        data: { module: 'client', action: 'read' }
      },
      {
        path: 'contact-module',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
        canActivate: [AuthGuard],
        data: { module: 'contact', action: 'read' }
      },
      { path: 'evaluation-module',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
        canActivate: [AuthGuard],
        data: { module: 'evaluation', action: 'read' }
      },
      { path: 'questionnaires-module',
        loadChildren: () => import('./questionnaires/questionnaires.module').then(m => m.QuestionnairesModule),
        canActivate: [AuthGuard],
        data: { module: 'questionnaires', action: 'read' }
      },
      { path: 'questions-module',
        loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
        canActivate: [AuthGuard],
        data: { module: 'questions', action: 'read' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
