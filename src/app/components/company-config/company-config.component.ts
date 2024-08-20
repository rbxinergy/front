import { OnInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { DomainComponent } from "../domain/domain.component";
import { SubdomainComponent } from "../subdomain/subdomain.component";
import { DomaincategoryComponent } from "../domaincategory/domaincategory.component";
import { RoleComponent } from "../role/role.component";
import { UserComponent } from "../user/user.component";
import { UsersTableComponent } from "../users-table/users-table.component";
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { DomainTableComponent } from "../domain-table/domain-table.component";
import { DomainCfgTableComponent } from "../domain-cfg-table/domain-cfg-table.component";
import { SubdomainCfgTableComponent } from "../subdomain-cfg-table/subdomain-cfg-table.component";
import { DomainCategoryTableComponent } from "../domain-category-table/domain-category-table.component";
import { RoleCfgTableComponent } from "../role-cfg-table/role-cfg-table.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RoleTableComponent } from '../role-table/role-table.component';

@Component({
    selector: 'app-company-config',
    templateUrl: './company-config.component.html',
    styleUrls: ['./company-config.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatStepperModule,
        DomainComponent,
        SubdomainComponent,
        DomaincategoryComponent,
        RoleComponent,
        RoleTableComponent,
        UserComponent,
        UsersTableComponent,
        DomainTableComponent,
        DomainCfgTableComponent,
        SubdomainCfgTableComponent,
        DomainCategoryTableComponent,
        RoleCfgTableComponent,
        MatTabsModule,
        MatProgressSpinnerModule,
    ],
})
export class CompanyConfigComponent implements OnInit{

  clientId: string;
  companyId: string;
  company: Company ; // Inicializa company como null
  idGroupCompany: string;
  idCompany: string;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('company') || '';
    // this.clientId = this.route.snapshot.paramMap.get('client') || '';
    // console.log('companyConfig', this.clientId, this.companyId);
    // this.loadCompanyData(this.clientId, this.companyId);
    this.companyService.getCompany(this.companyId, 'a6be19ce-1f93-4dbf-aaa8-d42341bc8d22').subscribe(data => {
      this.company = data;
      console.log(this.company)
    });
  }

  // loadCompanyData(id: string, company: string | null) {
  //   if (company) {
  //     this.companyService.getCompany(this.companyId, 'a6be19ce-1f93-4dbf-aaa8-d42341bc8d22').subscribe(data => {
  //       this.company = data;
  //       console.log(this.company)
  //     });
  //   } else {
  //     this.companyService.getCompaniesByClient(this.companyId).subscribe(data => {
  //       this.company = data[0];
  //     });
  //   }
  //   this.idGroupCompany = this.route.snapshot.paramMap.get('idGroupCompany') || '';
  //   this.idCompany = this.route.snapshot.paramMap.get('idCompany') || '';
  //   console.log('companyConfig', this.idGroupCompany, this.idCompany);
  //   this.loadCompanyData(this.idCompany, this.idGroupCompany);
  // }

  // loadCompanyData(company: string, groupCompany: string) {
  //   this.companyService.getCompanyByGroupCompany(company, groupCompany).subscribe(data => {
  //     this.company = data;
  //   });
  // }


}
