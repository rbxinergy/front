import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { EvaluationService } from './services/evaluation.service';
import { GetservicesService } from './services/getservices.service';
import { Services } from './interfaces/services.interface';
import { Evaluation } from './interfaces/evaluation.interface';
import { QuestService } from './services/quest.service';
import { Quest } from './interfaces/quest.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateEvaluationComponent } from './update-evaluation/update-evaluation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
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
export class EvaluationComponent {

  currentCompany!: any;
  profile: any = {};
  startDate: string = '';
  endDate: string = '';
  services: Services[] = [];
  evaluations: Evaluation[] = [];
  questionnaires: any[] = [];
  dataEmpty: boolean = false;
  evDataSource = new MatTableDataSource<Evaluation>();
  evaluationTableColumns: string[] = [
    'evaluationid',
    'evaluationname',
    'companyname',
    'createdAt',
    'type',
    'actions'
  ];
  
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

  constructor(private evaluationService: EvaluationService, private getServicesService: GetservicesService,
      private questService: QuestService, private router: Router, private route: ActivatedRoute,
      public dialog: MatDialog) {
    this.createForm.addControl('name', new FormControl('', Validators.required));
    this.createForm.addControl('serviceId', new FormControl('', Validators.required));
    this.createForm.addControl('type', new FormControl('',Validators.required));
    this.createForm.addControl('companyId', new FormControl(''));
    this.profile = JSON.parse(sessionStorage.getItem('profile') || '');
    this.currentCompany =  27 // TODO: Forzado por compatibilidad con modelo anterior. Cambiar por el cliente seleccionado
    console.log("COMPANY", this.currentCompany);
    this.getEvaluations();

  }

  getEvaluations(): void {
    this.evaluationService.getEvaluationsByCompanyId(this.currentCompany)
    .subscribe((data: Evaluation[]) => {
      console.log("EVALUACIONES:", data);
      this.evaluations = data;
      if(data.length === 0 ) {
        this.dataEmpty = true;
        this.showSpinner = false;
        throw new Error("No exiten evaluaciones disponibles");
      } else {
        this.evDataSource.data = this.evaluations;
      }
    }, (error) => {
      this.dataEmpty = true;
      this.showSpinner = false;
      console.log(error);
    }, () => {
      this.showSpinner = false;
    });
  }

  goNewEval() {
    this.router.navigate(['../new-evaluation'], {relativeTo: this.route});
  }

  delEval(id: number) {
  
  }

  async updateDialog(id: number) {
    const evalFound: Evaluation = this.evaluations.filter(
      (evaluation) => evaluation.evalid === id
    )[0];
    if (evalFound) {
      
      console.log("evaluación encontrada:", evalFound);
      const dialogRef = this.dialog.open(UpdateEvaluationComponent, {
        data: evalFound,
        width: '1024px'
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getEvaluations();
      })
    } else {
      // Mostrar un mensaje de error si no se encuentra el servicio
      console.error(`No se encontró la evaluación con ID ${id}`);
    }
  }

  goBack() {
    this.router.navigate(['../dashboard']);
  }
}
