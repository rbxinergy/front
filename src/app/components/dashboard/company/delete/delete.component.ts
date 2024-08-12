import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone:true,
  imports:[
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ]
})
export class DeleteComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ){
    console.log(this.data)
  }
  onCompanyDelete(){
    console.log("Company deleted: ", this.data)
  }
}
