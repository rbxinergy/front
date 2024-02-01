import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ConfigsComponent } from './components/dashboard/configs/configs.component';
import { StepperComponent } from './components/dashboard/stepper/stepper.component';
import { CompanyComponent } from './components/dashboard/company/company.component';
import { IntegrationsComponent } from './components/dashboard/integrations/integrations.component';
import { ClientsComponent } from './components/dashboard/clients/clients.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';


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
      { path: 'roles', component: RolesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
