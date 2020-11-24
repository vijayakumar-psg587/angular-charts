import {ComponentRef, Injectable} from '@angular/core';
import {ChartDetails} from "../models/chart-details";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {BarChartComponent} from "../components/bar-chart/bar-chart.component";
import {PieChartComponent} from "../components/pie-chart/pie-chart.component";
import {RadarComponent} from "../components/radar/radar.component";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  // TODO: get the details from server - for now hardcode the datapoints
  charts: ChartDetails[];
  chartData: BehaviorSubject<object>;
  constructor(private readonly httpClient: HttpClient) {
    this.charts = [];
    this.chartData = new BehaviorSubject<object>(null);
  }

  getChartsToBeDisplayed() {
    this.charts = [
      {label: 'BarChart', linkedIcon: '', component: BarChartComponent, type: 'bar'},
      {label: 'PieChart', linkedIcon: '', component: PieChartComponent, type: 'doughnut'},
      {label: 'Radar', linkedIcon: '', component: RadarComponent, type: 'radar'}
    ];
    return this.charts;
  }

  getChartDetails() {
    if(this.charts != null && this.charts.length > 0) {
      // TODO get the datapoints from server and add it to chartData
      this.charts.forEach(chartDetail => {
        // get the data from the json  - for now hardcode from the service
        chartDetail.data = [];
      });
    }
  }
}
