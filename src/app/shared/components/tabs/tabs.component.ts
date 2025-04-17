import { CommonModule, NgClass, NgForOf, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, signal } from '@angular/core';
import { TabItemComponent } from './components/tab-item/tab-item.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf, NgClass, NgTemplateOutlet
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  activeIndex = signal(0);
  tabArray: TabItemComponent[] = [];
  @Input() tabBodyClass: string = ''
  
  ngAfterContentInit() {
    this.tabArray = this.tabs.toArray();
    const initialIndex = this.tabArray.findIndex((tab) => tab.active);
    if (initialIndex >= 0) {
      this.selectTab(initialIndex);
    }
  }

  selectTab(index: number) {
    this.activeIndex.set(index);
  }
}
