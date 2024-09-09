import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Question } from '../interfaces/quest.interface';
import { QuestionsTableComponent } from '../questions-table/questions-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-question-library',
    templateUrl: './question-library.component.html',
    styleUrls: ['./question-library.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      QuestionsTableComponent,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatOptionModule,
      MatCheckboxModule,
      MatCardModule,
      MatDividerModule,
      MatListModule,
      MatGridListModule,
      MatSnackBarModule
    ]
})
export class QuestionLibraryComponent {
  questions: Question[] = [];

  constructor(
    public dialogRef: MatDialogRef<QuestionLibraryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  /**
   * Recibe preguntas seleccionadas desde el componente hijo y las almacena.
   * @param event - Arreglo de preguntas seleccionadas.
   */
  getQuestions(event: Question[]): void {
    this.questions = event;
  }

  /**
   * Cierra el diálogo y devuelve las preguntas seleccionadas junto con un mensaje.
   */
  close(): void {
    this.dialogRef.close({questions: this.questions, subdomain: this.data.message});
  }
}
