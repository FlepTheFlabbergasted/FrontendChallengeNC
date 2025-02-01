import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FitTextDirective } from './directives/fit-text.directive'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime, DurationObjectUnits, DurationUnits } from 'luxon'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

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
    name: new FormControl<string | undefined>(undefined),
    date: new FormControl<DateTime | undefined>(undefined),
  });

  readonly dateDiffUnits: DurationUnits = ['days', 'hours', 'minutes', 'seconds'];

  constructor() {
    this.timeUntilEvent$ = toSignal(this.dateControl.valueChanges.pipe(
      takeUntilDestroyed(),
      filter((date): date is DateTime => !!date),
      map((date: DateTime) => date.diffNow(this.dateDiffUnits).toObject()),
      map((timeUntilEvent: DurationObjectUnits) => this.mapDurationUnitSeconds(timeUntilEvent))
    ),
    { initialValue: this.mapDurationUnitSeconds(DateTime.now().plus({ years: 0.5 }).diffNow(this.dateDiffUnits).toObject()) });
  }

  mapDurationUnitSeconds(timeUntilEvent: DurationObjectUnits) {
    return ({ ...timeUntilEvent, seconds: ~~(timeUntilEvent.seconds || 0) })
  }

  get nameControl(): FormControl {
    return this.eventForm.controls['name'];
  }

  get dateControl(): FormControl {
    return this.eventForm.controls['date'];
  }
}
