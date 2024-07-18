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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';

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
    CommonModule
  ]
})
export class UsersTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'job_title'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  client: string = sessionStorage.getItem('client') || '';
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
   
}