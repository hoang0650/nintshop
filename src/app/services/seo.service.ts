import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private currentTitle: string = '';

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(title: string) {
    this.currentTitle = title;
    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }

  getTitle(): string {
    return this.currentTitle || this.title.getTitle();
  }

  private getMetaTagContent(tagName: string): string {
    // Check for 'name' attribute
    const nameTag = this.meta.getTag(`name="${tagName}"`);
    if (nameTag) {
      return nameTag.content;
    }

    // Check for 'property' attribute (used by Open Graph)
    const propertyTag = this.meta.getTag(`property="${tagName}"`);
    if (propertyTag) {
      return propertyTag.content;
    }

    return '';
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
    this.setTitle(data.title);
    this.updateOpenGraphTags({...data, description: cleanDescription});
    this.updateTwitterCards({...data, description: cleanDescription});
    this.updateMetaTags([
      { name: 'description', content: cleanDescription },
    ]);
  }
}