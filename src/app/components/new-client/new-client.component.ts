import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from '../client/client.component';
import { CompanyComponent } from '../company/company.component';
import { RoleComponent } from '../role/role.component';
import { UserComponent } from '../user/user.component';
import { DomainComponent } from '../domain/domain.component';
import { SubdomainComponent } from '../subdomain/subdomain.component';
import { MatTableModule } from '@angular/material/table';
import { RoleTableComponent } from '../role-table/role-table.component';
import { CompanyTableComponent } from "../company-table/company-table.component";

@Component({
    selector: 'app-new-client',
    standalone: true,
    templateUrl: './new-client.component.html',
    styleUrls: ['./new-client.component.css'],
    imports: [
        CommonModule,
        MatStepperModule,
        MatButtonModule,
        ReactiveFormsModule,
        ClientComponent,
        CompanyComponent,
        RoleComponent,
        UserComponent,
        DomainComponent,
        SubdomainComponent,
        RoleTableComponent,
        MatTableModule,
        CompanyTableComponent
    ]
})
export class NewClientComponent {

}
