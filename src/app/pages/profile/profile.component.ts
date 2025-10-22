import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPhoto: string = '';
  userOccupation: string = '';
  userLocation: string = '';
  isBrowser: boolean;
  isEditingEmail: boolean = false;
  newEmail: string = '';
  isEditingOccupation: boolean = false;
  newOccupation: string = '';
  isEditingLocation: boolean = false;
  newLocation: string = '';
  favoriteCount: number = 0;
  isMenuOpen: boolean = false;
  
  projectsCompleted: number = 0;
  currentStreak: number = 0;
  totalStudyHours: number = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser && !localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/']);
      return;
    }

    if (this.isBrowser) {
      this.loadUserData();
      this.loadFavoriteCount();
    }
  }

  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (user) {
      this.userName = user.name || 'Usuário';
      this.userEmail = user.email || '';
      this.userPhoto = user.photo || this.getDefaultAvatar();
      this.userOccupation = user.occupation || 'Não informado';
      this.userLocation = user.location || 'Não informado';
    }
  }

  loadFavoriteCount(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favoriteCount = favorites.length;
    
    this.projectsCompleted = Math.floor(this.favoriteCount * 0.6); 
    this.currentStreak = Math.min(this.favoriteCount * 2, 30); 
    this.totalStudyHours = this.favoriteCount * 5; 
  }

  getDefaultAvatar(): string {
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(this.userName) + '&size=200&background=random';
  }

  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result;
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.photo = this.userPhoto;
        localStorage.setItem('user', JSON.stringify(user));
      };
      reader.readAsDataURL(file);
    }
  }

  triggerPhotoUpload(): void {
    const fileInput = document.getElementById('photoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  navigateToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
    this.closeMenu();
  }

  navigateToManagement(): void {
    this.router.navigate(['/projects-management']);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
    }
    this.router.navigate(['/inicio']);
    this.closeMenu();
  }

  startEditingEmail(): void {
    this.isEditingEmail = true;
    this.newEmail = this.userEmail;
  }

  cancelEditingEmail(): void {
    this.isEditingEmail = false;
    this.newEmail = '';
  }

  saveEmail(): void {
    if (!this.isBrowser) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.newEmail || !emailRegex.test(this.newEmail)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    this.userEmail = this.newEmail;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.email = this.userEmail;
    localStorage.setItem('user', JSON.stringify(user));
    
    this.isEditingEmail = false;
    this.newEmail = '';
  }

  startEditingOccupation(): void {
    this.isEditingOccupation = true;
    this.newOccupation = this.userOccupation === 'Não informado' ? '' : this.userOccupation;
  }

  cancelEditingOccupation(): void {
    this.isEditingOccupation = false;
    this.newOccupation = '';
  }

  saveOccupation(): void {
    if (!this.isBrowser) return;
    
    this.userOccupation = this.newOccupation.trim() || 'Não informado';
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.occupation = this.userOccupation;
    localStorage.setItem('user', JSON.stringify(user));
    
    this.isEditingOccupation = false;
    this.newOccupation = '';
  }

  startEditingLocation(): void {
    this.isEditingLocation = true;
    this.newLocation = this.userLocation === 'Não informado' ? '' : this.userLocation;
  }

  cancelEditingLocation(): void {
    this.isEditingLocation = false;
    this.newLocation = '';
  }

  saveLocation(): void {
    if (!this.isBrowser) return;
    
    this.userLocation = this.newLocation.trim() || 'Não informado';
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.location = this.userLocation;
    localStorage.setItem('user', JSON.stringify(user));
    
    this.isEditingLocation = false;
    this.newLocation = '';
  }
}
