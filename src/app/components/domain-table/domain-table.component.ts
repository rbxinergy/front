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
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { subdomains } from 'src/app/shared/dummy-data/subdomains-domain.dummy';
import { Subdomain } from 'src/app/interfaces/subdomain.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-domain-table',
  templateUrl: './domain-table.component.html',
  styleUrls: ['./domain-table.component.scss'],
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
    MatFormFieldModule, MatSortModule, MatCheckboxModule
  ]
})

export class DomainTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource<Domain>();
  columnsToDisplay = ['select', 'name', 'description', 'code', 'tag'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,  'expand', 'actions'];
  expandedElement: SubDomain | null;
  domainID = null;
  domains: Domain[] = [];
  subdomains: SubDomain [] = [];
  selectedDomain: Domain | null = null;
  client = sessionStorage.getItem('client');
  selection = new SelectionModel<Domain>(true, []);
  selectedSubdomain: SubDomain | null = null;
  

  formDomainTable: FormGroup = new FormGroup({
    tempControl: new FormControl(null, Validators.required)
  });
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef,  private DomainService: DomainService, private SubdomainService: SubdomainService, private dialog: MatDialog) {
  }
  
  ngAfterViewInit(): void {
    this.DomainService.getDomains(this.client).subscribe((domains: Domain[]) => {
      this.domains = domains;
      this.dataSource.data = domains;
    });
    this.SubdomainService.getSubdomainsByDomain(sessionStorage.getItem('domain')).subscribe((data: SubDomain[]) => {
      if(data.length === 0){
        console.log('No hay subdominios');
        this.formDomainTable.controls['tempControl'].setValue('');
      }
      this.subdomains = data;
      this.cdr.detectChanges();
    });
  }
    
  anexaSub(){
    let i = 0
    let dominioss = this.domains
    let subdominios = this.subdomains
    const subs = []

    this.domains = dominioss

    dominioss.filter((d) => {
      subdominios.filter((s) => {
          if (d.id === s.idDomain) {
            d['subdomains']= subdominios
          }
      })
    })

    console.log(subdominios)
    console.log(dominioss)
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
  // openSubdomainModal(id: string) {
 
  //   const dialogRef = this.dialog.open(SubdomainComponent, {
  //     width: '800px',
  //     height: '100%',
  //     data: {id, addSubdomains: true} 
  //   });
  //   dialogRef.afterClosed().subscribe({

  //     next: (newSubdomain: SubDomain) => {
  //       if (newSubdomain) {
  //         this.SubdomainService.createSubdomain(newSubdomain).subscribe({
  //           next: (response) => {
  //             if (response.status === 200) {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '400px',
  //                 data: { message: 'Subdominio creado exitosamente.', type: 'success' }
  //               });
  //               let news = Object.values(newSubdomain);
  //               console.log(newSubdomain)
  //               // let i = 0
  //               // for (let subdomain of newSubdomain) {
  //               //   i++
  //               //   const maxId =  Math.max(...this.subdomains.map(subdomain => parseInt(subdomain.id)));
  //               //   subdomain.id = (maxId + 1).toString();
  //               //   subdomain.idDomain = id
  //               //   this.subdomains.push(subdomain);
  //               // }
  //               for(let i=0; i< news.length; i++){
  //                 const maxId =  Math.max(...this.subdomains.map(subdomain => parseInt(subdomain.id)));
  //                 newSubdomain[i].id = (maxId + 1).toString();
  //                 newSubdomain[i].idDomain = id
  //                 this.subdomains.push(news[i]);
  //               } 
  //               console.log('SUBDOMAINS TABLA' ,this.subdomains)
  //               // this.formDomainTable.controls['tempControl'].setValue(newSubdomain.name);
  //             } else {
  //               this.dialog.open(MessagesModalComponent, {
  //                 width: '400px',
  //                 data: { message: 'Error al crear el subdominio.', type: 'error' }
  //               });
  //             }
  //           },
  //           error: (error) => {
  //             this.dialog.open(MessagesModalComponent, {
  //               width: '400px',
  //               data: { message: 'Todos los subdominios se han creado exitosamente.', type: 'success' }
  //             })
  //           } 
  //         } )
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al abrir el modal de nuevo subdominio:', error);
  //       this.dialog.open(MessagesModalComponent, {
  //         width: '400px',
  //         data: { message: 'Error al cerrar el diálogo.', type: 'error' }
  //       });
  //     }
  //   });
  // }

  openSubdomainModal(idDomain: string) {
    const dialogRef = this.dialog.open(SubdomainComponent, {
      width: '800px',
      height: '100%',
      data: { idDomain,  addSubdomains: true }
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
    const maxId = this.domains.length > 0 ? Math.max(...this.domains.map(domain => parseInt(domain.id))) : 0;
  
    const dialogRef = this.dialog.open(DomainComponent, {
      width: '600px',
      data:  {}
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
    domain.active = true
    this.selectedDomain = { ...domain }
    
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


  openDelete(domain: Domain) {
    // Implementación para abrir el diálogo de eliminación
    console.log(domain.id)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar el dominio ${domain.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
   
      next: (result) => {
       
        if (result) {
          this.DomainService.deleteDomain(domain.id).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Subdominio eliminado exitosamente.', type: 'success' }
                });
                this.subdomains = this.subdomains.filter(c => c.id !== domain.id);
                if(this.subdomains.length === 0){
                  this.formDomainTable.controls['tempControl'].setValue(null);
                }
                this.dataSource.data = this.domains;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar el dominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar el dominio.', type: 'error' }
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
  // Implementación para abrir el diálogo de edición subdominio
  editSubdomain(subdomain: SubDomain) {
    this.selectedSubdomain = { ...subdomain };
    const dialogRef = this.dialog.open(SubdomainComponent, {
      width: '600px',
      data: {data: this.selectedSubdomain, updateSubdomain: true }
    });

    dialogRef.afterClosed().subscribe({
      next: (updatedSubdomain: SubDomain) => {
        if (updatedSubdomain) {
          this.SubdomainService.updateSubdomain(updatedSubdomain).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Subdominio actualizado exitosamente. ', type: 'success' }
                });
                const index = this.subdomains.findIndex(c => c.id === updatedSubdomain.id);
                if (index !== -1) {
                  this.subdomains[index] = updatedSubdomain;
                  console.log('mensaje desde el guardar subdominio', this.subdomains[index] = updatedSubdomain)
                    this.subdomains;
                }
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al actualizar el Subdominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al actualizar el Subdominio.', type: 'error' }
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


  deleteSubdomain(subdomain: SubDomain) {
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Está seguro de que deseas eliminar el subdominio ${subdomain.name}?`,
        type: 'error'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.SubdomainService.deleteSubdomain(subdomain.id).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Subdominio eliminado exitosamente.', type: 'success' }
                });
                this.subdomains = this.subdomains.filter(c => c.id !== subdomain.id);
                if(this.subdomains.length === 0){
                  this.formDomainTable.controls['tempControl'].setValue(null);
                }
                // this.dataSource.data = this.subdomains;
              } else {
                this.dialog.open(MessagesModalComponent, {
                  width: '500px',
                  data: { message: 'Error al eliminar el subdominio.', type: 'error' }
                });
              }
            },
            error: (error) => {
              this.dialog.open(MessagesModalComponent, {
                width: '500px',
                data: { message: 'Error al eliminar el subdominio.', type: 'error' }
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

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  hasValue() {
    return this.selection.hasValue();
  }

  checkboxLabel(row?: Domain) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addDomainsToCompany() {
    const selectedDomains = this.selection.selected;
    const createDomainObservables = selectedDomains.map(domain => this.DomainService.createDomain(domain));
  
    Promise.all(createDomainObservables.map(obs => obs.toPromise()))
      .then(responses => {
        const allSuccess = responses.every(response => response && response.status === 200);
        if (allSuccess) {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Todos los dominios se han añadido exitosamente.', type: 'success' }
          });
        } else {
          this.dialog.open(MessagesModalComponent, {
            width: '400px',
            data: { message: 'Error al añadir algunos dominios.', type: 'error' }
          });
        }
      })
      .catch(error => {
        console.error('Error al añadir dominios:', error);
        this.dialog.open(MessagesModalComponent, {
          width: '400px',
          data: { message: 'Error al añadir los dominios.', type: 'error' }
        });
      });
  }
}