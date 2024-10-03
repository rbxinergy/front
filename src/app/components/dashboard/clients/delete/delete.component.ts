import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  standalone:true,
  imports:[
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatButtonModule
  ]
})
export class DeleteComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ){ }

  onClientDelete (){ }
}
