import { Component, Input } from '@angular/core';
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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserComponent } from '../user/user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
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
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class UsersTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'jobTitle'];
  dataSource = new MatTableDataSource<User>();
  users: User[]= [];
  selectedUser: User | null = null;

  selection = new SelectionModel<User>(true, []);
  client: string = sessionStorage.getItem('client') || '';
  formUserTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @Input() companyId: string = '';

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.getUsers(this.client).subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
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

  addUsersToRol() {
    const maxId = this.users.length > 0 ? Math.max(...this.users.map(user => parseInt(user.id))) : 0;
      const dialogRef = this.dialog.open(UserComponent, {
        width: '600px',
        data: {}
      });
    
      dialogRef.afterClosed().subscribe({
        next: (newUser: User) => {
          if (newUser) {
            this.userService.createUser(newUser).subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.dialog.open(MessagesModalComponent, {
                    width: '400px',
                    data: { message: 'Compañía creada exitosamente.', type: 'success' }
                  });
                  newUser.id = (maxId + 1).toString();
                  this.users.push(response.body);
                  this.dataSource.data = this.users;
                  this.formUserTable.controls['tempControl'].setValue(response.body.name);
                } else {
                  this.dialog.open(MessagesModalComponent, {
                    width: '400px',
                    data: { message: 'Error al crear la compañía.', type: 'error' }
                  });
                }
              },
              error: (error) => {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear la compañía.', type: 'error' }
                });
              }
            });
          }
        },
        error: (error) => {
          console.error('Error al abrir el modal de nueva empresa:', error);
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Error al cerrar el diálogo.', type: 'error' }
          });
        }
      });
  }
}