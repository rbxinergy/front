import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SubdomainService } from '../services/subdomain.service';
import { QuestService } from '../services/quest.service';
import { CompanySubDomain, SubDomain } from '../interfaces/subdomain.interface';
import { Answer, Quest, Question } from '../interfaces/quest.interface';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QuestionLibraryComponent } from '../question-library/question-library.component';
import { GetSubDomainService } from '../services/get-sub-domain.service';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule
  ]
})
export class NewQuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  subdomains: SubDomain[] = [];
  selectedSubDomainId: number = 0;
  selectedSubDomainName: string = '';
  questionsMap: { [key: string]: Question[] } = {};
  currentCompany: any;
  subdomainFromDialog: string = '';
  autoFillWeight: boolean = false;

  criticality = [
    { id: 0, name: "Criticidad baja" },
    { id: 1, name: "Criticidad media" },
    { id: 2, name: "Criticidad alta" },
  ];

  controlOptions = [
    { type: 'radio', name: 'Opción única' },
    { type: 'checkbox', name: 'Opción múltiple' },
    { type: 'text', name: 'Texto libre' }
  ];

  constructor(
    private fb: FormBuilder,
    private getSubDomains: GetSubDomainService,
    private questService: QuestService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.questionnaireForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      idSubDomain: ['', Validators.required],
      criticality: [0, Validators.required]
    });

    this.currentCompany = JSON.parse(sessionStorage.getItem('company') || '{}');
  }

  ngOnInit() {
    this.loadSubDomains();
  }

  loadSubDomains() {
    this.getSubDomains.getData(this.currentCompany.id).subscribe((data:any) => {
      this.subdomains = data;
      console.log("subdominios:", this.subdomains);
    });
  }

  onSubDomainChange(subDomainId: number) {
    this.selectedSubDomainId = subDomainId;
    this.selectedSubDomainName =  this.subdomains.find(subdomain => subdomain.idSubDomain === subDomainId)?.subDomain;  //this.getSelectedSubDomainName(subDomainId);
    this.cdRef.detectChanges();
    console.log("selectedSubDomainName:", this.selectedSubDomainName);
  }

  getSelectedSubDomainName(subDomainId: number): string {
    const selectedSubDomain = this.subdomains.find(subdomain => subdomain.idSubDomain === subDomainId);
    console.log("selectedSubDomain:", selectedSubDomain);
    return selectedSubDomain ? selectedSubDomain.subDomain : '';
  }

  addQuestion(subDomainId: number) {
    if (!this.questionsMap[subDomainId]) {
      this.questionsMap[subDomainId] = [];
    }

    this.questionsMap[subDomainId].push({
      text: '',
      percentage: 0,
      criticality: 0,
      visibility: false,
      hasFile: false,
      isRequired: false,
      isRequiredFile: false,
      type: 'text',
      answers: [],
      id: 0,
      version: 0,
      companyId: 0,
      questionId: 0,
      group: false,
      sortOrder: this.questionsMap[subDomainId].length + 1,
      labels: []
    });
  }

  openLibrary(subdomain: string){
    console.log("HOLA");
    const dialogRef = this.dialog.open(QuestionLibraryComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        message: subdomain,
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.questions) {
        const existingQuestions = this.questionsMap[subdomain] || [];
        const uniqueQuestions = result.questions.filter((question: Question) => !existingQuestions.some(existing => existing.id === question.id));
        this.questionsMap[subdomain] = existingQuestions.concat(uniqueQuestions);
        this.subdomainFromDialog = result?.subdomain || '';
        //this.cdRef.detectChanges(); // Detectar cambios en 'subdomainFromDialog'
        console.log("DIALOG RESULT:", result);
        this.dialog.closeAll();
      }
    });
  }

  updatePercentageSum() {
    // Implementar lógica para actualizar la suma de porcentajes
  }

  drop(event: CdkDragDrop<any[]>, subDomain: string) {
    moveItemInArray(this.questionsMap[subDomain], event.previousIndex, event.currentIndex);
    this.questionsMap[subDomain].forEach((question, index) => {
      question.sortOrder = index + 1;
    });
    this.cdRef.detectChanges();
  }

  createQuest() {
    // Asegurarse de que el subdominio seleccionado tenga preguntas
    if (!this.questionsMap[this.selectedSubDomainId] || this.questionsMap[this.selectedSubDomainId].length === 0) {
      console.error("No hay preguntas para el subdominio seleccionado.");
      return;
    }

    // Asegurarse de que el formulario sea válido
    if (!this.questionnaireForm.valid) {
      console.error("El formulario del cuestionario no es válido.");
      return;
    }

    // Crear el objeto de datos del cuestionario
    const data: Quest = {
      questions: this.questionsMap[this.selectedSubDomainId],
      companyId: this.currentCompany.id,
      ...this.questionnaireForm.getRawValue()
    };

    // Verificar que cada pregunta tenga los campos necesarios
    data.questions.forEach(question => {
      if (!question.text || question.percentage === undefined || question.criticality === undefined) {
        console.error("Una o más preguntas no tienen todos los campos necesarios.");
        return;
      }
    });

    console.log("Datos del cuestionario:", data);
    // Enviar el objeto `data` al backend
    // this.questService.createQuestionnaire(data).subscribe(
    //   (result) => {
    //     console.log("Resultado del backend:", result);
    //   },
    //   (error) => {
    //     console.error("Error al enviar los datos al backend:", error);
    //   }
    // );
  }

  addAnswer(question: Question) {
    console.log('RESPUESTAS:', question.answers, question.type)
    if(!question.answers){
      question.answers = [];
    }

    if (question.type === 'checkbox' || question.type === 'radio') {
    //   // Verificar si ya existe una respuesta tipo 'text' y reemplazarla
      const textAnswerIndex = question.answers.findIndex(answer => answer.text === 'text');
      if (textAnswerIndex !== -1) {
        question.answers.splice(textAnswerIndex, 1);
      }

      if (question.answers.length >= 5) {
        this.snackBar.open('No se pueden agregar más de 5 alternativas.', 'Cerrar', {
          duration: 3000,
        });
        return;
      } 
    }

    question.answers.push({ 
      id: 0, 
      questionId: question.id, 
      text: '', 
      score: 0, 
      version: 0, 
      status: true 
    } as Answer);
    this.cdRef.detectChanges();
    
  }

  removeQuestion(subDomainId: number, question: any): void {
    const index = this.questionsMap[subDomainId].indexOf(question);
    if (index >= 0) {
      this.questionsMap[subDomainId].splice(index, 1);
    }

    this.questionsMap[subDomainId].forEach((question, idx) => {
      question.sortOrder = idx + 1;
    });
    if (this.autoFillWeight) {
      this.autoFillWeights();
    }
    this.cdRef.detectChanges();
    console.log("QUESTION MAP:", this.questionsMap[this.selectedSubDomainId]);
  }

  getTotalWeight(): number {
    if (!this.questionsMap[this.selectedSubDomainId]) return 0;
    return this.questionsMap[this.selectedSubDomainId].reduce((sum, question) => sum + (question.percentage || 0), 0);
  }

  autoFillWeights() {
    if (this.autoFillWeight && this.questionsMap[this.selectedSubDomainId]) {
      const weight = 100 / this.questionsMap[this.selectedSubDomainId].length;
      this.questionsMap[this.selectedSubDomainId].forEach(question => question.percentage = weight);
    }
  }

  removeAnswer(question: Question, index: number) {
    question.answers.splice(index, 1);
    this.cdRef.detectChanges();
  }

  dropAlternative(event: CdkDragDrop<string[]>, question: Question) {
    moveItemInArray(question.answers, event.previousIndex, event.currentIndex);
    this.cdRef.detectChanges();
  }

  onQuestionTypeChange(event: any, question: any): void {
    question.type = event.value;
    if (question.type === 'text') {
      question.answers = [{
        id: 0,
        questionId: question.id,
        text: '',
        score: 0,
        version: 0,
        status: true
      } as Answer];
    } else if (question.type === 'checkbox' || question.type === 'radio') {
      question.answers = [];
    }

    console.log("QUESTION:", question);
    console.log("QUESTION MAP:", this.questionsMap[this.selectedSubDomainId]);
  }

  isValidated(): boolean {
  
    if (!this.questionnaireForm.valid) {
      return false;
    }
  
    if (this.selectedSubDomainId === 0) {
      return false;
    }
  
    const questions = this.questionsMap[this.selectedSubDomainId] || [];

    if (questions.length === 0) {
      return false;
    }
  
    for (const question of questions) {
      if (!question.answers) {
        question.answers = [];
      }
      if (!question.text || question.text.trim() === '') {
        return false;
      }
  
      if ((question.type === 'checkbox' || question.type === 'radio') && question.answers?.length === 0) {
        return false;
      }
  
      if (question.type === 'text' && question.answers.length !== 1) {
        return false;
      }

      if(question.percentage < 0 || question.percentage > 100){
        return false;
      }

      if(question.criticality < 0 || question.criticality > 2){
        return false;
      }
    }
  
    return true;
  }

}
