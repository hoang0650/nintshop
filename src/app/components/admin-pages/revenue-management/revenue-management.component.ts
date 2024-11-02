import { Component , OnInit} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import * as Highcharts from 'highcharts';
interface RevenueData {
  month: string;
  storeRevenue: number;
  bloggerRevenue: number;
}

interface Transaction {
  id: number;
  date: string;
  type: 'Store' | 'Blogger';
  name: string;
  amount: number;
}
@Component({
  selector: 'app-revenue-management',
  templateUrl: './revenue-management.component.html',
  styleUrl: './revenue-management.component.css'
})
export class RevenueManagementComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  revenueData: RevenueData[] = [
    { month: "T1", storeRevenue: 5000000, bloggerRevenue: 2000000 },
    { month: "T2", storeRevenue: 6000000, bloggerRevenue: 2500000 },
    { month: "T3", storeRevenue: 7500000, bloggerRevenue: 3000000 },
    { month: "T4", storeRevenue: 8000000, bloggerRevenue: 3500000 },
    { month: "T5", storeRevenue: 9000000, bloggerRevenue: 4000000 },
    { month: "T6", storeRevenue: 10000000, bloggerRevenue: 4500000 },
  ];

  recentTransactions: Transaction[] = [
    { id: 1, date: "2023-06-01", type: "Store", name: "Cửa hàng A", amount: 500000 },
    { id: 2, date: "2023-06-02", type: "Blogger", name: "Nguyễn Văn B", amount: 200000 },
    { id: 3, date: "2023-06-03", type: "Store", name: "Cửa hàng C", amount: 750000 },
    { id: 4, date: "2023-06-04", type: "Blogger", name: "Trần Thị D", amount: 300000 },
    { id: 5, date: "2023-06-05", type: "Store", name: "Cửa hàng E", amount: 600000 },
  ];

  selectedTimeframe = 'thisMonth';

  constructor() { }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  updateChartOptions(): void {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Biểu đồ doanh thu'
      },
      xAxis: {
        categories: this.revenueData.map(data => data.month),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Doanh thu (VNĐ)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} VNĐ</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Doanh thu cửa hàng',
        data: this.revenueData.map(data => data.storeRevenue)
      }, {
        name: 'Doanh thu blogger',
        data: this.revenueData.map(data => data.bloggerRevenue)
      }] as Highcharts.SeriesOptionsType[]
    };
  }

  get totalRevenue(): number {
    return this.revenueData.reduce((sum, data) => sum + data.storeRevenue + data.bloggerRevenue, 0);
  }

  get storeRevenue(): number {
    return this.revenueData.reduce((sum, data) => sum + data.storeRevenue, 0);
  }

  get bloggerRevenue(): number {
    return this.revenueData.reduce((sum, data) => sum + data.bloggerRevenue, 0);
  }

  onTimeframeChange(): void {
    // In a real application, you would fetch new data based on the selected timeframe
    // For this example, we'll just update the chart title
    this.chartOptions.title = { text: `Biểu đồ doanh thu - ${this.selectedTimeframe}` };
    // Force chart redraw
    this.chartOptions = {...this.chartOptions};
  }
}
