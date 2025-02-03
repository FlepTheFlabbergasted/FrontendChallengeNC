import { ElementRef } from '@angular/core';
import { FitTextDirective } from './fit-text.directive';

describe('FitTextDirective', () => {
  const elementRefMock = {};

  it('should create an instance', () => {
    const directive = new FitTextDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });
});
