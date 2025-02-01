import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';
import { WINDOW } from '../injection-tokens';

@Directive({
  selector: '[appFitText]',
  standalone: true
})
export class FitTextDirective implements AfterViewInit {
  private readonly window = inject(WINDOW);
  private readonly minFontSizePx = 10;
  private readonly maxFontSizePx = 300;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    // Wait for element to have rendered before resizing
    setTimeout(() => this.resizeText(), 50);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeText();
  }

  resizeText() {
    const element = this.el.nativeElement;
    const parent = element.parentElement;

    if (!parent) return;

    let min = this.minFontSizePx;
    let max = this.maxFontSizePx;
    let best = min;

    // Ensure that the text remains on one line
    element.style.whiteSpace = 'nowrap';
    // Avoids inline elements breaking func
    element.style.display = 'block';

    // We do a binary search to find the max font size that fits the parent width
    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      element.style.fontSize = `${mid}px`;

      if (element.scrollWidth > parent.clientWidth) {
        // Too big, decrease size
        max = mid - 1;
      } else {
        // Try a bigger size
        min = mid + 1;
        best = mid;
      }
    }

    element.style.fontSize = `${best}px`;
  }
}
