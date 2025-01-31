import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FitTextDirective } from './directives/fit-text.directive'
import { InputComponent } from "./components/input/input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FitTextDirective, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
