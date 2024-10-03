import { CommonModule, NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EvaluationService } from '../services/evaluation.service';
import { QuestService } from '../services/quest.service';
import { Quest } from '../interfaces/quest.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { Evaluation } from '../interfaces/evaluation.interface';

@Component({
  selector: 'app-upd-evaluation',
  templateUrl: './update-evaluation.component.html',
  styleUrls: ['./update-evaluation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class UpdateEvaluationComponent {

  currentCompany!: any;
  profile: any = {};
  startDate: string = '';
  endDate: string = '';
  evaluations: Evaluation[] = [];
  questionnaires: Quest[] = [];
  initialQuests: Quest[] = [];
  dataEmpty: boolean = false;
  questDataSource = new MatTableDataSource<Quest>();
  questTableColumns: string[] = [
    'id',
    'subDomainName',
    'companyName',
    'questName',
    'clientName',
    'select'
  ];
  showSpinner: boolean = true;
  createForm = new FormGroup({});
  selection = new SelectionModel<Quest>(true, []);

  types=[
    {id:1, name: 'Proveedor'},
    {id:2, name: 'Servicio'},
    {id:3, name: 'Licitación'}
  ]

  visibility = [
    {value: false, text: 'provider'},
    {value: true, text: 'group'},
  ]

  constructor(private evaluationService: EvaluationService, private questService: QuestService,
      private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: Evaluation
    ){
    this.createForm.addControl('name', new FormControl(data.evalname, Validators.required));
    this.createForm.addControl('type', new FormControl(data.type,Validators.required));
    this.createForm.addControl('companyId', new FormControl(data.companyid));
    this.createForm.addControl('visibility', new FormControl(data.visibility, Validators.required));
    this.profile = JSON.parse(sessionStorage.getItem('profile') || '');
    this.currentCompany = 27; // this.profile.permissions[0].companies[0].company; TODO: Forzado por compatibilidad con modelo anterior. Cambiar por el cliente seleccionado
 
    this.questService.getQuestionnaires(this.currentCompany)
    .pipe(
      concatMap(questionnaires => {
        this.questionnaires = questionnaires;
        this.questDataSource.data = this.questionnaires;
        return this.questService.getQuestionsByEvalId(data.evalid);
      })
    )
    .subscribe(questions => {
      const selectedQuestIds = questions.map(quest => quest.questId);
      this.initialQuests = this.questionnaires.filter(questionnaire => selectedQuestIds.includes(questionnaire.questId));
      this.selection.select(...this.questionnaires.filter(questionnaire => selectedQuestIds.includes(questionnaire.questId)));
    });
  }

  saveEvaluation() {
    let data: any = this.createForm.getRawValue();
    data.companyId = this.currentCompany; // TODO: Forzado por compatibilidad con modelo anterior. Cambiar por el cliente seleccionado
    data.newQuests = this.selection.selected;
    data.quest = this.initialQuests;
    data.evalId = this.data.evalid;
    this.evaluationService.updateEvaluation(data).subscribe((data) => {
      this.createForm.reset();
      this.showDialog('500ms', '500ms', 'Evaluación actualizada correctamente.', 'success');
    }, (error) => {
      this.showDialog('500ms', '500ms', 'No se pudo actualizar la evaluación. Por favor intente en unos momentos.', 'error');
    })
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
    const numRows = this.questDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.questDataSource.data.forEach(row => this.selection.select(row));
  }

  changeSelection(event: MatCheckboxChange, row: any) {
    event ? this.selection.toggle(row) : null
  }

  goBack() {
    this.router.navigate(['dashboard/evaluation']);
  }
}
