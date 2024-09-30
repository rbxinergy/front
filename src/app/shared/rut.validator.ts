import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const rut = control.value;
    if (!rut) {
      return null;
    }

    const isValid = validateRut(rut);
    return isValid ? null : { invalidRut: true };
  };
}

function validateRut(rut: string): boolean {
  // Eliminar puntos y guiones
  rut = rut.replace(/[.-]/g, '');

  // Validar formato
  if (!/^[0-9]+[kK0-9]$/.test(rut)) {
    return false;
  }

  // Separar cuerpo y dígito verificador
  const body = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();

  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const calculatedDv = 11 - (sum % 11);
  const expectedDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();

  return dv === expectedDv;
}
