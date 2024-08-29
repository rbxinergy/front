import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';



@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule]
})
export class NewContactComponent {
  contactForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',Validators.required),
    surName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl(''),
    cellphone: new FormControl(''),
    jobTitle: new FormControl(''),
    contactType: new FormControl('',[Validators.required]),
    active: new FormControl(true),
    delete: new FormControl(''),
    tag: new FormControl('')
  });

  constructor(public dialog: MatDialog) { }

  save() {
    this.dialog.open(MessagesModalComponent, {
      width: '500px',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data: {
        message: 'Elemento creado satisfactoriamente',
        type: 'success'
      }
    });
  }

  cancel() {
    this.dialog.closeAll();
  }
}
