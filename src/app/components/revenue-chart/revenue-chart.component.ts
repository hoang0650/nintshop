import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { RevenueService } from '../../services/revenue.service';
@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements OnInit {
  public Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {};
  amountArray: [] =[]
  dateArray: [] =[]
  public tabs = [
    { title: 'Ngày', key: 'daily' },
    { title: 'Tuần', key: 'weekly' },
    { title: 'Tháng', key: 'monthly' },
    { title: 'Năm', key: 'yearly' }
  ];

  public currentTab = 'daily';

  constructor(private revenueService: RevenueService) {}

  ngOnInit(): void {
    this.updateChartData(this.currentTab); // Default to daily
  }

  updateChartData(period: string): void {
    this.currentTab = period;

    this.revenueService.getRevenueByPeriod(period).subscribe((data) => {
      const categories = data.revenues.map((revenue:any) => {console.log('date',new Date(revenue.date).toLocaleDateString())});
      const amounts = data.revenues.map((revenue:any) => {console.log('amount',revenue['amount'])});

      this.chartOptions = {
        chart: { type: 'line' },
        title: { text: `Doanh Thu Theo ${this.getTitle(period)}` },
        xAxis: { categories },
        yAxis: { title: { text: 'Doanh Thu' } },
        series: [{ name: 'Doanh Thu', data: amounts, type: 'line' }]
      };
    });
  }

  getTitle(period: string): string {
    switch (period) {
      case 'daily': return 'Ngày';
      case 'weekly': return 'Tuần';
      case 'monthly': return 'Tháng';
      case 'yearly': return 'Năm';
      default: return '';
    }
  }
}