import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule]
})
export class FileUploadComponent {
  fileName: string = '';
  selectedFile: File | null = null;

  @Input() allowedFileTypes: string[] = ['csv'];
  @Output() fileSelected = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  get acceptTypes(): string {
    return this.allowedFileTypes.map(type => `.${type}`).join(',');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
      this.fileSelected.emit(file);
    }
  }

  clearFileSelection() {
    this.fileName = '';
    this.selectedFile = null;
    this.fileSelected.emit(null);
    this.fileInput.nativeElement.value = '';
  }
}