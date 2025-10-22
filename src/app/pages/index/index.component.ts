import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  private scrollListener: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentTheme = localStorage.getItem('theme') || 'light';
      if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.add('light-theme');
      }
      this.initScrollReveal();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initScrollReveal(): void {
    const revealElements = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    revealElements();

    this.scrollListener = () => {
      revealElements();
    };

    window.addEventListener('scroll', this.scrollListener);
  }
}