import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  standalone:true,
  imports:[
    MatDialogModule,
    CommonModule,
    MatButtonModule
  ]
})
export class SeeComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ){ }

}
