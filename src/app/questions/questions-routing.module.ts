import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewQuestionsComponent } from './new-questions.component';

const routes: Routes = [
  { path: '', component: NewQuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
