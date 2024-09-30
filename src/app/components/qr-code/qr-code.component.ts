import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  orderData: any = {
    totalPrice: 0,
    orderId: ''
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderData.totalPrice = params['totalPrice'] ? params['totalPrice'] : 0;
      this.orderData.orderId = params['orderId'] ? params['orderId'] : '';
    });
  }
}
