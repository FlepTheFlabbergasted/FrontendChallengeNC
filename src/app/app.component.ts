import { ChangeDetectionStrategy, Component, Signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FitTextDirective } from './directives/fit-text.directive'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime, DurationObjectUnits } from 'luxon'
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FitTextDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  timeUntilEvent$: Signal<DurationObjectUnits | undefined>;

  eventForm = new FormGroup({
    title: new FormControl<string | undefined>(undefined),
    date: new FormControl<DateTime | undefined>(undefined),
  });

  readonly defaultEventTitle = 'Midsummer 2025'
  readonly defaultDateStr = '2025-06-20'

  constructor() {
    this.timeUntilEvent$ = toSignal(this.dateControl.valueChanges.pipe(
      startWith(DateTime.fromISO(this.defaultDateStr)),
      filter((date): date is DateTime => !!date),
      switchMap((date: DateTime) => timer(0, 1000).pipe(
        map(() => date.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject()),
        map((timeUntilEvent: DurationObjectUnits) => ({ ...timeUntilEvent, seconds: ~~(timeUntilEvent.seconds || 0) }))
      )),
    ));
  }

  get titleControl(): FormControl {
    return this.eventForm.controls['title'];
  }

  get dateControl(): FormControl {
    return this.eventForm.controls['date'];
  }
}
