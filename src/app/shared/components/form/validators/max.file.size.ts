import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MaxSizeValidator(maxSize: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file && file.size > maxSize) {
      return { maxFileSize: true };
    }
    return null;
  };
}
