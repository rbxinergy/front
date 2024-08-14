import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
// Se elimina la importación de Papa.parse debido a que no se encuentra el módulo ni sus declaraciones de tipos correspondientes.

@Component({
  selector: 'app-file-preview-dialog',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule]
})
export class FilePreviewDialogComponent implements OnInit {
  csvContent: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  constructor(private dialogRef: MatDialogRef<FilePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {file: File}
  ) { }

  ngOnInit(): void {
    this.loadCSVContent();
  }

  loadCSVContent() {
    const file = this.data.file;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const csvData = event.target.result;
      const rows = csvData.split('\n');
      const headers = rows[0].split(';');
      this.displayedColumns = headers;
      this.csvContent = rows.slice(1).map(row => {
        const values = row.split(';');
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
      this.dataSource.data = this.csvContent;
    };
    reader.readAsText(file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUploadClick(): void {
    this.dialogRef.close(this.data.file);
  }

  getColumnIndices() {
    return this.csvContent[0] ? Object.keys(this.csvContent[0]) : [];
  }
}