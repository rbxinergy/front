import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { NewContactComponent } from './new-contact/new-contact.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule {
  constructor() { }
}
