import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {
    this.listenToRouteChanges();
  }

  private listenToRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;
      let title = this.getTitle(currentRoute);
      this.setSocialShareTags({
        title: title,
        description: this.getMetaTagContent('description'),
        image: this.getMetaTagContent('og:image'),
        url: window.location.href,
      });
    });
  }

  private getTitle(route: any): string {
    let title = route.snapshot.data['title'];
    if (route.firstChild) {
      title = this.getTitle(route.firstChild) || title;
    }
    return title || 'Default Title';
  }

  private getMetaTagContent(name: string): string {
    const tag = this.meta.getTag(`name="${name}"`) || this.meta.getTag(`property="${name}"`);
    return tag ? tag.content : '';
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(tags: { name: string; content: string }[]) {
    tags.forEach(tag => {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    });
  }

  updateOpenGraphTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string;
  }) {
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
  }

  updateTwitterCards(data: {
    title: string;
    description: string;
    image: string;
    card?: string;
  }) {
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });
    this.meta.updateTag({ name: 'twitter:card', content: data.card || 'summary_large_image' });
  }

  stripHtmlTags(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  setSocialShareTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string;
    twitterCard?: string;
  }) {
    const cleanDescription = this.stripHtmlTags(data.description);
    this.updateTitle(data.title);
    this.updateOpenGraphTags({...data, description: cleanDescription});
    this.updateTwitterCards({...data, description: cleanDescription});
    this.updateMetaTags([
      { name: 'description', content: cleanDescription },
    ]);
  }
}