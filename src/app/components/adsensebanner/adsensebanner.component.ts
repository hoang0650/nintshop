import { Component, AfterViewInit } from '@angular/core';
// Khai báo adsbygoogle trong window
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
@Component({
  selector: 'app-adsensebanner',
  templateUrl: './adsensebanner.component.html',
  styleUrl: './adsensebanner.component.css'
})
export class AdsensebannerComponent  implements AfterViewInit {
  ngAfterViewInit(): void {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }
}
