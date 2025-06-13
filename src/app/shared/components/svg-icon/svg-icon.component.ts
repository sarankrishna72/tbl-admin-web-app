import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'svg-icon',
    imports: [CommonModule],
    template: `
    <div
      [innerHTML]="svgContent"
      [ngStyle]="{
        width: width + 'px',
        height: height + 'px',
        fill: fill
      }"
      [ngClass]="customClass"
      class="svg-icon"
    ></div>
  `,
    styles: [`
    .svg-icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class SvgIconComponent implements OnChanges {
  @Input() icon!: string; // name of the SVG file (without .svg)
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() fill: string = 'currentColor';
  @Input() customClass: string = '';

  svgContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon'] && this.icon) {
      this.loadSvg(this.icon);
    }
  }

  private loadSvg(iconName: string) {
    const url = `assets/images/${iconName}.svg`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: svg => {
        // Optionally inject fill if not present
        const svgWithColor = svg.replace('<svg', `<svg fill="${this.fill}"`);
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgWithColor);
      },
      error: () => {
        console.error(`SVG "${iconName}" not found in assets/icons/`);
        this.svgContent = '';
      }
    });
  }
}
