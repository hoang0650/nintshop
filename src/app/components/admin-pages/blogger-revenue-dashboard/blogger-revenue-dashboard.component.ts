import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
interface Transaction {
  id: number;
  date: string;
  campaign: string;
  amount: number;
}
@Component({
  selector: 'app-blogger-revenue-dashboard',
  templateUrl: './blogger-revenue-dashboard.component.html',
  styleUrl: './blogger-revenue-dashboard.component.css'
})
export class BloggerRevenueDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  bloggerRevenue: number = 25000000;
  totalCampaigns: number = 45;
  averageCampaignValue: number = 555000;

  revenueData = [
    { month: 'T1', revenue: 3000000 },
    { month: 'T2', revenue: 3500000 },
    { month: 'T3', revenue: 4000000 },
    { month: 'T4', revenue: 4500000 },
    { month: 'T5', revenue: 5000000 },
    { month: 'T6', revenue: 5500000 },
  ];

  transactions: Transaction[] = [
    { id: 1, date: '2023-06-01', campaign: 'Chiến dịch A', amount: 1500000 },
    { id: 2, date: '2023-06-02', campaign: 'Chiến dịch B', amount: 2000000 },
    { id: 3, date: '2023-06-03', campaign: 'Chiến dịch C', amount: 1800000 },
    { id: 4, date: '2023-06-04', campaign: 'Chiến dịch D', amount: 2200000 },
    { id: 5, date: '2023-06-05', campaign: 'Chiến dịch E', amount: 1900000 },
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
        text: 'Biểu đồ doanh thu blogger'
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
