import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyConfigComponent } from './company-config/company-config.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'company-config/:idCompany/:idGroupCompany', component: CompanyConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
