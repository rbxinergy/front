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
  company: Company | null = null; // Inicializa company como null

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('client') || '';
    this.companyId = this.route.snapshot.paramMap.get('company') || '';
    console.log('companyConfig', this.clientId, this.companyId);
    this.loadCompanyData(this.clientId, this.companyId);
  }

  loadCompanyData(id: string, company: string | null) {
    if (company) {
      this.companyService.getCompany(this.companyId, company).subscribe(data => {
        this.company = data;
      });
    } else {
      this.companyService.getCompaniesByGroup(this.companyId).subscribe(data => {
        this.company = data[0];
      });
    }
  }


}
