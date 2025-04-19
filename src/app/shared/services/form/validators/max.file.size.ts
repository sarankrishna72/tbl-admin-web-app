import { AbstractControl, ValidationErrors } from "@angular/forms";

export function maxFileSizeValidator(maxFileSize: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = control.value;
    if (files) {
      for (const file of files) {
        if (file && file.size > maxFileSize) {
          return { maxFileSize: true };
        }
      }
    }
    return null;
  };
}
