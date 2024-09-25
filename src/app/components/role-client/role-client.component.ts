import { Component, AfterViewInit } from '@angular/core';
import { RoleService } from '../../company/services/role.service';
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
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleComponent } from '../role/role.component';


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
  displayedColumns2: string[] = ['name', 'status', 'read', 'create', 'update', 'delete', 'actions'];
  clientName: string = sessionStorage.getItem('clientName') || '';
  initialRolesState: { [key: string]: any } = {};

  constructor(private roleService: RoleService, private router: Router, private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.roleService.getAllRolesByClient(this.client).subscribe((response: HttpResponse<any>) => {
      this.roles = response.body;
      this.roles.forEach(role => {
        this.initialRolesState[role.id] = { ...role };
      });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    const event = { target: input } as Event & { target: HTMLInputElement };
    this.applyFilter(event);
  }

  newRole(): void {
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        result.role.client = this.client;
        delete result.role.company;
        console.log(result);
        this.roleService.createRole(result.role).subscribe((response: HttpResponse<any>) => {
          if(response.status === 200) {
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Rol creado correctamente',
                type: 'success'
              }
            }); 
            this.ngAfterViewInit();
          } else {
            this.dialog.open(MessagesModalComponent, {
              data: {
                message: 'Error al crear el rol',
                type: 'error'
              }
            });
          }
        });
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Error al crear el rol',
            type: 'error'
          }
        });
      }
    });
  }

  applyChanges(element: Role): void {
    console.log('apply changes', element);
    this.roleService.updateRole(element, element.id).subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Cambios aplicados correctamente',
            type: 'success'
          }
        });
        this.ngAfterViewInit();
      } else {
        this.dialog.open(MessagesModalComponent, {
          data: {
            message: 'Error al aplicar los cambios',
            type: 'error'
          }
        });
      }
    });
  }

  hasChanges(role: any): boolean {
    const initialRole = this.initialRolesState[role.id];
    return (
      role.read !== initialRole.read ||
      role.create !== initialRole.create ||
      role.update !== initialRole.update ||
      role.delete !== initialRole.delete ||
      role.active !== initialRole.active
    );
  }
}
