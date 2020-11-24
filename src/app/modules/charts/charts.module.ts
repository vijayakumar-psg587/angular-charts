import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsRoutingModule} from './charts-routing.module';
import {AngMaterialModule} from "../ang-material/ang-material.module";
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {ChartDirective} from './directives/chart.directive';
import {HttpClientModule} from "@angular/common/http";
import { RadarComponent } from './components/radar/radar.component';
import {ChartDataService} from "./services/chart-data.service";
import {WeatherInfoService} from "./services/weather-info.service";

@NgModule({
  declarations: [
    BarChartComponent,
    DashboardComponent,
    PieChartComponent,
    ChartDirective,
    RadarComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    AngMaterialModule,
    HttpClientModule
  ],
  providers: [ChartDataService, WeatherInfoService],
  exports: [BarChartComponent, DashboardComponent]
})
export class ChartsModule {
}
