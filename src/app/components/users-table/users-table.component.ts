import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../interfaces/user.interface';
import { Role } from '../../interfaces/role.interface';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { UserComponent } from '../user/user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
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
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements OnInit {
  displayedColumns = ['name', 'email', 'jobTitle'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  users: User[] = [];
  roles: Role[] = [];
  expandedElement: User | null = null;
  client: string = sessionStorage.getItem('client') || '';
  @Input() companyId: string = '';
  searchInput: any;
  userRoles: { [key: string]: any[] } = {};

  constructor(private userService: UserService, private roleService: RoleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getAllUsersByClientAndCompany(this.client, this.companyId).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.users = response.body as User[];
          this.dataSource.data = this.users;
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Hubo un problema al obtener los usuarios.', type: 'error' }
          });
        }
      }
    );
  }

  loadRoles(): void {
    this.roleService.getAllRolesByCompany(this.companyId).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.roles = response.body as Role[];
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Hubo un problema al obtener los roles.', type: 'error' }
          });
        }
      }
    );
  }

  getRoleName(roleId: string): string {
    const role = this.roles.find(role => role.id === roleId);
    return role ? role.name : '';
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

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openNewUserModal() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '600px',
      data: { companyId: this.companyId }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          delete result.confirmPassword; // Eliminar la propiedad confirmPassword
          result.company = this.companyId;
          console.log(result);
          this.userService.createUser(result).subscribe({
            next: (response) => {
              console.log('Usuario creado exitosamente:', response);
              this.loadUsers(); // Recargar la lista de usuarios
            },
            error: (error) => {
              console.error('Error al crear el usuario:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
      }
    });
  }

  toggleRole(user: User, selectedRoles: string[]) {
    user.idRole = selectedRoles;
    console.log(user, selectedRoles);
    this.userService.updateUser(user.id, user).subscribe({
      next: (response) => {
        console.log('Roles actualizados exitosamente:', response);
      },
      error: (error) => {
        console.error('Error al actualizar los roles del usuario:', error);
      }
    });
    // const index = user.idRole.indexOf(roleId);
    // if (index === -1) {
    //   user.idRole.push(roleId);
    // } else {
    //   user.idRole.splice(index, 1);
    // }

    // Aquí puedes llamar a un servicio para actualizar los roles del usuario
    // this.userService.updateUser(user.id, user).subscribe({
    //   next: (response) => {
    //     console.log('Roles actualizados exitosamente:', response);
    //   },
    //   error: (error) => {
    //     console.error('Error al actualizar los roles del usuario:', error);
    //   }
    // });
  }
}