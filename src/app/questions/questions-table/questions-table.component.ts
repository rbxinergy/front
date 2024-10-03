import { SelectionModel } from '@angular/cdk/collections';
import { CdkDrag, CdkDropList, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Question } from '../interfaces/quest.interface';
import { QuestService } from '../services/quest.service';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatCheckboxModule,
    MatRadioModule, MatInputModule, MatFormFieldModule, FormsModule,
    ReactiveFormsModule, MatDividerModule,
    MatProgressSpinnerModule, CdkDrag, CdkDropList, CdkDragPlaceholder,
    MatButtonModule, MatSelectModule, MatChipsModule, MatIconModule,
    MatListModule, MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class QuestionsTableComponent implements AfterViewInit{
  @Output() questionsData = new EventEmitter<Question[]>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  dataSource = new MatTableDataSource<Question>();
  questionsTableColumns: string[] = [
    'id',
    'text',
    'type',
    'visibility',
    'labels',
    'group',
    'select'
  ];

  selection = new SelectionModel<Question>(true, []);
  currentCompany! : any;
  dataEmpty: boolean = false;
  showSpinner: boolean = true;
  questions: Question[] = [];

  constructor(private questService: QuestService) {
    this.currentCompany = {id: 27} // JSON.parse(sessionStorage.getItem('company') || '');
    this.selection.clear();
  }

  ngAfterViewInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questService.getQuestionsByCompanyId(this.currentCompany.id).subscribe((data: Question[]) => {
      if(!data) {
        this.dataEmpty = true;
        this.showSpinner = false;
        throw new Error("No hay preguntas en la librería.");
      } else {
        this.questions = data;
        this.dataSource = new MatTableDataSource(this.questions);
        this.dataSource.paginator = this.paginator;
        this.sort.sort({id: 'id', start: 'desc', disableClear: false} as MatSortable);
        const sortState: Sort = {active: 'id', direction: 'desc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.dataSource.sort = this.sort;
      }
    }, (error) => {
      this.dataEmpty = true;
      this.showSpinner = false;
    }, () => {
      this.showSpinner = false;
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

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.questionsData.emit(this.selection.selected);
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.questionsData.emit(this.selection.selected);
  }

  checkboxLabel(row?: Question): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  select(event: any, row: Question) {
    if(event) {
      this.selection.toggle(row);
      this.questionsData.emit(this.selection.selected);
    } else null
  }
}
