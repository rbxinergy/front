import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionairesComponent } from './questionaires.component';
import { QuestionsComponent } from './questions/questions.component';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';

const routes: Routes = [
  { path: '', component: QuestionairesComponent},
  { path: 'questions/:id', component: QuestionsComponent},
  { path: 'new-questionnaire', component: NewQuestionnaireComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnairesRoutingModule { }
