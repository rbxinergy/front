import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { QuestionsTableComponent } from "./questions-table/questions-table.component";
import { Question } from './interfaces/quest.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionsComponent } from './questions/questions.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-questions',
  templateUrl: './new-questions.component.html',
  styleUrls: ['./new-questions.component.scss'],
  standalone: true,
  imports: [QuestionsComponent, QuestionsTableComponent, MatDialogModule, MatButtonModule]
})
export class NewQuestionsComponent {
  questions: Question[] = [];
  dataEmpty: boolean = false;
  showSpinner: boolean = true;
  selection = new SelectionModel<Question>(true, []);
  dataSource = new MatTableDataSource<Question>();
  questionsTableColumns: string[] = [
    'id',
    'text',
    'type',
    'visibility',
    'labels',
    'group'
  ];

  onReceiveQuestions(event: Question[]) {
    console.log("Preguntas seleccionadas:", event);
    return this.questions = event
  }

  addQuestions(){
    console.log('aqui', this.questions)
  }
}
