import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent],
  template: `
    <router-outlet />
    <app-theme-toggle></app-theme-toggle>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('project-dashboard');
}