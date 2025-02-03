import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateTime, DurationObjectUnits } from 'luxon';
import { filter, map, startWith, switchMap, timer } from 'rxjs';
import { FitTextDirective } from './directives/fit-text.directive';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FitTextDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  timeUntilEvent$: Signal<DurationObjectUnits | undefined>;

  eventForm = new FormGroup({
    title: new FormControl<string | undefined>(undefined),
    date: new FormControl<DateTime | undefined>(undefined),
  });

  readonly defaultEventTitle = 'Midsummer 2025';
  readonly defaultDateStr = '2025-06-20';

  readonly localStorageKeyTitle = 'eventTitle';
  readonly localStorageKeyDate = 'eventDate';

  constructor(private localStorageService: LocalStorageService) {
    this.timeUntilEvent$ = toSignal(
      this.dateControl.valueChanges.pipe(
        startWith(DateTime.fromISO(this.defaultDateStr)),
        filter((date): date is DateTime => !!date),
        switchMap((date: DateTime) =>
          timer(0, 1000).pipe(
            map(() => date.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject()),
            map((timeUntilEvent: DurationObjectUnits) => ({
              ...timeUntilEvent,
              seconds: ~~(timeUntilEvent.seconds || 0),
            })),
          ),
        ),
      ),
    );

    const storedTitle = this.localStorageService.getSavedState(this.localStorageKeyTitle);
    const storedDate = this.localStorageService.getSavedState(this.localStorageKeyDate);

    if (storedTitle) {
      this.titleControl.setValue(storedTitle);
    }

    if (storedDate) {
      this.dateControl.setValue(DateTime.fromISO(storedDate));
    }

    this.titleControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((title: string) =>
        this.localStorageService.setSavedState(this.localStorageKeyTitle, title),
      );
    this.dateControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
        filter((date): date is DateTime => !!date),
      )
      .subscribe((date: DateTime) =>
        this.localStorageService.setSavedState(this.localStorageKeyDate, date.toISO()!),
      );
  }

  get titleControl(): FormControl {
    return this.eventForm.controls['title'];
  }

  get dateControl(): FormControl {
    return this.eventForm.controls['date'];
  }
}
