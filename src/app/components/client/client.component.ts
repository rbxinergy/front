import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ClientDataService } from 'src/app/services/client-data.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule,
    ReactiveFormsModule, CommonModule, MatDividerModule, MatRadioModule, MatButtonModule,
    TranslateModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    business_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    county: new FormControl(''),
    district: new FormControl(''),
    country: new FormControl('', Validators.required),
    document_type: new FormControl('RUT', Validators.required),
    document: new FormControl('', Validators.required),
    is_active: new FormControl(true),
    tag: new FormControl('')
  });
  @Output() validationStatus = new EventEmitter<boolean>();

  constructor(private clientDataService: ClientDataService) { }

  ngOnInit(): void {
    this.clientForm.statusChanges.subscribe(status => {
      console.log(status);
      this.validationStatus.emit(this.clientForm.valid);
    });
  }

  save() {
    this.clientDataService.setClientData(this.clientForm.getRawValue());
  }

}
