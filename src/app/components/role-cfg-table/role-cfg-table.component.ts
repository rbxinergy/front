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
    CommonModule
  ]
})
export class RoleCfgTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'isCreate', 'isRead', 'isUpdate', 'isDelete'];
  dataSource = new MatTableDataSource<Role>();
  selection = new SelectionModel<Role>(true, []);
  client: string = sessionStorage.getItem('client') || '';

  constructor(private roleService: RoleService) {
    this.roleService.getRoles(this.client).subscribe((roles: any) => {
      console.log(roles.body);
      this.dataSource.data = roles.body as Role[];
    });
  }
  // ngOnInit(): void {
  //   this.userService.getUsers('client', 'company').subscribe((users: User[]) => {
  //     this.dataSource.data = users;
  //   });
  // }
  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, limpia la selección. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** La etiqueta de la casilla de verificación en la fila pasada. */
  checkboxLabel(row?: Role): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  addRolesToCompany() {
    console.log(this.selection.selected);
    for (const role of this.selection.selected) {
      this.roleService.createRole(role).subscribe((res: any) => {
        console.log(res);
      });
    }
  }
}
