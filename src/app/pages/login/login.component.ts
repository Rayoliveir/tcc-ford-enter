import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ThemeToggleComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Redirect if already logged in (only in browser)
    if (this.isBrowser && localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/homepage']);
    }
  }

  onSubmit(): void {
    // Only run in browser environment
    if (!this.isBrowser) return;
    
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Simple validation (in a real app, this would be server-side)
    if (user && user.email === this.email && user.password === this.password) {
      // Store login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to homepage
      this.router.navigate(['/homepage']);
    } else {
      alert('Credenciais inválidas. Por favor, verifique seu email e senha ou cadastre-se.');
    }
  }
}