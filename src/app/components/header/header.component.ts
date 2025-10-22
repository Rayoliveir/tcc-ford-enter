import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToHomepage(): void {
    this.router.navigate(['/homepage']);
    this.closeMenu();
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
    this.closeMenu();
  }

  navigateToManagement(): void {
    this.router.navigate(['/projects-management']);
    this.closeMenu();
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
    this.router.navigate(['/inicio']);
    this.closeMenu();
  }
}
