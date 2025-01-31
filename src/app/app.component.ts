import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FitTextDirective } from './directives/fit-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FitTextDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
