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

  company: { id: string, name: string } | null = null; // Inicializa company como null
  idGroupCompany: string;
  idCompany: string;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.idGroupCompany = this.route.snapshot.paramMap.get('idGroupCompany') || '';
    this.idCompany = this.route.snapshot.paramMap.get('idCompany') || '';
    console.log('companyConfig', this.idGroupCompany);
    console.log('companyConfig', this.idCompany);
    this.loadCompany();
  }

  loadCompany(): void {
    this.companyService.getCompany(this.idCompany, this.idGroupCompany).subscribe(
      (company) => {
        this.company = company;
        console.log('Company loaded:', this.company);
      },
      (error) => {
        console.error('Error loading company:', error);
      }
    );
  }

}