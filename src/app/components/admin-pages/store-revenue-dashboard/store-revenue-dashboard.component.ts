import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

interface Transaction {
  id: number;
  date: string;
  product: string;
  amount: number;
}
@Component({
  selector: 'app-store-revenue-dashboard',
  templateUrl: './store-revenue-dashboard.component.html',
  styleUrl: './store-revenue-dashboard.component.css'
})
export class StoreRevenueDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  storeRevenue: number = 45000000;
  totalOrders: number = 1250;
  averageOrderValue: number = 36000;

  revenueData = [
    { month: 'T1', revenue: 5000000 },
    { month: 'T2', revenue: 6000000 },
    { month: 'T3', revenue: 7500000 },
    { month: 'T4', revenue: 8000000 },
    { month: 'T5', revenue: 9000000 },
    { month: 'T6', revenue: 10000000 },
  ];

  transactions: Transaction[] = [
    { id: 1, date: '2023-06-01', product: 'Sản phẩm A', amount: 500000 },
    { id: 2, date: '2023-06-02', product: 'Sản phẩm B', amount: 750000 },
    { id: 3, date: '2023-06-03', product: 'Sản phẩm C', amount: 600000 },
    { id: 4, date: '2023-06-04', product: 'Sản phẩm D', amount: 850000 },
    { id: 5, date: '2023-06-05', product: 'Sản phẩm E', amount: 700000 },
  ];

  expandSet = new Set<number>();

  constructor() { }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  updateChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Biểu đồ doanh thu cửa hàng'
      },
      xAxis: {
        categories: this.revenueData.map(data => data.month)
      },
      yAxis: {
        title: {
          text: 'Doanh thu (VNĐ)'
        }
      },
      series: [{
        name: 'Doanh thu',
        data: this.revenueData.map(data => data.revenue)
      }] as Highcharts.SeriesOptionsType[]
    };
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
