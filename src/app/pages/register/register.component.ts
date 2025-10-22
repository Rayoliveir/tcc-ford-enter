import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isBrowser: boolean;
  
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
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

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    if (!this.isBrowser) return;
    
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.formError = '';
    
    if (!this.name && !this.email && !this.password && !this.confirmPassword) {
      this.formError = 'Por favor, preencha todos os campos.';
      return;
    }
    
    if (!this.name || this.name.trim() === '') {
      this.nameError = 'O nome completo é obrigatório.';
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
    
    if (this.password.length < 6) {
      this.passwordError = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }
    
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    
    if (!hasLetter || !hasNumber) {
      this.passwordError = 'A senha deve conter letras e números.';
      return;
    }
    
    if (!this.confirmPassword || this.confirmPassword.trim() === '') {
      this.confirmPasswordError = 'Por favor, confirme sua senha.';
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem.';
      return;
    }
    
    if (this.name && this.email && this.password) {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password 
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      
      this.router.navigate(['/homepage']);
    }
  }
}