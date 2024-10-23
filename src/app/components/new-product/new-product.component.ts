import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LightningSaleService, LightningSaleCampaign } from '../../services/lightning-sale.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isMobile: boolean = false;
  deadline = new Date().getTime() + 1000 * 60 * 60 * 2; // 2 hours from now
  campaigns: any;

  constructor(private lightningSaleService: LightningSaleService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.checkIfMobile();
    this.lightningSaleService.getCampaigns().subscribe(
      (campaigns) => {
        this.campaigns = campaigns;
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  onScroll() {
    // Add any scroll event logic if necessary
  }

  calculateSoldPercent(productSold: number, discountPrice: number): number {
    const maxItems = 100;
    return (productSold / maxItems) * 100;
  }
}
