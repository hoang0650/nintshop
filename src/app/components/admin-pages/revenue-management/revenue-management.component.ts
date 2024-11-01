import { Component , OnInit} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-revenue-management',
  templateUrl: './revenue-management.component.html',
  styleUrl: './revenue-management.component.css'
})
export class RevenueManagementComponent implements OnInit {
  transactions: any[] = [];
  totalRevenue: number = 0;
  userType: string = 'admin'; // Change this based on the logged-in user type (store, blogger, or admin)
  userId: string = ''; // Set this to the logged-in user's ID

  constructor(private apiService: AdminService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    if (this.userType === 'store') {
      this.apiService.getStoreTransactions(this.userId).subscribe(this.handleTransactions);
    } else if (this.userType === 'blogger') {
      this.apiService.getBloggerTransactions(this.userId).subscribe(this.handleTransactions);
    } else {
      this.apiService.getAllTransactions().subscribe(this.handleTransactions);
    }
  }

  handleTransactions = (response: any) => {
    this.transactions = response;
    this.calculateTotalRevenue();
  }

  calculateTotalRevenue() {
    this.totalRevenue = this.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }
}
