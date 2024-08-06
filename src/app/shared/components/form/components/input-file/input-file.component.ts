import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
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
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;

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
    this.files = []
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: any) {
    this.files = []
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
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.getBase64(item).then((data) => {
         this.files.push({
          file: item,
          url: data,
          id: null
         });
      })

    }
  }




  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    })

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

    setTimeout(() => {
      this.files  =  this.controlDir.control?.value
    } ,100)

  }

}
