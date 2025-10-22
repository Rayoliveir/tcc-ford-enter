import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  isFavorite: boolean;
  documentation: string;
  difficulty: 'facil' | 'medio' | 'dificil' | 'extra-dificil';
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() toggleFavorite = new EventEmitter<number>();
  @Output() showDocumentation = new EventEmitter<number>();

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.project.id);
  }

  onShowDocumentation(): void {
    this.showDocumentation.emit(this.project.id);
  }

  getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
      case 'facil': return 'Fácil';
      case 'medio': return 'Médio';
      case 'dificil': return 'Difícil';
      case 'extra-dificil': return 'Extra Difícil';
      default: return difficulty;
    }
  }

  getDifficultyClass(difficulty: string): string {
    return `difficulty-badge ${difficulty}`;
  }

  getImageName(title: string): string {
    const imageMap: { [key: string]: string } = {
      'E-commerce Website': 'E-commerce WebSite.png',
      'Dashboard Administrativo': 'Dashboard Administrativo.png',
      'Portfólio Interativo': 'Portifolio Interativo.png',
      'Landing Page SaaS': 'Landing Page SaaS.png',
      'Aplicativo de Clima': 'Aplicativo de Clima.png',
      'Blog Pessoal com Markdown': 'Blog Pessoal com Markdown.png',
      'To-Do List Avançada': 'To-Do-List Avançada.png',
      'Galeria de Imagens com API': 'Galeria de Imagens.png',
      'Clone do YouTube': 'Clone do Youtube.png',
      'Sistema de Chat em Tempo Real': 'Sistema de Chat em tempo Real.png',
      'Clone do Spotify': 'Clone do Spotify.png',
      'App de Receitas': 'App de Receitas.png',
      'Kanban Board': 'Kanban Board.png',
      'Clone do Instagram': 'Clone do Instagram.png',
      'Sistema de Agendamento': 'Sistema de Agendamento.png',
      'Gerador de Portfólios Automático': 'Gerador de Portifolios Automatico.png',
      'Conversor de Moedas': 'Conversor de moedas.png',
      'Dashboard de Criptomoedas': 'Dashboard de criptomoedas.png',
      'Gerador de QR Code': 'Gerador de QrCode.png',
      'Sistema de Feedbacks': 'Sistema de feedbacks.png'
    };

    return imageMap[title] || `${title}.png`;
  }

  onImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';
    
    // Create or show a placeholder element
    const parent = imgElement.parentElement;
    let placeholder = parent.querySelector('.image-placeholder');
    
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = `Projeto ${this.project.id}`;
      parent.appendChild(placeholder);
    }
    
    placeholder.style.display = 'flex';
  }
}