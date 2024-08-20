import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleService } from '../../services/role.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Role } from 'src/app/interfaces/role.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
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
  displayedColumns = ['select', 'name', 'email', 'jobTitle'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: User | null;
  dataSource = new MatTableDataSource<User>();
  users: User[]= [];
  selectedUser: User | null = null;

  selection = new SelectionModel<User>(true, []);
  client: string = sessionStorage.getItem('client') || '';
  formUserTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @Input() companyId: string = '';
  searchInput: any;
  userRoles: { [key: string]: any[] } = {};

  constructor(private userService: UserService, public dialog: MatDialog, private roleService: RoleService) {

    this.userService.getAllUsersByClient(this.client).subscribe((users:any )=> {
      this.dataSource.data = users;
      console.log("users: ", users)
      this.selectUsersByCompany();
      // this.loadRolesForUsers();
    });
  }

  ngOnInit(): void {
  }

  // loadRolesForUsers(): void {
  //   this.dataSource.data.forEach(user => {
  //     this.loadRolesForUser(user.id);
  //   });
  // }

  // loadRolesForUser(userId: string): void {
  //   this.roleService.getUserRole(userId).subscribe(response => {
  //     this.userRoles[userId] = response.body;
  //     console.log("userRoles: ", this.userRoles)
  //   });
  // }

  selectUsersByCompany(): void {
    this.dataSource.data.forEach(user => {
      if (user.company === this.companyId) {
        this.selection.select(user);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';
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

  addUsersToCompany() {
    console.log(this.selection.selected);

    // Crear un array de promesas para todas las solicitudes
    const requests = this.selection.selected.map(user => 
      this.userService.addUsersToCompany(user).toPromise()
    );

    // Esperar a que todas las solicitudes se completen
    Promise.all(requests)
      .then((responses) => {
        // Verificar que todas las respuestas sean exitosas
        if (responses.every(res => res.status === 200)) {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Usuarios agregados correctamente.', type: 'success' }
          });
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Hubo un problema al agregar algunos usuarios.', type: 'error' }
          });
        }
      })
      .catch((error) => {
        console.error('Error al agregar usuarios:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Hubo un problema al agregar los usuarios.', type: 'error' }
        });
      });
  }

  hasValue() {
    return this.selection.selected.length > 0;
  }

  isExpansionDetailRow = (index: number, row: any) => row.hasOwnProperty('detailRow');

  addRolesToUser(roles: any[]) {
    console.log("roles: ", roles)
  }
}
