import { Component , OnInit} from '@angular/core';
interface Store {
  id: number;
  name: string;
  address: string;
  status: 'active' | 'pending' | 'inactive';
}
@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.css'
})
export class StoreManagementComponent implements OnInit {
  stores: Store[] = [
    { id: 1, name: "Cửa hàng A", address: "123 Đường ABC, Quận 1, TP.HCM", status: "active" },
    { id: 2, name: "Cửa hàng B", address: "456 Đường XYZ, Quận 2, TP.HCM", status: "pending" },
    { id: 3, name: "Cửa hàng C", address: "789 Đường DEF, Quận 3, TP.HCM", status: "inactive" },
    { id: 4, name: "Cửa hàng D", address: "101 Đường GHI, Quận 4, TP.HCM", status: "active" },
    { id: 5, name: "Cửa hàng E", address: "202 Đường JKL, Quận 5, TP.HCM", status: "active" },
  ];

  searchValue = '';

  constructor() { }

  ngOnInit(): void { }

  search(): void {
    this.stores = this.stores.filter((item) =>
      item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
}
