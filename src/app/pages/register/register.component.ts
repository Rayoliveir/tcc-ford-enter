import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ThemeToggleComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
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
    
    // Simple validation
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    if (this.name && this.email && this.password) {
      // Store user data in localStorage (in a real app, this would be server-side)
      const user = {
        name: this.name,
        email: this.email,
        password: this.password // In a real app, this should be hashed
      };
      
      // Save user data
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to homepage
      this.router.navigate(['/homepage']);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}