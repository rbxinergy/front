import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { GetservicesService } from '../services/getservices.service';
import { Services } from '../interfaces/services.interface';
import { Evaluation } from '../interfaces/evaluation.interface';
import { QuestService } from '../services/quest.service';
import { Quest } from '../interfaces/quest.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { UpdateEvaluationComponent } from '../update-evaluation/update-evaluation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-new-evaluation',
  templateUrl: './new-evaluation.component.html',
  styleUrls: ['./new-evaluation.component.scss'],
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
    MatProgressSpinnerModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class NewEvaluationComponent implements AfterViewInit {

  currentCompany!: any;
  profile: any = {};
  startDate: string = '';
  endDate: string = '';
  services: Services[] = [];
  evaluations: Evaluation[] = [];
  questionnaires: any[] = [];
  dataEmpty: boolean = false;
  
  questDataSource = new MatTableDataSource<Quest>();
  questTableColumns: string[] = [
    'questId',
    'questName',
    'subDomainName',
    'companyName',
    'clientName',
    'select'
  ];
  showSpinner: boolean = true;
  createForm = new FormGroup({});
  selection = new SelectionModel<Quest>(true, []);

  types=[
    {id:1, name: 'Servicio'},
    {id:2, name: 'Proveedor'},
    {id:3, name: 'Licitación'}
  ]

  visibility = [
    {value: false, text: 'provider'},
    {value: true, text: 'group'},
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private evaluationService: EvaluationService, private getServicesService: GetservicesService,
      private questService: QuestService, private router: Router,
      private route: ActivatedRoute, public dialog: MatDialog
    ){
    this.createForm.addControl('name', new FormControl('', Validators.required));
    this.createForm.addControl('type', new FormControl('',Validators.required));
    this.createForm.addControl('companyId', new FormControl(''));
    this.createForm.addControl('quests', new FormControl(''));
    this.profile = JSON.parse(sessionStorage.getItem('profile') || '');
    this.currentCompany = {id: 27} // JSON.parse(sessionStorage.getItem('company') || '');


  }

  ngAfterViewInit(): void {
    this.getQuests();
  }

  getQuests() {
    this.questService.getQuestionnaires(this.currentCompany.id).subscribe((data: Quest[]) => {
      console.log("ANY: ", data);
      this.questionnaires = data;
      this.questDataSource.data = data;
      this.questDataSource.paginator = this.paginator;
      console.log("Cuestionarios:", this.questionnaires);
    });
  }

  saveEvaluation() {
    let data: any = this.createForm.getRawValue();
    data.companyId = this.currentCompany.id;
    data.quests = this.selection.selected;
    console.log(data);
    this.evaluationService.createEvaluation(data).subscribe((data) => {
      console.log(data);
      this.createForm.reset();
      this.showDialog('500ms', '500ms', 'Evaluación creada correctamente.', 'success');
      this.router.navigate(['home/evaluation']);
    }, (error) => {
      this.showDialog('500ms', '500ms', 'No se pudo crear la evaluación. Por favor intente en unos momentos.', 'error');
      console.log(error);
    })
  }

  showDialog(enterAnimationDuration: string, exitAnimationDuration: string, message: string, type: string): void {
    this.dialog.open(MessagesModalComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message,
        type
      }
    });
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
    console.log(!this.createForm.valid && this.selection.isEmpty());
  }

  goBack() {
    this.router.navigate(['home/evaluation']);
  }

}
