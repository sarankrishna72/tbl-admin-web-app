import { Component, Input, OnInit, inject } from '@angular/core';
import { DragAndDropDirective } from '../../../../directives/drag-and-drop/drag-and-drop.directive';
import { FormBase } from '../../../../../core/model';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { FormService } from '../../../../services/form/form.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../..';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    DragAndDropDirective,
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss'
})
export class InputFileComponent extends ControlValueAccessorDirective implements OnInit  {
  @Input() formControlName!: any;
  @Input() formConfig!: FormBase;
  files: any[] = [];
  private _formService = inject(FormService);

  errorMessage(): string {
    let error = this.controlDir?.control?.errors || {};
    if ( Object.keys(error)?.length > 0) {
      let errorName = Object.keys(error)[0]
      if (errorName)
        return this.formConfig?.validations?.find(validation => validation.validatorName?.toLowerCase() === errorName)?.message || '';
    }
    return 'This field is required';
  }


  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: any) {
    this.prepareFilesList($event.files);
    this.onChange($event.files)
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.onChange(this.files)
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals  =2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  ngOnInit(): void {
    if (this.formConfig.validations.length > 0) {
      const validators = []
      for (const validation of this.formConfig.validations) {
        let controlValidator = this._formService.generateValidator(validation);
        if (controlValidator) {
          validators.push(controlValidator)
        }
      }
      if (validators.length > 0) {
        this.controlDir.control?.addValidators(validators);
        this.controlDir.control?.updateValueAndValidity();
      }
    }
  }

}
