import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone:true
})
export class EditComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ){
    console.log(this.data)
  }
}
