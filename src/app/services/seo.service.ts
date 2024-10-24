import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

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

  setSocialShareTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string;
    twitterCard?: string;
  }) {
    this.updateTitle(data.title);
    this.updateOpenGraphTags(data);
    this.updateTwitterCards(data);
    this.updateMetaTags([
      { name: 'description', content: data.description },
    ]);
  }
}