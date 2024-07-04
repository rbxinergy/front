import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RoleComponent } from '../role/role.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CompanyService } from 'src/app/services/company.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from '../../interfaces/role.interface';
import { RoleService } from 'src/app/services/role.service';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientDataService } from 'src/app/services/client-data.service';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule
  ]
})
export class RoleTableComponent {
  displayedColumns: string[] = [
    'name', 'client', 'actions'
  ];
  dataSource = new MatTableDataSource<Role>();
  roles: Role[] = [];
  selectedRole: Role | null = null;
  formRoleTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  client: Client;

  constructor(private roleService: RoleService, private cdr: ChangeDetectorRef,
      private dialog: MatDialog, private clientDataService: ClientDataService) {}

  ngAfterViewInit(): void {
    //this.loadClientData();
  }

  // loadClientData() {s
  //   this.client = this.clientDataService.getClientData();
  //   console.log('client', this.client);
  //   this.loadRoles(this.client.name);
  // }

  // loadRoles(clientName: string) {
  //   this.roleService.getRoles(clientName).subscribe((roles: any) => {
  //     if(roles.body.length === 0){
  //       this.formRoleTable.controls['tempControl'].setValue('');
  //     }
  //     this.roles = roles.body;
  //     this.dataSource.data = this.roles;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
  //       const sortState: Sort = {active: 'id', direction: 'desc'};
  //       this.sort.active = sortState.active;
  //       this.sort.direction = sortState.direction;
  //       this.sort.sortChange.emit(sortState);
  //       this.dataSource.sort = this.sort;
  //     this.sort.direction = 'desc'; // Establece el orden inicial como descendente
  //     this.sort.active = 'id'; // Establece 'ID' como la columna activa para ordenar
  //     this.cdr.detectChanges(); // Forzar la detección de cambios
  //   });
  // }


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

  openNewRoleModal() {
    const maxId = this.roles.length > 0 ? Math.max(...this.roles.map(role => role.id)) : 0;
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '600px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe({
      next: (newRole: Role) => {
        if (newRole) {
          this.roleService.createRole(newRole).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.formRoleTable.controls['tempControl'].setValue(newRole.name);
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Rol creado exitosamente.', type: 'success' }
                });
                newRole.id = maxId + 1;
                this.roles.push(response.body);
                this.dataSource.data = this.roles;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear el rol.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear el rol.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }
  
  openEditRoleModal(role: Role) {
    this.selectedRole = { ...role };
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '600px',
      data: this.selectedRole
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedRole: Role) => {
        if (updatedRole) {
          this.roleService.updateRole(updatedRole).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Rol actualizado exitosamente.', type: 'success' }
                });
                const index = this.roles.findIndex(c => c.name === updatedRole.name);
                if (index !== -1) {
                  this.roles[index] = response.body;
                  this.dataSource.data = this.roles;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar el rol.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar el rol.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  openDeleteRoleModal(role: Role) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar el rol ${role.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.roleService.deleteRole(role.name).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Rol eliminado exitosamente.', type: 'success' }
                });
                this.roles = this.roles.filter(c => c.name !== role.name);
                this.dataSource.data = this.roles;
                if(this.roles.length === 0){
                  this.formRoleTable.controls['tempControl'].setValue(null);
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar el rol.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar el rol.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }
}
