import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation.component';
import { NewEvaluationComponent } from './new-evaluation/new-evaluation.component';
const routes: Routes = [
  { path: '', component: EvaluationComponent},
  { path: 'new-evaluation', component: NewEvaluationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
