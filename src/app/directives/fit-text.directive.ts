import { AfterContentChecked, AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, inject, Input, NgZone, OnDestroy } from '@angular/core';
import { WINDOW } from '../injection-tokens';
import { debounceTime, fromEvent, Subject, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appFitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit, OnDestroy {
  @Input() minFontSizePx = 10;
  @Input() maxFontSizePx = 300;

  window = inject(WINDOW);

  resizeAndMutationSubject = new Subject<void>();
  resizeObserver!: ResizeObserver;
  mutationObserver!: MutationObserver;

  readonly resizeAndMutationThrottleTimeMs = 50;

  constructor(private el: ElementRef<HTMLElement>) {
    this.resizeObserver = new ResizeObserver(() => this.resizeAndMutationSubject.next());
    this.mutationObserver = new MutationObserver(() => this.resizeAndMutationSubject.next());

    fromEvent(this.window, 'resize')
    .pipe(
      throttleTime(this.resizeAndMutationThrottleTimeMs),
      takeUntilDestroyed(),
    )
    .subscribe(() => this.resizeAndMutationSubject.next());

    this.resizeAndMutationSubject.pipe(
      debounceTime(this.resizeAndMutationThrottleTimeMs),
      takeUntilDestroyed(),
    )
    .subscribe(() => this.resizeText());
  }

  ngAfterViewInit() {
    this.resizeObserver.observe(this.el.nativeElement.parentElement as Element);
    this.mutationObserver.observe(this.el.nativeElement, { childList: true, subtree: true, characterData: true });
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
  }

  resizeText() {
    const element = this.el.nativeElement;
    const parent = element.parentElement;

    if (!parent) {
      return;
    }

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
