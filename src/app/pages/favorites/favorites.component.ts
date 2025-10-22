import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { ProjectCardComponent, Project } from '../../components/project-card/project-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DocumentationModalComponent } from '../../components/documentation-modal/documentation-modal.component';
import { PROJECTS_DATA } from '../../shared/projects-data';

interface ProjectWithDifficulty extends Project {
  difficulty: 'facil' | 'medio' | 'dificil' | 'extra-dificil';
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, NgIf, ProjectCardComponent, HeaderComponent, DocumentationModalComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isBrowser: boolean;
  
  favoriteProjects: ProjectWithDifficulty[] = [];
  
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  
  allProjects: ProjectWithDifficulty[] = PROJECTS_DATA.map(p => ({...p, isFavorite: false}));

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
      this.loadFavoriteProjects();
    }
  }

  loadFavoriteProjects(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    this.favoriteProjects = this.allProjects.filter(project => 
      favorites.includes(project.id)
    ).map(project => ({
      ...project,
      isFavorite: true
    }));
  }

  navigateToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  showDocumentation(projectId: number): void {
    const project = this.favoriteProjects.find(p => p.id === projectId);
    
    if (project) {
      this.modalTitle = `Documentação: ${project.title}`;
      this.modalContent = project.documentation;
      this.isModalVisible = true;
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleFavorite(projectId: number): void {
    if (!this.isBrowser) return;

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(projectId)) {
      favorites = favorites.filter((id: number) => id !== projectId);
    } else {
      favorites.push(projectId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    this.loadFavoriteProjects();
  }
}
