import { OnInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from "../../components/user/user.component";
import { UsersTableComponent } from "../users-table/users-table.component";
import { CompanyService } from 'src/app/services/company.service';

import { ActivatedRoute } from '@angular/router';
import { RoleCfgTableComponent } from "../role-cfg-table/role-cfg-table.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RoleTableComponent } from '../../components/role-table/role-table.component';


@Component({
    selector: 'app-company-config',
    templateUrl: './company-config.component.html',
    styleUrls: ['./company-config.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RoleTableComponent,
        UserComponent,
        UsersTableComponent,
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