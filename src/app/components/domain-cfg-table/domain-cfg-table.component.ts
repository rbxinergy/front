import { Component } from '@angular/core';
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
import { DomainService } from 'src/app/services/domain.service';
import { Domain } from 'src/app/interfaces/domain.interface';

@Component({
  selector: 'app-domain-cfg-table',
  templateUrl: './domain-cfg-table.component.html',
  styleUrls: ['./domain-cfg-table.component.css'],
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
export class DomainCfgTableComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'category', 'code'];
  dataSource = new MatTableDataSource<Domain>();
  selection = new SelectionModel<Domain>(true, []);

  constructor(private domainService: DomainService) {
    this.domainService.getDomains().subscribe((domains: Domain[]) => {
      this.dataSource.data = domains;
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

  checkboxLabel(row?: Domain): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addDomainsToCompany() {
    console.log(this.selection.selected);
  }
}
