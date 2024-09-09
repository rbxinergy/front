import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule {
  constructor() {
    console.log("EvaluationModule loaded");
  }
}
