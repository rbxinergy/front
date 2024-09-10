import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Contact } from './interfaces/contact.interface';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from './messages-modal/messages-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './services/contact.service';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewContactComponent } from './new-contact/new-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    MatTableModule, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule, MatProgressSpinnerModule,
  ],
})
export class ContactComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name', 'lastName', 'surname', 'email', 'phone', 'cellphone', 'jobTitle', 'contactType', 'tag', 'active', 'acciones'
  ];
  dataSource = new MatTableDataSource<Contact>();


  formCompanyTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input() clientName: string;
  contact: Contact[] = [];
  isLoading = true;
  clientId: string = sessionStorage.getItem('client');

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef,
    private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.contactService.getContactByClient(this.clientId).subscribe({
      next: (res) => {
        console.log(res);
        this.contact = res.body;
        this.dataSource.data = this.contact;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      }
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

  openNewContactModal() {
    const dialogRef = this.dialog.open(NewContactComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe({
      next: (newContact: Contact) => {
        this.contactService.createContact(newContact).subscribe({
          next: (res) => {
            console.log(res);
            this.ngAfterViewInit();
            this.cdr.detectChanges();
            this.dialog.open(MessagesModalComponent, {
              width: '400px',
              data: { message: 'Contacto creado exitosamente.', type: 'success' }
            });
          },
          error: (err) => {
            console.log(err);
            this.dialog.open(MessagesModalComponent, {
              width: '400px',
              data: { message: 'Error al crear el contacto.', type: 'error' }
            });
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al crear el contacto.', type: 'error' }
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openBulkUpload() {
    this.router.navigate(['/dashboard/bulk-upload']);
  }

  openAddRolesModal(contact: Contact) {
    console.log(contact);
  }

  openEditCompanyModal(contact: Contact) {
    console.log(contact);
  }

  openDeleteCompanyModal(contact: Contact) {
    console.log(contact);
  }

}
