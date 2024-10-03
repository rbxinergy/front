import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestService } from '../services/quest.service';
import { Label, Quest, Question } from '../interfaces/quest.interface';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule,
  Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipEditedEvent, MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { LabelsService } from '../services/labels.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { SubDomain } from '../interfaces/subdomain.interface';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { MessagesModalComponent } from 'src/app/components/messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomPaginatorIntl } from '../../shared/custom-paginator-intl';


@Component({
    selector: 'app-questions',
    standalone: true,
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
    imports: [CommonModule, MatCardModule, MatCheckboxModule,
        MatRadioModule, MatInputModule, MatFormFieldModule, FormsModule,
        ReactiveFormsModule, MatDividerModule, MatSelectModule,
        MatButtonModule, MatChipsModule, MatIconModule, MatListModule]
})
export class QuestionsComponent { // implements AfterViewInit
  questionnaireId!: number;
  quest!: Quest;
  // questions: Question[] = [];
  // dataEmpty: boolean = false;
  // showSpinner: boolean = true;
  // selection = new SelectionModel<Question>(true, []);

  formOptions!: FormGroup;
  lista: any[] = [];
  currentCompany! : any;
  subdomains : SubDomain[] = []
  labels: Label[] = [];
  announcer = inject(LiveAnnouncer);

  questionForm!: FormGroup;
  controlType: string = '';
  answerForm!: FormGroup;
  
  controlOptions =  [
    {name: 'Selección única', type: 'radio'},
    {name: 'Selección múltiple', type: 'checkbox'},
    {name: 'Texto libre', type: 'text'}
  ]

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  // dataSource = new MatTableDataSource<Question>();
  // questionsTableColumns: string[] = [
  //   'id',
  //   'text',
  //   'type',
  //   'visibility',
  //   'labels',
  //   'group'
  // ];

  constructor(private route: ActivatedRoute, private questService: QuestService,
    private fb: FormBuilder, private labelsService: LabelsService,
    private dialog: MatDialog
  ) {
    this.questionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      visibility: new FormControl(false),
      labels: new FormControl('')
    });

    this.formOptions = new FormGroup({
      clave: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required)
    });

    this.answerForm = new FormGroup({
      answerText: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, this.scoreValidator])
    });

    this.currentCompany = {id: 27} // JSON.parse(sessionStorage.getItem('company') || '')
  }

  changeControlType(event: MatSelectChange) {
    this.controlType = event.value;
  }

  saveQuestion() {
    let data: any = {
      question: this.questionForm.getRawValue(),
    }

    if(this.controlType == 'radio' || this.controlType == 'checkbox') {
      data.options = this.lista
    } else  {
      this.lista = [];
      data.answer = this.answerForm.getRawValue();
    }
    data.question.labels = this.labels;
    data.companyId = this.currentCompany.id;
    this.questService.createQuestion(data).subscribe((result) => {
      const dialogRef = this.dialog.open(MessagesModalComponent, {
        width: '250px',
        data: {
          message: 'Pregunta creada correctamente',
          type: 'success',
          showCancel: false,
          showOk: false,
        }
      });
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const label: Label = {name: value};
      this.labels.push(label);
      this.labelsService.createLabel({labels: this.labels}).subscribe((data) => { })
    }
    event.chipInput!.clear();
  }

  remove(label: Label): void {
    const index = this.labels.indexOf(label);
    if (index >= 0) {
      this.labels.splice(index, 1);
      this.announcer.announce(`Removed ${label}`);
    }
  }

  edit(label: Label, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(label);
      return;
    }

    const index = this.labels.indexOf(label);
    if (index >= 0) {
      this.labels[index].name = value;
    }
  }

  agregarElemento() {
    const clave = this.formOptions.get('clave')?.value;
    const valor = this.formOptions.get('valor')?.value;
  
    this.lista.push({
      clave,
      valor,
    });
  
    this.formOptions.reset();
  }

  clearOptions() {
    this.lista = [];
    this.formOptions.reset();
  }

  validateForm(): boolean {
    return !this.questionForm.valid ||
      (this.controlType == 'text' ? !this.answerForm.valid : !(this.lista.length > 0)) ||
    !((this.labels.length > 0) && (this.labels.length <= 10) )
  }

  scoreValidator(control: AbstractControl): {[key:string]: any} | null {
      const value = control.value;
      if(isNaN(value) || value < 0 || value > 100 ) {
        return {'rangeError': true}
      }
      return null
  };


}