import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { NewClientComponent } from '../new-client/new-client.component';
import { MessagesModalComponent } from 'src/app/components/messages-modal/messages-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CorpCategoriesComponent } from '../corp-categories/corp-categories.component';
import { OrganizationComponent } from '../organization/organization.component';
import { GroupCompanyTableComponent } from '../group-company-table/group-company-table.component';


@Component({
  selector: 'app-step-client',
  standalone: true,
  templateUrl: './step-client.component.html',
  styleUrl: './step-client.component.scss',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    NewClientComponent,
    CorpCategoriesComponent,
    OrganizationComponent,
    GroupCompanyTableComponent
  ],
})
export class StepClientComponent implements AfterViewInit {

  @ViewChild(NewClientComponent) newClientComponent: NewClientComponent;
  @ViewChild('stepper') stepper: MatStepper;
  clientForm: FormGroup;
  
  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.clientForm = this.newClientComponent.clientForm;
  }

  saveClient() {
    if (this.newClientComponent.clientForm.valid) {
      const clientData = this.newClientComponent.clientForm.value;
      console.log('Client Data:', clientData);
      const dialogRef = this.dialog.open(MessagesModalComponent, {
        width: '400px',
        height: '300px',
        data: {
          title: 'Cliente guardado',
          message: 'El cliente se ha guardado correctamente',
          type: 'success',
          showCancel: true
        },

      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog closed');
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  goToNextStep() {
    this.stepper.next();
  }

  goToPreviousStep() {
    this.stepper.previous();
  }
}

