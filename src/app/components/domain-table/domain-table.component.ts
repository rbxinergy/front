import { CommonModule, NgFor, NgIf } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { Domain, SubDomain } from '../../interfaces/domain.interface';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomainComponent } from '../domain/domain.component';
import { SubdomainComponent } from '../subdomain/subdomain.component';
import { DomainService } from 'src/app/services/domain.service';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubdomainService } from 'src/app/services/subdomain.service';

@Component({
  selector: 'app-domain-table',
  templateUrl: './domain-table.component.html',
  styleUrls: ['./domain-table.component.css'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    MatTableModule, NgFor, NgIf, CommonModule, TranslateModule, MatMenuModule,
    MatIconModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatSelectModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule,
    MatFormFieldModule, MatSortModule
  ]
})
export class DomainTableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Domain>();
  columnsToDisplay = ['name', 'description', 'code', 'tag'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,  'expand', 'actions'];
  expandedElement: Domain | null;
  domainID = null;
  domains: Domain[] = [];
  subdomains: SubDomain [] = [];
  selectedDomain: Domain | null = null;
  client = sessionStorage.getItem('client');

  formDomainTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef,  private DomainService: DomainService, private SubdomainService: SubdomainService, private dialog: MatDialog) {}
  
  ngAfterViewInit(): void {
    this.DomainService.getDomains(this.client).subscribe((domains: Domain[]) => {
      this.domains = domains;
      this.dataSource.data = domains;
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

  openSubdomainModal(idDomain: string) {
    const dialogRef = this.dialog.open(SubdomainComponent, {
      width: '800px',
      height: '100%',
      data: { idDomain }
    });
    dialogRef.afterClosed().subscribe({
      next: async (newSubdomains: SubDomain[]) => {
        console.log('newSubdomain', newSubdomains);
        if (newSubdomains) {
          try {
            const results = await Promise.all(newSubdomains.map(newSubdomain => 
              this.SubdomainService.createSubdomain(newSubdomain).toPromise()
            ));
            const allSuccess = results.every(response => response && response.status === 200);
            if (allSuccess) {
              this.SubdomainService.getSubdomains().subscribe((subdomains: SubDomain[]) => {
                this.subdomains = subdomains;
              });
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Todos los subdominios se han creado exitosamente.', type: 'success' }
              });
            } else {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear algunos subdominios.', type: 'error' }
              });
            }
          } catch (error) {
            this.dialog.open(MessagesModalComponent, {
              width: '400px',
              data: { message: 'Error al crear los subdominios.', type: 'error' }
            });
          }
        }
      },
      error: (error) => {
        console.error('Error al abrir el modal de nuevo subdominio:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }

  openNewDomainModal(){
    const dialogRef = this.dialog.open(DomainComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe({
      next: (newDomain: Domain) => {
        if (newDomain) {
          this.DomainService.createDomain(newDomain).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Dominio creado exitosamente.', type: 'success' }
                });
                this.domains.push(newDomain);
                this.dataSource.data = this.domains;
                this.formDomainTable.controls['tempControl'].setValue(newDomain.name);
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '400px',
                  data: { message: 'Error al crear el dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '400px',
                data: { message: 'Error al crear el dominio.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al abrir el modal de nueva dominio:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });

  }
  
  // Implementación para abrir el diálogo de edición
  openUpdate(domain: Domain) {
    this.selectedDomain = { ...domain };
    const dialogRef = this.dialog.open(DomainComponent, {
      width: '600px',
      data: this.selectedDomain
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedDomain: Domain) => {
        if (updatedDomain) {
          this.DomainService.updateDomain(updatedDomain).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Dominio actualizado exitosamente.', type: 'success' }
                });
                const index = this.domains.findIndex(c => c.id === updatedDomain.id);
                if (index !== -1) {
                  this.domains[index] = updatedDomain;
                  this.dataSource.data = this.domains;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar el dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar el dominio.', type: 'error' }
              });
            }
          });
        }
      },
      error: (error) => {
        this.dialog.open(MessagesModalComponent, {
          width: '500px',
          data: { message: 'Error al cerrar el diálogo.', type: 'error' }
        });
      }
    });
  }


  openDelete(id: string) {
    // Implementación para abrir el diálogo de eliminación
  }
}