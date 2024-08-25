import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpResponse } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-role-client',
  templateUrl: './role-client.component.html',
  styleUrls: ['./role-client.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, CommonModule,
    MatSlideToggleModule, MatIconModule, MatMenuModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatDialogModule, MatCheckboxModule]
})
export class RoleClientComponent implements AfterViewInit {

  roles: Role[] = [];
  client: string = sessionStorage.getItem('client') || '';
  isLoading = false;
  dataSource = new MatTableDataSource<Role>();
  displayedColumns1 = ['role', 'permission', 'blank'];
  displayedColumns2: string[] = ['name', 'status', 'read', 'write', 'edit', 'delete', 'actions'];
  clientName: string = sessionStorage.getItem('clientName') || '';

  constructor(private roleService: RoleService, private router: Router, private clientService: ClientService) { }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.roleService.getAllRolesByClient(this.client).subscribe((response: HttpResponse<any>) => {
      this.roles = response.body;
      console.log(this.roles);
      this.isLoading = false;
      this.dataSource.data = this.roles;
    });
  }

  openConfig(id: string, idGroupCompany: string): void {
    this.router.navigate(['/role-client/config', id, idGroupCompany]);
  }

  openEdit(id: string): void {
    this.router.navigate(['/role-client/edit', id]);
  }

  openDelete(id: string): void {
    this.router.navigate(['/role-client/delete', id]);
  }

  bulkLoad(): void {
    this.router.navigate(['/dashboard/bulk-upload']);
  }

  togglePermission(element: Role, permission: string): void {
    element[permission] = !element[permission];
  }

}
