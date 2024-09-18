import { ControlValueAccessorDirective } from './control-value-accessor.directive';
import { TestBed } from '@angular/core/testing';

describe('ControlValueAccessorDirective', () => {
  let directive: ControlValueAccessorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlValueAccessorDirective],
    });
    const fixture = TestBed.createComponent(ControlValueAccessorDirective);
    directive = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
