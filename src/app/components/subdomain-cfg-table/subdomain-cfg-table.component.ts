import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/interfaces/user';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { SubDomain } from 'src/app/interfaces/domain.interface';
import { SubdomainService } from 'src/app/services/subdomain.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-subdomain-cfg-table',
  templateUrl: 'subdomain-cfg-table.component.html',
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
    MatProgressSpinnerModule
  ]
})
export class SubdomainCfgTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'idDomain'];
  dataSource = new MatTableDataSource<SubDomain>();
  selection = new SelectionModel<SubDomain>(true, []);
isLoading: boolean = false;

  constructor(private subdomainService: SubdomainService) {
    this.subdomainService.getSubdomains().subscribe((subdomains: SubDomain[]) => {
      this.dataSource.data = subdomains;
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
  checkboxLabel(row?: SubDomain): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  addSubdomainsToCompany() {
    this.isLoading = true;
    setTimeout(() => {
      this.selection.selected.forEach((subdomain, index) => {
        this.subdomainService.createSubdomain(subdomain).subscribe((subdomain:any) => {
          this.isLoading = false;
          console.log(subdomain, index);
        }, (error) => {
          this.isLoading = false;
          console.error(error);
        }, () => {
          this.isLoading = false;
        });
      });
    }, 2000);
    
  }
}
