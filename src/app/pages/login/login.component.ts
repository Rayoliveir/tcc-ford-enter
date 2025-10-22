import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isBrowser: boolean;
  
  emailError: string = '';
  passwordError: string = '';
  formError: string = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser && localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/homepage']);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.isBrowser) return;
    
    this.emailError = '';
    this.passwordError = '';
    this.formError = '';
    
    if (!this.email && !this.password) {
      this.formError = 'Por favor, preencha todos os campos.';
      return;
    }
    
    if (!this.email || this.email.trim() === '') {
      this.emailError = 'O email é obrigatório.';
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Por favor, insira um email válido.';
      return;
    }
    
    if (!this.password || this.password.trim() === '') {
      this.passwordError = 'A senha é obrigatória.';
      return;
    }
    
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (user && user.email === this.email && user.password === this.password) {
      localStorage.setItem('isLoggedIn', 'true');
      
      this.router.navigate(['/homepage']);
    } else {
      this.formError = 'Credenciais inválidas. Por favor, verifique seu email e senha ou cadastre-se.';
    }
  }
}