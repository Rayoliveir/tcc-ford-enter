import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { ProjectCardComponent, Project } from '../../components/project-card/project-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DocumentationModalComponent } from '../../components/documentation-modal/documentation-modal.component';
import { PROJECTS_DATA } from '../../shared/projects-data';

interface ProjectWithStatus extends Project {
  difficulty: 'facil' | 'medio' | 'dificil' | 'extra-dificil';
  status?: 'em-desenvolvimento' | 'concluido' | 'abandonado';
}

@Component({
  selector: 'app-projects-management',
  standalone: true,
  imports: [NgFor, NgIf, ProjectCardComponent, HeaderComponent, DocumentationModalComponent],
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.scss']
})
export class ProjectsManagementComponent implements OnInit {
  isBrowser: boolean;
  activeTab: 'em-desenvolvimento' | 'concluido' | 'abandonado' = 'em-desenvolvimento';
  
  allProjects: ProjectWithStatus[] = [];
  projectsInDevelopment: ProjectWithStatus[] = [];
  projectsCompleted: ProjectWithStatus[] = [];
  projectsAbandoned: ProjectWithStatus[] = [];
  
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

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

    this.loadProjects();
  }

  loadProjects(): void {
    if (!this.isBrowser) return;

    const projectStatuses = JSON.parse(localStorage.getItem('projectStatuses') || '{}');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const allProjectsList = this.getAllProjectsList();
    
    this.allProjects = allProjectsList
      .filter(project => favorites.includes(project.id))
      .map(project => ({
        ...project,
        status: projectStatuses[project.id] || 'em-desenvolvimento',
        isFavorite: true
      }));

    this.updateProjectsByStatus();
  }

  updateProjectsByStatus(): void {
    this.projectsInDevelopment = this.allProjects.filter(p => p.status === 'em-desenvolvimento');
    this.projectsCompleted = this.allProjects.filter(p => p.status === 'concluido');
    this.projectsAbandoned = this.allProjects.filter(p => p.status === 'abandonado');
  }

  getAllProjectsList(): ProjectWithStatus[] {
    return PROJECTS_DATA.map(p => ({...p, isFavorite: false}));
  }

  changeProjectStatus(projectId: number, newStatus: 'em-desenvolvimento' | 'concluido' | 'abandonado'): void {
    if (!this.isBrowser) return;

    const projectStatuses = JSON.parse(localStorage.getItem('projectStatuses') || '{}');
    projectStatuses[projectId] = newStatus;
    localStorage.setItem('projectStatuses', JSON.stringify(projectStatuses));
    const project = this.allProjects.find(p => p.id === projectId);
    if (project) {
      project.status = newStatus;
      this.updateProjectsByStatus();
    }
  }

  switchTab(tab: 'em-desenvolvimento' | 'concluido' | 'abandonado'): void {
    this.activeTab = tab;
  }

  get currentProjects(): ProjectWithStatus[] {
    switch (this.activeTab) {
      case 'em-desenvolvimento':
        return this.projectsInDevelopment;
      case 'concluido':
        return this.projectsCompleted;
      case 'abandonado':
        return this.projectsAbandoned;
      default:
        return [];
    }
  }

  navigateToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  showDocumentation(projectId: number): void {
    const project = this.allProjects.find(p => p.id === projectId);
    
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
    
    this.loadProjects();
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
    }
    this.router.navigate(['/inicio']);
  }
}
