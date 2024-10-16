import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface ButtonConfig {
  text: string;
  value: any;
  color?: string; // Opcional: para personalizar el color del botón
}

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, TranslateModule]
})
export class MessagesModalComponent {
  modalTitle: string = '';
  modalMessage: string = '';
  modalIcon: string = '';
  buttons: ButtonConfig[] = [];

  constructor(
    public dialogRef: MatDialogRef<MessagesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      type: 'error' | 'success' | 'warning',
      buttons: 'aceptar' | 'cerrar' | 'aceptar-cancelar' | 'si-no' | 'cancelar-continuar' | ButtonConfig[]
    }
  ) {
    this.modalMessage = this.data.message;
    this.setModalType(this.data.type);
    this.setButtons(this.data.buttons);
  }

  /**
   * Configura el título e ícono del modal según el tipo.
   * @param type Tipo de mensaje: 'error', 'succes', 'warning'
   */
  setModalType(type: 'error' | 'success' | 'warning') {
    switch (type) {
      case 'error':
        this.modalTitle = 'Error';
        this.modalIcon = 'assets/svg/error.svg';
        break;
      case 'success':
        this.modalTitle = 'Éxito';
        this.modalIcon = 'assets/svg/succes.svg';
        break;
      case 'warning':
        this.modalTitle = 'Advertencia';
        this.modalIcon = 'assets/svg/warning.svg';
        break;
      default:
        this.modalTitle = 'Mensaje';
        this.modalIcon = '';
    }
  }

  /**
   * Configura los botones a mostrar en el modal.
   * @param buttons Configuración de botones proporcionada.
   */
  setButtons(buttons: 'aceptar' | 'cerrar' | 'aceptar-cancelar' | 'si-no' | 'cancelar-continuar' | ButtonConfig[]) {
    switch (buttons) {
      case 'aceptar':
        this.buttons = [
          { text: 'Aceptar', value: 'aceptar', color: 'primary' }
        ];
        break;
      case 'cerrar':
        this.buttons = [
          { text: 'Cerrar', value: 'cerrar', color: 'warn' }
        ];
        break;
      case 'aceptar-cancelar':
        this.buttons = [
          { text: 'Cancelar', value: 'cancelar', color: 'warn' },
          { text: 'Aceptar', value: 'aceptar', color: 'primary' }
        ];
        break;
      case 'si-no':
        this.buttons = [
          { text: 'No', value: 'no', color: 'warn' },
          { text: 'Sí', value: 'si', color: 'primary' }
        ];
        break;
      case 'cancelar-continuar':
        this.buttons = [
          { text: 'Cancelar', value: 'cancelar', color: 'warn' },
          { text: 'Continuar', value: 'continuar', color: 'primary' }
        ];
        break;
      default:
        this.buttons = buttons;
    }
  }

  /**
   * Maneja la acción cuando se hace clic en un botón.
   * @param value Valor asociado al botón clicado.
   */
  onButtonClick(value: any) {
    this.dialogRef.close(value);
  }
}
