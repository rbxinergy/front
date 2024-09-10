import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormGroupName, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Quest } from './interfaces/quest.interface';
import { CompanySubDomain, SubDomain } from './interfaces/subdomain.interface';
import { QuestService } from './services/quest.service';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SubdomainService } from './services/subdomain.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';
import { QuestionnaireQuestionsComponent } from './questionnaire-questions/questionnaire-questions.component';


@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaires.component.html',
  styleUrls: ['./questionaires.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatCheckboxModule, MatRadioModule, MatFormFieldModule, NgFor, MatDialogModule,
    MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatMenuModule,
    ReactiveFormsModule, MatDividerModule, MatButtonModule,
    CdkDrag, CdkDropList, CdkDragPlaceholder, MatCardModule, MatSelectModule,
    MatStepperModule, MatListModule, MatProgressSpinnerModule, MatTableModule, HttpClientModule, MatPaginatorModule],
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: {showError: true},
      },
    ],
})

export class QuestionairesComponent {

  subdomains: SubDomain[] = [];
  quests: Quest[] = [];
  quest!: Quest;
  questions: any[] = [];
  currentCompany!: any;
  animationDuration = "1000";
  questTableColumns: string[] = [
    'questName',
    'subDomainName',
    'documentNumber',
    'companyName',
    'status',
    'createdAt',
    'visibility',
    'actions'
  ];

  formOptions!: FormGroup;
  lista: any[] = [];

  answerForm: FormGroup = this.fb.group({
    answerText: ['', Validators.required],
    // clave: ['', Validators.required],
    // valor: ['', Validators.required]
   
  });
  questConfigForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });


  showSpinner: boolean = true;
  dataEmpty: boolean = false;
  dataSource = new MatTableDataSource<Quest>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private fb: FormBuilder, private questService: QuestService,
    private router: Router, private route: ActivatedRoute, private subDomainService: SubdomainService, public dialog: MatDialog) {
    console.log('Cuestionario constructor');
    this.currentCompany = {id: 27, groupDocument: '92926482-7'}; // JSON.parse(sessionStorage.getItem('company') || '')
    this.formOptions = new FormGroup({
      clave: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit() {
    this.getQuest();
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    this.dialog.open(NewQuestionnaireComponent, {
      width: '100%'
    });
  }
  goNewQuestionnaire() {
    this.router.navigate(['new-questionnaire'], {relativeTo: this.route});
  }

  getSubdomains(): void {
    this.subDomainService.getData(this.currentCompany.groupDocument).subscribe((data: CompanySubDomain) => {
      this.subdomains = data.subDomains;
      console.log("subdominios:", this.subdomains);
    });
  }
  getQuest(): void {
    this.questService.getQuestionnaires(this.currentCompany.id).subscribe((data: Quest[]) => {
      this.quests = data;
      this.dataSource.data = this.quests;
      console.log("Cuestionarios:", this.quests);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    console.log(this.questions);
  }

  saveQuestion(){
    const data = {
      options: this.lista
    }
    this.questService.createQuestion(data).subscribe((result) => {
      console.log(result);
    })
  }

  addQuestions(id:number){
    // const result: any[] = this.companies.filter((company:any) => company.id === id);
    this.dialog.open(QuestionnaireQuestionsComponent, { 
      data: id,
      width: '100%'
    }) 
    console.log(id)
  }
  async viewQuestion(id: number) {
    await this.router.navigate(['questions', id], {relativeTo: this.route});
  }

  updateDialog(id: number) { console.log(id)}

  delService(id: number) { console.log(id)}
}
