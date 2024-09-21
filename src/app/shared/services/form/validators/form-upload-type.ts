import { AbstractControl, ValidatorFn } from '@angular/forms';

export function FormUploadTypeValidator(allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const files = control.value;
    if (files) {
      for (const file of files) {
        const fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
          return { fileValidType: true };
        }
      }
    }
    return null;
  };
}
