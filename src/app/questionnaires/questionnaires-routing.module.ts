import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionairesComponent } from './questionaires.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', component: QuestionairesComponent},
  { path: 'questions/:id', component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnairesRoutingModule { }
