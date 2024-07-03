import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true
})
export class OutsideClickDirective {

  @Output()
  appClickOutside: EventEmitter<void> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.elementRef.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    const parentElement = this.elementRef.nativeElement.parentElement;
    const clickedInsideParent : boolean = parentElement.contains(event.target);

    if (!clickedInside && clickedInsideParent) {
      this.appClickOutside.emit();
    }
  }

  constructor(private elementRef: ElementRef) { }


}
