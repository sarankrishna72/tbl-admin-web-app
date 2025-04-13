import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'momentDate',
  standalone: true
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, format: string = 'YYYY-MM-DD'): string {
    if (!value) return '';
    return moment(value).format(format);
  }

}
