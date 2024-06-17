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
import { Role } from '../../intefaces/role.interface';
import { RoleService } from 'src/app/services/role.service';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private roleService: RoleService, private cdr: ChangeDetectorRef,
      private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.roleService.getRoles('client','company').subscribe((roles: Role[]) => {
      this.roles = roles;
      this.dataSource.data = this.roles;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
        const sortState: Sort = {active: 'id', direction: 'desc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.dataSource.sort = this.sort;
      this.sort.direction = 'desc'; // Establece el orden inicial como descendente
      this.sort.active = 'id'; // Establece 'ID' como la columna activa para ordenar
      this.cdr.detectChanges(); // Forzar la detección de cambios
      
    });
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

  openRoleModal() {
    const maxId = this.roles.length > 0 ? Math.max(...this.roles.map(role => role.id)) : 0;
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '600px',
      data: {} // Puedes pasar datos al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe((newRole: Role) => {
      if (newRole) {
        // Manejar los datos del formulario devueltos por RoleComponent
        const maxId = this.roles.length + 1
        console.log(newRole, maxId);
        newRole.id = maxId;
        this.roles.push(newRole); // Agregar la nueva empresa al arreglo
        this.dataSource.data = this.roles; // Actualizar el dataSource de la tabla
      }
    });
  }
  
  openEditRoleModal(role: Role) {
    this.selectedRole = { ...role } as Role; // Clonar el elemento seleccionado
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '600px',
      data: this.selectedRole // Pasar el elemento seleccionado al modal
    });

    dialogRef.afterClosed().subscribe((updatedRole: Role) => {
      if (updatedRole) {

        const index = this.roles.findIndex(c => c.id === updatedRole.id);
        if (index !== -1) {
          this.roles[index] = updatedRole; // Actualizar el elemento en el arreglo
          this.dataSource.data = this.roles; // Actualizar el dataSource de la tabla
        }
      }
    });
  }
  
  openDialog(id: string) {
    // Implementación para abrir el diálogo de edición
  }

  openDelete(id: string) {
    // Implementación para abrir el diálogo de eliminación
  }
}
