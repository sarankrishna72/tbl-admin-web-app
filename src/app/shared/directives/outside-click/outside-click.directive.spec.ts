import { OutsideClickDirective } from './outside-click.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div class="parent">
      <div class="child" appOutsideClick (appClickOutside)="onOutsideClick()">
        Child Element
      </div>
    </div>
  `
})
class TestComponent {
  onOutsideClick = jasmine.createSpy('onOutsideClick');
}

describe('OutsideClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let parentElement: DebugElement;
  let childElement: DebugElement;
  let directive: OutsideClickDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, OutsideClickDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    parentElement = fixture.debugElement.query(By.css('.parent'));
    childElement = fixture.debugElement.query(By.css('.child'));
    directive = childElement.injector.get(OutsideClickDirective);
  });

  it('should emit appClickOutside when clicked outside the child but inside the parent', () => {
    const clickEvent = new MouseEvent('click', { bubbles: true });
    spyOn(directive.appClickOutside, 'emit');

    // Simulate click on parent but outside of child
    parentElement.nativeElement.dispatchEvent(clickEvent);

    expect(directive.appClickOutside.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.onOutsideClick).toHaveBeenCalled();
  });

  it('should not emit appClickOutside when clicked inside the child', () => {
    const clickEvent = new MouseEvent('click', { bubbles: true });
    spyOn(directive.appClickOutside, 'emit');

    // Simulate click inside the child
    childElement.nativeElement.dispatchEvent(clickEvent);

    expect(directive.appClickOutside.emit).not.toHaveBeenCalled();
    expect(fixture.componentInstance.onOutsideClick).not.toHaveBeenCalled();
  });

  it('should not emit appClickOutside when clicked outside the parent', () => {
    const clickEvent = new MouseEvent('click', { bubbles: true });
    spyOn(directive.appClickOutside, 'emit');

    // Simulate click outside parent
    document.body.dispatchEvent(clickEvent);

    expect(directive.appClickOutside.emit).not.toHaveBeenCalled();
    expect(fixture.componentInstance.onOutsideClick).not.toHaveBeenCalled();
  });
});
