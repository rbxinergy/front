import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DomainCategoryService } from '../../services/domaincategory.service';
import { DomainCategory } from '../../interfaces/domaincategory.interface';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { DomaincategoryComponent } from '../domaincategory/domaincategory.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-domain-category-table',
  templateUrl: './domain-category-table.component.html',
  styleUrls: ['./domain-category-table.component.css'],
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
export class DomainCategoryTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<DomainCategory>();
  selection = new SelectionModel<DomainCategory>(true, []);

  constructor(private domainCategoryService: DomainCategoryService, private dialog: MatDialog) {
    this.domainCategoryService.getDomainCategories().subscribe((domainCategories: DomainCategory[]) => {
      this.dataSource.data = domainCategories;
      console.log(domainCategories)
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
  checkboxLabel(row?: DomainCategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  addDomainCategoriesToCompany() {
    console.log(this.selection.selected);
    const dialogRef = this.dialog.open(DomaincategoryComponent, {
      width: '600px',
      data:  {}
    });

    
  }
}
