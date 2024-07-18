import { Component } from '@angular/core';
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
    MatInputModule
  ]
})
export class RoleCfgTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'isCreate', 'isRead', 'isUpdate', 'isDelete'];
  dataSource = new MatTableDataSource<Role>();
  selection = new SelectionModel<Role>(true, []);
  client: string = sessionStorage.getItem('client') || '';
  searchInput: any;

  constructor(private roleService: RoleService, public dialog: MatDialog) {
    this.roleService.getRoles(this.client).subscribe((roles: any) => {
      console.log(roles.body);
      this.dataSource.data = roles.body as Role[];
    });
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

  addRolesToCompany() {
    console.log(this.selection.selected);

    // Crear un array de promesas para todas las solicitudes
    const requests = this.selection.selected.map(role => 
      this.roleService.addRolesToCompany(role).toPromise()
    );

    // Esperar a que todas las solicitudes se completen
    Promise.all(requests)
      .then((responses) => {
        // Verificar que todas las respuestas sean exitosas
        if (responses.every(res => res.status === 200)) {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Roles agregados correctamente.', type: 'success' }
          });
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Hubo un problema al agregar algunos roles.', type: 'error' }
          });
        }
      })
      .catch((error) => {
        console.error('Error al agregar roles:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Hubo un problema al agregar los roles.', type: 'error' }
        });
      });
  }

}