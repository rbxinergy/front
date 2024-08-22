import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoleComponent } from '../role/role.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-cfg-table',
  templateUrl: './role-cfg-table.component.html',
  styleUrls: ['./role-cfg-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ]
})
export class RoleCfgTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'create', 'read', 'update', 'delete', 'acciones'];
  dataSource = new MatTableDataSource<Role>();
  selection = new SelectionModel<Role>(true, []);
  client: string = sessionStorage.getItem('client') || '';
  searchInput: any;
  companyID: any;
  isLoading: boolean = false;
  noRoles: boolean = false; // Nueva variable para controlar la visibilidad del mensaje
  @Input() company: string = ''; // Inicializar con un valor predeterminado

  constructor(private roleService: RoleService, public dialog: MatDialog, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.noRoles = false; // Resetear el flag
    console.log('cliente', this.client)
    console.log('company', this.company)
    this.roleService.getAllRolesByCompany(this.company).subscribe(
      (response: HttpResponse<any>) => {
        console.log('roles', response.body);
        this.dataSource.data = response.body;
        this.isLoading = false;
        this.noRoles = response.body.length === 0; // Mostrar mensaje si no hay roles
        this.cdr.detectChanges(); // Marcar para detección de cambios
      },
      (error) => {
        console.error('Error al cargar roles:', error);
        this.isLoading = false;
        this.noRoles = true; // Mostrar mensaje en caso de error
        this.cdr.detectChanges(); // Marcar para detección de cambios
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Role): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openNewRoleModal(){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '100%',
      data: {}
    });

    dialogRef.afterClosed().subscribe({
      next: (newRole: Role) => {
        if (newRole) {
          newRole.client = this.client;
          newRole.company = this.company;
          console.log('newRole', newRole);
          this.roleService.createRole(newRole).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Rol creado exitosamente.', type: 'success' }
                });
                this.dataSource.data = this.dataSource.data.filter(role => role.id !== newRole.id);
                this.dataSource.data.push(newRole);
                this.dataSource.data = this.dataSource.data;
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
        console.error('Error al abrir el modal de nuevo grupo:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  hasValue() {
    return this.selection.selected.length > 0;
  }

  openEdit(role: Role){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '100%',
      data: {role: role, id: role.id}
    });

    dialogRef.afterClosed().subscribe({
      next: (newRole: any) => {
        if (newRole.role) {
          console.log('newRole', newRole);

          this.roleService.updateRole(newRole.role, newRole.id).subscribe({
            next: (response) => {
              console.log('response', response);
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Rol actualizado exitosamente.', type: 'success' }
              });
              this.ngAfterViewInit();
            },
            error: (error) => {
              console.error('Error al actualizar el rol:', error);
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al actualizar el rol.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al abrir el modal de editar rol:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  openDelete(id: number){
    console.log('id', id);
  }
}