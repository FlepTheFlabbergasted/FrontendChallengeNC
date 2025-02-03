import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Provider } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const DATE_FORMAT: MatDateFormats = {
  parse: {
    // This is how the date will be parsed from input
    dateInput: 'yyyy-LL-dd',
  },
  display: {
    // This is how the date will get displayed in the input
    dateInput: 'yyyy-LL-dd',
    monthYearLabel: 'LLL, yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'LLL, yyyy',
  },
};

export const DATE_PROVIDERS: Provider[] = [
  { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    ...DATE_PROVIDERS,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
        color: 'primary',
        subscriptSizing: 'dynamic',
      },
    },
  ],
};
