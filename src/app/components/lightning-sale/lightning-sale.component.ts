import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LightningSaleService, LightningSaleCampaign } from '../../services/lightning-sale.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-lightning-sale',
  templateUrl: './lightning-sale.component.html',
  styleUrl: './lightning-sale.component.css'
})
export class LightningSaleComponent implements OnInit {
  campaignForm: FormGroup;
  products: Product[] = [];
  selectedProducts: Set<string> = new Set();

  constructor(
    private formBuilder: FormBuilder,
    private lightningSaleService: LightningSaleService
  ) {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.lightningSaleService.getProducts().subscribe(
      (products) => {
        this.products = products;
        products.forEach(product => {
          this.campaignForm.addControl(`discount-${product._id}`, this.formBuilder.control(''));
        });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onProductSelect(product: Product) {
    if (this.selectedProducts.has(product._id)) {
      this.selectedProducts.delete(product._id);
      this.campaignForm.get(`discount-${product._id}`)?.disable();
    } else {
      this.selectedProducts.add(product._id);
      this.campaignForm.get(`discount-${product._id}`)?.enable();
    }
  }

  isProductSelected(product: Product): boolean {
    return this.selectedProducts.has(product._id);
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const campaign: LightningSaleCampaign = {
        id: '',
        name: this.campaignForm.get('name')?.value,
        startDate: new Date(this.campaignForm.get('startDate')?.value),
        endDate: new Date(this.campaignForm.get('endDate')?.value),
        products: this.products
          .filter(product => this.selectedProducts.has(product._id))
          .map(product => ({
            product,
            discountPrice: this.campaignForm.get(`discount-${product._id}`)?.value
          }))
      };

      this.lightningSaleService.createCampaign(campaign).subscribe(
        (createdCampaign) => {
          console.log('Campaign created:', createdCampaign);
          // Here you would typically navigate to a success page or show a success message
          alert('Lightning Sale Campaign created successfully!');
        },
        (error) => {
          console.error('Error creating campaign:', error);
          // Here you would typically show an error message to the user
          alert('Error creating Lightning Sale Campaign. Please try again.');
        }
      );
    }
  }
}
