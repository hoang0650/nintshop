import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css'
})
export class ShopListComponent implements OnInit {
  stores: any[] = [];
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchStores();
  }

  fetchStores() {
    this.adminService.getAllStore().subscribe(
      (response: any) => {
        this.stores = response;
      },
      (error) => {
        console.error("Error fetching stores:", error);
      }
    );
  }
  

  get filteredStores() {
    return this.stores.filter(store => {
      return (
        store.storeName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        store.address?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
  
}
