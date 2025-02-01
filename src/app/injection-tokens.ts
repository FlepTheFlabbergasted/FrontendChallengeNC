import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: (): Window => inject(DOCUMENT)!.defaultView!
});
