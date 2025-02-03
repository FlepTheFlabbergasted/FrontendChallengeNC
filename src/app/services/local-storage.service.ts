import { inject, Injectable } from '@angular/core';
import { WINDOW } from '../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  window = inject(WINDOW);

  setSavedState(localStorageKey: string, state: string) {
    this.window.localStorage.setItem(localStorageKey, state);
  }

  getSavedState(localStorageKey: string): string | null {
    return this.window.localStorage.getItem(localStorageKey);
  }
}
