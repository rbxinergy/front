import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Question } from '../interfaces/quest.interface';
import { QuestService } from '../services/quest.service';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-questionnaire-questions',
  templateUrl: './questionnaire-questions.component.html',
  styleUrls: ['./questionnaire-questions.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule, 
    MatFormFieldModule, 
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class QuestionnaireQuestionsComponent {

  currentCompany: any;
  questions : Question[] = []
  questionDataSource = new MatTableDataSource<Question>();
  displayedColumns: string[] = ['id', 'text', 'select'];
  selection = new SelectionModel<Question>(true, []);
  createForm = new FormGroup({});
  QuestQuestionForm = new FormGroup({})
  criticality =[
    {id: 0, name: 'Baja'},
    {id: 1, name: 'Media'},
    {id: 0, name: 'Alta'}
  ]

  constructor(private questService: QuestService, public dialog: MatDialog) {
    this.currentCompany = {id: 27} // JSON.parse(sessionStorage.getItem('company') || '')
    this.getQuestions()
  }

  getQuestions(): void {
    this.questService.getQuestionsByCompanyId(this.currentCompany.id).subscribe((data: any) => {
      this.questions = data.questions;
      this.questionDataSource.data = this.questions;
      console.log("Preguntas:", this.questions);
    });
  }


  
  showDialog(enterAnimationDuration: string, exitAnimationDuration: string, message: string, type: string): void {
    const dialogRef = this.dialog.open(MessagesModalComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message,
        type
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.questionDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.questionDataSource.data.forEach(row => this.selection.select(row));
  }

  changeSelection(event: MatCheckboxChange, row: any) {
    event ? this.selection.toggle(row) : null
    console.log(!this.createForm.valid && this.selection.isEmpty());
  }

  saveQuestQuestion(){
    console.log("guardando quest question")
    let data: any = this.createForm.getRawValue();
    data.companyId = this.currentCompany.id;
    data.quests = this.selection.selected;
    console.log(data);
    // this.questService.createQuestQuestion(data).subscribe((data) => {
    //   console.log(data);
    //   this.createForm.reset();
    //   this.showDialog('500ms', '500ms', 'Cuestionario creado correctamente.', 'success');
    //   // this.router.navigate(['home/evaluation']);
    // }, (error) => {
    //   this.showDialog('500ms', '500ms', 'No se pudo crear el cuestionario. Por favor intente en unos momentos.', 'error');
    //   console.log(error);
    // })
  }
}
function getQuestions() {
  throw new Error('Function not implemented.');
}

