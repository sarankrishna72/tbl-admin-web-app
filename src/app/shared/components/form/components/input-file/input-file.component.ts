import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { DragAndDropDirective } from '../../../../directives';
import { FormBase } from '../../../../../core/model';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { FormService } from '../../../../services/form/form.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../..';
import { FormGroup } from '@angular/forms';
import { COPY } from '../../../../../core/constants/const';

@Component({
    selector: 'app-input-file',
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
  @Input() formGroup !: FormGroup;
  @Input() data: any;
  files: any[] = [];
  private _formService = inject(FormService);
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;
  isRequired: boolean = false;



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


  get fileIdPresent() {
   for (const item of this.files) {
      if (item.id) {
        return true;
      }
   }
    return false;
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
      this.isRequired = this._formService.checkRequiredField(this.formConfig.validations);
    }

    if (!this.data.action || this.data.action.actionId != COPY ) {
      setTimeout(() => {
        this.files  =  this.controlDir.control?.value;
      } ,100)
    }

  }



}
