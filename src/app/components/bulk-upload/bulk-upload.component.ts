import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FilePreviewDialogComponent } from '../file-preview-dialog/file-preview-dialog.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupCompanyService } from 'src/app/services/groupcompany.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { DomainCategoryService } from 'src/app/services/domaincategory.service';
import { ServiceCategoryService } from 'src/app/services/servicecategory.service';
import { DomainService } from 'src/app/services/domain.service';
import { SubdomainService } from 'src/app/services/subdomain.service';
import { ServiceCompanyService } from 'src/app/services/servicecompany.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {
  selectedOption: string = '';
  selectedFile: File | null = null;
  exampleFileUrl: string = '';

  constructor(public dialog: MatDialog, private clientService: ClientService,
    private companyService: CompanyService, private groupCompanyService: GroupCompanyService,
    private userService: UserService, private roleService: RoleService,
    private domainCategoryService: DomainCategoryService, private serviceCategoryService: ServiceCategoryService,
    private domainService: DomainService, private subdomainService: SubdomainService,
    private serviceCompanyService: ServiceCompanyService, private providerService: ProviderService,
    private contactService: ContactService) {}

  onOptionChange(option: string) {
    this.selectedOption = option;
    this.selectedFile = null;
    this.exampleFileUrl = 'assets/csv/' + option + '.csv';
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onShowPreview() {
    if (this.selectedFile) {
      this.dialog.open(FilePreviewDialogComponent, {
        width: '100%',
        data: { file: this.selectedFile }
      });
    }
  }

  onUpload() {
    console.log('onUpload');
    if (this.selectedFile) {
      let uploadObservable: Observable<HttpResponse<any>>;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      switch (this.selectedOption) {
        case 'clients':
          uploadObservable = this.clientService.uploadCSV(formData);
          break;
        case 'cssompany':
          uploadObservable = this.companyService.uploadCSV(formData);
          break;
        case 'groupcompanies':
          uploadObservable = this.groupCompanyService.uploadCSV(formData);
          break;
        case 'users':
          uploadObservable = this.userService.uploadCSV(formData);
          break;
        case 'roles':
          uploadObservable = this.roleService.uploadCSV(formData);
          break;
        case 'domaincategories':
          uploadObservable = this.domainCategoryService.uploadCSV(formData);
          break;
        case 'servicecategories':
          uploadObservable = this.serviceCategoryService.uploadCSV(formData);
          break;
        case 'domains':
          uploadObservable = this.domainService.uploadCSV(formData);
          break;
        case 'subdomains':
          uploadObservable = this.subdomainService.uploadCSV(formData);
          break;
        case 'servicecompanies':
          uploadObservable = this.serviceCompanyService.uploadCSV(formData);
          break;
        case 'providers':
          uploadObservable = this.providerService.uploadCSV(formData);
          break;
        case 'contacts':
          uploadObservable = this.contactService.uploadCSV(formData);
          break;
        default:
          console.error('Opción de carga no válida');
          return;
      }

      uploadObservable.subscribe(
        response => {
          this.dialog.open(MessagesModalComponent, {
            data: { message: 'Archivo subido exitosamente', type: 'success' }
          });
        },
        error => {
          this.dialog.open(MessagesModalComponent, {
            data: { message: 'Error al subir el archivo', type: 'error' }
          });
        }
      );
    }
  }
}