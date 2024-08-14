import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule]
})
export class FileUploadComponent {
  fileName: string = '';
  selectedFile: File | null = null;

  @Input() allowedFileTypes: string[] = ['csv'];
  @Output() fileSelected = new EventEmitter<File>();

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
}