import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'tab-item',
    imports: [],
    templateUrl: './tab-item.component.html',
    styleUrl: './tab-item.component.scss'
})
export class TabItemComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() active = false;

  @ContentChild('tabContent', { static: true }) content!: TemplateRef<any>;
  @ContentChild('tabHeader', { static: false }) customHeader?: TemplateRef<any>;
}
