import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonChart} from "../../interfaces/common-chart";
import {Temperature} from "../../models/temperature";
import {WeatherInfoService} from "../../services/weather-info.service";
import {APP_CONST} from "../../../shared/constants/app.constants";
import {Chart} from "chart.js";
@Component({
  selector: 'app-scatter-plot',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, CommonChart, AfterViewInit {

  chart: Chart;
  chartLoaded: boolean = false;
  cityTempData: Temperature[];
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private weatherInfoService: WeatherInfoService,
              private readonly elRef: ElementRef) {
  }

  ngOnInit(): void {
    // create the chart here
    console.log('comin in here');

  }


  chartDetails() {
    console.log('inside chart details() -1', this.chartLoaded);
    console.log('inside chart details() -2', this.cityTempData);

    const dataTempArray = [];
    this.cityTempData.forEach((val, index) => {
      dataTempArray.push(val.min);
    });

    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'radar',
      data: {
        labels: [...APP_CONST.CITIES],
        datasets: [{
          label: 'Temperature',
          data: [...dataTempArray],
          backgroundColor: [
            'rgba(57,70,127,1.00)',
            'rgba(159,42,127,1.00)',
            'rgba(96,160,127,1.00)',
            'rgba(228,220,127,1.00)',
            'rgba(107,9,127,1.00)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderWidth: 0.7,
          borderCapStyle: "round",
          barThickness: 20,
          minBarLength: 12,
          borderJoinStyle: "miter",
          cubicInterpolationMode: "monotone",
          categoryPercentage: 25,
          hoverBackgroundColor: 'red',
          hoverRadius: 20,

        }]
      },
      options: {
        tooltips: {
          mode: 'nearest'
        },
        events: ['click'],

        scales: {
          xAxes: [
            {
              scaleLabel: {
                labelString: 'Cities',
                display: false
              },
              ticks: {
                fontSize: 12,
                fontStyle: 'Roboto',
                fontColor: 'darkgreen',
                display: false
              }
            }
          ],
          yAxes: [{
            scaleLabel: {
              display: false,
              labelString: 'Temperature',
              fontColor: 'darkgreen'
            },
            ticks: {
              beginAtZero: true,
              fontColor: 'darkgreen',
              fontSize: 12,
              display: false
            }
          }]
        }
      }
    });

  }

  ngAfterViewInit() {
    console.log('in ngaFTERvIEWiNIT', this.cityTempData);
    this.weatherInfoService.setCitySubjectDetails();
    this.weatherInfoService.getCityDetailsAsObs().subscribe(data => {
      console.log('complete data list:', data);
      this.cityTempData = data;
      if (data != null) {
        console.log('data is not null');
        this.chartDetails();
        this.chartLoaded = true;
      }
    });
  }


}
