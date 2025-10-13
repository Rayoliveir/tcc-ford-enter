import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NgFor } from '@angular/common';
import { ProjectCardComponent, Project } from '../../components/project-card/project-card.component';
import { DocumentationModalComponent } from '../../components/documentation-modal/documentation-modal.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

interface ProjectWithDifficulty extends Project {
  difficulty: 'facil' | 'medio' | 'dificil' | 'extra-dificil';
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor, ProjectCardComponent, DocumentationModalComponent, ThemeToggleComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projects: ProjectWithDifficulty[] = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "Uma plataforma completa de comércio eletrônico com carrinho de compras, pagamento e gerenciamento de pedidos.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Este projeto implementa uma plataforma de comércio eletrônico completa com todas as funcionalidades essenciais.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Catálogo de produtos com categorias</li>
          <li>Carrinho de compras persistente</li>
          <li>Integração com gateways de pagamento</li>
          <li>Sistema de gerenciamento de pedidos</li>
          <li>Painel de administração</li>
          <li>Autenticação de usuários</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Frontend: React, Redux, Sass</li>
          <li>Backend: Node.js, Express</li>
          <li>Banco de Dados: MongoDB</li>
          <li>Autenticação: JWT</li>
          <li>Deploy: Docker, Kubernetes</li>
        </ul>
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 2,
      title: "Dashboard Administrativo",
      description: "Um painel administrativo interativo para monitorar métricas, usuários e relatórios em tempo real.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Este projeto oferece um painel administrativo moderno e responsivo para visualização de métricas e controle de dados de um sistema web.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Visualização de dados com gráficos interativos</li>
          <li>Gestão de usuários e permissões</li>
          <li>Filtro dinâmico por data e categoria</li>
          <li>Tema claro e escuro</li>
          <li>Atualização de dados em tempo real</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Frontend: React, Recharts, TailwindCSS</li>
          <li>Backend: Firebase</li>
          <li>Gerenciamento de Estado: Redux Toolkit</li>
          <li>Deploy: Vercel</li>
        </ul>
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 3,
      title: "Portfólio Interativo",
      description: "Um portfólio pessoal moderno com animações, seções dinâmicas e integração com GitHub.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>O projeto é um portfólio para desenvolvedores que desejam apresentar seus projetos e habilidades de forma visual e interativa.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Animações suaves com Framer Motion</li>
          <li>Integração com GitHub para exibir repositórios</li>
          <li>Formulário de contato com envio automático por EmailJS</li>
          <li>Design responsivo e moderno</li>
          <li>Dark/Light Mode</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Frontend: React, Vite, TailwindCSS, Framer Motion</li>
          <li>Integração: EmailJS, GitHub API</li>
          <li>Deploy: Netlify</li>
        </ul>
        
      `,
      difficulty: 'medio'
    },
    {
      id: 4,
      title: "Landing Page SaaS",
      description: "Landing page otimizada para um produto SaaS com layout moderno e animações interativas.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Uma landing page projetada para startups SaaS, com foco em conversão e experiência do usuário.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Design responsivo</li>
          <li>Integração com formulário de newsletter</li>
          <li>Animações de scroll e entrada de elementos</li>
          <li>Seção de depoimentos e planos de preços</li>
          <li>SEO otimizado</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Next.js, TailwindCSS, Framer Motion</li>
          <li>Formulários: Formspree</li>
          <li>Deploy: Vercel</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    },
    {
      id: 5,
      title: "Aplicativo de Clima",
      description: "Aplicativo moderno que exibe previsões do tempo em tempo real com base na localização do usuário.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Um app intuitivo que consome a API OpenWeather para exibir clima, temperatura e condições atmosféricas.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Busca por cidade</li>
          <li>Detecção automática da localização</li>
          <li>Exibição de temperatura, umidade e vento</li>
          <li>Alteração de unidades (°C / °F)</li>
          <li>Dark mode automático conforme hora do dia</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, Axios, TailwindCSS</li>
          <li>API: OpenWeather</li>
          <li>Deploy: Netlify</li>
        </ul>
        
      `,
      difficulty: 'facil'
    },
    {
      id: 6,
      title: "Blog Pessoal com Markdown",
      description: "Um blog minimalista com suporte a posts em Markdown e renderização estática com Next.js.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Um blog rápido, seguro e de fácil manutenção que utiliza MDX para transformar markdown em componentes React.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Renderização estática de posts</li>
          <li>Roteamento automático</li>
          <li>SEO otimizado</li>
          <li>Suporte a comentários com Giscus</li>
          <li>Design limpo e responsivo</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Next.js, MDX, TailwindCSS</li>
          <li>Deploy: Vercel</li>
        </ul>
        
      
      `,
      difficulty: 'medio'
    },
    {
      id: 7,
      title: "To-Do List Avançada",
      description: "Lista de tarefas completa com categorias, filtros e persistência local.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Um app simples e eficiente para organizar tarefas diárias com filtros e armazenamento no navegador.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Adicionar, editar e remover tarefas</li>
          <li>Categorizar e filtrar tarefas</li>
          <li>Persistência via LocalStorage</li>
          <li>Design responsivo</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Vue.js, Pinia, TailwindCSS</li>
        </ul>
        
      `,
      difficulty: 'facil'
    },
    {
      id: 8,
      title: "Galeria de Imagens com API",
      description: "Uma galeria dinâmica que consome a API do Unsplash para exibir e buscar imagens.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Uma aplicação com busca instantânea e layout responsivo de imagens vindas do Unsplash.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Busca por palavra-chave</li>
          <li>Scroll infinito</li>
          <li>Visualização em grid</li>
          <li>Modo claro e escuro</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, Axios, Masonry Layout</li>
          <li>API: Unsplash</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    },
    {
      id: 9,
      title: "Clone do YouTube",
      description: "Uma interface inspirada no YouTube com reprodução de vídeos e busca integrada.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Frontend funcional que consome a API do YouTube para exibir vídeos, canais e resultados de busca.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Reprodução de vídeos</li>
          <li>Busca em tempo real</li>
          <li>Exibição de canais e recomendações</li>
          <li>Layout responsivo e moderno</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, Material UI, YouTube API</li>
        </ul>
        
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 10,
      title: "Sistema de Chat em Tempo Real",
      description: "Aplicativo de mensagens instantâneas com múltiplas salas e status online.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Frontend de chat rápido e moderno que utiliza WebSockets para comunicação em tempo real.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Mensagens instantâneas</li>
          <li>Salas de bate-papo</li>
          <li>Status online/offline</li>
          <li>Dark mode</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, Socket.io, TailwindCSS</li>
        </ul>
        

      `,
      difficulty: 'dificil'
    },
    {
      id: 11,
      title: "Clone do Spotify",
      description: "Interface do Spotify com player de música funcional e playlists dinâmicas.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Frontend que replica o layout e funcionalidades do Spotify, integrando a API oficial para listar faixas e artistas.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Player de música com controles básicos</li>
          <li>Playlists dinâmicas</li>
          <li>Autenticação via Spotify API</li>
          <li>Layout idêntico ao original</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Next.js, Spotify API, Styled Components</li>
        </ul>
        
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 12,
      title: "App de Receitas",
      description: "Catálogo de receitas com busca e filtros por ingredientes e categorias.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Aplicativo para encontrar e salvar receitas, com filtros avançados e integração com API de culinária.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Busca por nome ou ingrediente</li>
          <li>Favoritar receitas</li>
          <li>Filtro por categoria</li>
          <li>Detalhes de preparo e nutrição</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, Styled Components, Spoonacular API</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    },
    {
      id: 13,
      title: "Kanban Board",
      description: "Aplicativo estilo Trello com drag-and-drop e persistência local.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Uma aplicação de produtividade que permite organizar tarefas em colunas com drag-and-drop intuitivo.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Criação e edição de cartões</li>
          <li>Movimentação por drag-and-drop</li>
          <li>Salvamento automático no localStorage</li>
          <li>Interface responsiva</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, DnD Kit, Zustand</li>
        </ul>
        
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 14,
      title: "Clone do Instagram",
      description: "Interface visual do Instagram com upload de imagens e sistema de likes.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Um clone funcional do Instagram com feed, perfil de usuário e integração com Firebase.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Upload de imagens</li>
          <li>Feed com curtidas e comentários</li>
          <li>Autenticação com Firebase Auth</li>
          <li>Responsividade total</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Next.js, Firebase, TailwindCSS</li>
        </ul>
        
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 15,
      title: "Sistema de Agendamento",
      description: "Frontend para sistema de agendamento com calendário interativo e autenticação.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Aplicação voltada para agendamentos e reservas, com visualização por dia, semana e mês.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Visualização de calendário</li>
          <li>Criação e edição de compromissos</li>
          <li>Login de usuários</li>
          <li>Sincronização com Google Calendar</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React, FullCalendar, TailwindCSS</li>
          <li>Integração: Google Calendar API</li>
        </ul>
        
        
      `,
      difficulty: 'dificil'
    },
    {
      id: 16,
      title: "Gerador de Portfólios Automático",
      description: "Aplicação que gera automaticamente um portfólio baseado nos repositórios GitHub do usuário.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>O projeto coleta dados públicos de um perfil do GitHub e cria automaticamente um portfólio estático estilizado.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Integração com GitHub API</li>
          <li>Geração de seções automática</li>
          <li>Personalização de tema</li>
          <li>Download do site gerado</li>
        </ul>
        
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>Next.js, TailwindCSS, GitHub API</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    },
    {
      id: 17,
      title: "Conversor de Moedas",
      description: "App que converte valores em tempo real com taxas atualizadas.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Uma ferramenta prática para conversão de moedas usando uma API pública.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Conversão instantânea</li>
          <li>Atualização de taxas automáticas</li>
          <li>Interface simples e responsiva</li>
        </ul>
        
        <h3>Tecnologias</h3>
        <ul>
          <li>Vue.js, ExchangeRate API</li>
        </ul>
        
        
      `,
      difficulty: 'facil'
    },
    {
      id: 18,
      title: "Dashboard de Criptomoedas",
      description: "Painel para acompanhar preços e tendências de criptomoedas em tempo real.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Dashboard financeiro que consome a CoinGecko API para exibir gráficos e estatísticas atualizadas.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Listagem de moedas</li>
          <li>Gráficos de variação</li>
          <li>Favoritar criptos</li>
          <li>Atualização automática</li>
        </ul>
        
        <h3>Tecnologias</h3>
        <ul>
          <li>React, Chart.js, Axios</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    },
    {
      id: 19,
      title: "Gerador de QR Code",
      description: "Ferramenta simples para gerar QR Codes personalizados.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>App frontend rápido e funcional que gera códigos QR a partir de qualquer texto ou link inserido.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Geração instantânea de QR</li>
          <li>Download da imagem</li>
          <li>Personalização de cores</li>
        </ul>
        
        <h3>Tecnologias</h3>
        <ul>
          <li>React, qrcode.react, TailwindCSS</li>
        </ul>
        
        
      `,
      difficulty: 'facil'
    },
    {
      id: 20,
      title: "Sistema de Feedbacks",
      description: "Aplicativo para coleta e análise de feedbacks de usuários.",
      isFavorite: false,
      documentation: `
        <h3>Visão Geral</h3>
        <p>Interface web para registrar, visualizar e analisar feedbacks com gráficos e estatísticas.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Envio de feedbacks</li>
          <li>Classificação por tipo</li>
          <li>Exibição de métricas e relatórios</li>
          <li>Filtro e pesquisa de feedbacks</li>
        </ul>
        
        <h3>Tecnologias</h3>
        <ul>
          <li>React, Recharts, TailwindCSS</li>
          <li>Backend opcional: Firebase</li>
        </ul>
        
        
      `,
      difficulty: 'medio'
    }
  ];

  favorites: number[] = [];
  activeTab: string = 'all';
  selectedDifficulty: string = 'all';
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Check if user is logged in (only in browser)
    if (this.isBrowser && !localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/']);
    }

    // Initialize favorites from localStorage (only in browser)
    if (this.isBrowser) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      // Update projects data with favorites
      this.projects.forEach(project => {
        project.isFavorite = this.favorites.includes(project.id);
      });
    }
  }

  toggleFavorite(projectId: number): void {
    // Only run in browser environment
    if (!this.isBrowser) return;

    const project = this.projects.find(p => p.id === projectId);
    
    if (project) {
      project.isFavorite = !project.isFavorite;
      
      // Update favorites array
      if (project.isFavorite) {
        this.favorites.push(projectId);
      } else {
        this.favorites = this.favorites.filter(id => id !== projectId);
      }
      
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      
      // Re-render if we're on the favorites tab
      if (this.activeTab === 'favorites') {
        // The view will automatically update due to Angular's change detection
      }
    }
  }

  showDocumentation(projectId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    
    if (project) {
      this.modalTitle = `Documentação: ${project.title}`;
      this.modalContent = project.documentation;
      this.isModalVisible = true;
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  filterByDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
  }

  get filteredProjects(): ProjectWithDifficulty[] {
    let filtered = this.projects;
    
    // Filter by tab (all or favorites)
    if (this.activeTab === 'favorites') {
      filtered = filtered.filter(project => project.isFavorite);
    }
    
    // Filter by difficulty
    if (this.selectedDifficulty !== 'all') {
      filtered = filtered.filter(project => project.difficulty === this.selectedDifficulty);
    }
    
    return filtered;
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

  logout(): void {
    // Remove login status from localStorage
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
    }
    // Navigate to login page
    this.router.navigate(['/inicio']);
  }
}