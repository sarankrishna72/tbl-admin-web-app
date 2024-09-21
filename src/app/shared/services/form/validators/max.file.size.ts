import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MaxSizeValidator(maxSize: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = control.value;
    if (files) {
      for (const file of files) {
        if (file && file.size > maxSize) {
          return { maxFileSize: true };
        }
      }
    }
    return null;
  };
}
