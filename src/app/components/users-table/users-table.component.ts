import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;





  constructor(private userService: UserService,  private cdr: ChangeDetectorRef,
    private dialog: MatDialog, private userDataService: UserDataService) {
    // this.userService.getUsers(this.users, 'user').subscribe((users: User[]) => {
    //   this.dataSource.data = users;
    // });
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
    // for (const user of this.selection.selected) {
    //   this.userService.createUser(user).subscribe((res: any) => {
    //     console.log(res);
    //   });
    // }
  }


    // REVISAR
  // openNewCompanyModal() {
  //   const maxId = this.companies.length > 0 ? Math.max(...this.companies.map(company => parseInt(company.id))) : 0;
  //   const dialogRef = this.dialog.open(CompanyComponent, {
  //     width: '600px',
  //     data: {}
  //   });
  
  //   dialogRef.afterClosed().subscribe({
  //     next: (newCompany: Company) => {
  //       if (newCompany) {
  //         this.companyService.createCompany(newCompany).subscribe({
  //           next: (response) => {
  //             if (response.status === 200) {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '400px',
  //                 data: { message: 'Compañía creada exitosamente.', type: 'success' }
  //               });
  //               newCompany.id = (maxId + 1).toString();
  //               this.companies.push(response.body);
  //               this.dataSource.data = this.companies;
  //               this.formCompanyTable.controls['tempControl'].setValue(response.body.name);
  //             } else {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '400px',
  //                 data: { message: 'Error al crear la compañía.', type: 'error' }
  //               });
  //             }
  //           },
  //           error: (error) => {
  //             this.dialog.open(MessagesModalComponent, {
  //               width: '400px',
  //               data: { message: 'Error al crear la compañía.', type: 'error' }
  //             });
  //           }
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al abrir el modal de nueva empresa:', error);
  //       this.dialog.open(MessagesModalComponent, {
  //         width: '400px',
  //         data: { message: 'Error al cerrar el diálogo.', type: 'error' }
  //       });
  //     }
  //   });
  // }
  
  // openEditCompanyModal(company: Company) {
  //   console.log(company)
  //   this.selectedCompany = { ...company };
  //   const dialogRef = this.dialog.open(CompanyComponent, {
  //     width: '600px',
  //     data: this.selectedCompany
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (updatedCompany: Company) => {
  //       if (updatedCompany) {
  //         this.companyService.updateCompany(updatedCompany).subscribe({
  //           next: (response) => {
  //             if (response.status === 200) {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '500px',
  //                 data: { message: 'Empresa actualizada exitosamente.', type: 'success' }
  //               });
  //               const index = this.companies.findIndex(c => c.id === updatedCompany.id);
  //               if (index !== -1) {
  //                 this.companies[index] = response.body;
  //                 this.dataSource.data = this.companies;
  //               }
  //             } else {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '500px',
  //                 data: { message: 'Error al actualizar la empresa.', type: 'error' }
  //               });
  //             }
  //           },
  //           error: (error) => {
  //             this.dialog.open(MessagesModalComponent, {
  //               width: '500px',
  //               data: { message: 'Error al actualizar la empresa.', type: 'error' }
  //             });
  //           }
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       this.dialog.open(MessagesModalComponent, {
  //         width: '500px',
  //         data: { message: 'Error al cerrar el diálogo.', type: 'error' }
  //       });
  //     }
  //   });
  // }

  // openDeleteCompanyModal(company: Company) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     width: '400px',
  //     data: {
  //       title: 'Confirmar eliminación',
  //       message: `¿Está seguro de que deseas eliminar la compañía ${company.name}?`,
  //       type: 'error'
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (result) => {
  //       if (result) {
  //         this.companyService.deleteCompany(company.id).subscribe({
  //           next: (response) => {
  //             console.log('response', response.body);
  //             if (response.status === 200) {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '500px',
  //                 data: { message: 'Compañía eliminada exitosamente.', type: 'success' }
  //               });
  //               console.log('company', company);
  //               this.companies = this.companies.filter(c => c.id !== company.id);
  //               if(this.companies.length === 0){
  //                 this.formCompanyTable.controls['tempControl'].setValue(null);
  //               }
  //               this.dataSource.data = this.companies;
  //             } else {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '500px',
  //                 data: { message: 'Error al eliminar la compañía.', type: 'error' }
  //               });
  //             }
  //           },
  //           error: (error) => {
  //             this.dialog.open(MessagesModalComponent, {
  //               width: '500px',
  //               data: { message: 'Error al eliminar la compañía.', type: 'error' }
  //             });
  //           }
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       this.dialog.open(MessagesModalComponent, {
  //         width: '500px',
  //         data: { message: 'Error al cerrar el diálogo.', type: 'error' }
  //       });
  //     }
  //   });
  // }
}
