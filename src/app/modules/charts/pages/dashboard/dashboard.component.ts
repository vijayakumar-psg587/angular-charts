import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatTabGroup} from "@angular/material/tabs";
import {ChartDataService} from "../../services/chart-data.service";
import {BarChartComponent} from "../../components/bar-chart/bar-chart.component";
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {RadarComponent} from "../../components/radar/radar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  charts:object[];
  icons: string[];
  tabBackground: ThemePalette;
  activeTabSelected = 0;
  componentRef: ComponentRef<any>;
  @Input('label')
  textLabel: string
  @ViewChild('vf',{read: ViewContainerRef}) vf: ViewContainerRef;
  constructor(private cdRef: ChangeDetectorRef, private matIconRegistry: MatIconRegistry,
              private readonly chartService: ChartDataService,
              private domSanitizer: DomSanitizer, private componentFactoryResolver:ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.charts = this.chartService.getChartsToBeDisplayed();
    this.icons = [];
    this.matIconRegistry.addSvgIcon(
      'bar-chart-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./../../../../../assets/icons/bar_chart-24px.svg')
    );
    this.icons.push('bar_chart');
    this.matIconRegistry.addSvgIcon(
      'pie-chart-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./../../../../../assets/icons/pie_chart-24px.svg')
    );
    this.icons.push('pie_chart');
    this.matIconRegistry.addSvgIcon(
      'scatter-plot-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./../../../../../assets/icons/scatter_plot-24px.svg')
    );
    this.icons.push('scatter_plot');
  }

  ngAfterViewInit() {
    this.tabBackground = 'primary';
    this.charts.map((chartLink, index) => {
      chartLink['linkedIcon'] = this.icons[index];
    });
    this.cdRef.detectChanges();
    console.log('after view init:', this.charts);
  }

  tabChangeEvent(event) {
    // console.log(event);
    this.activeTabSelected = event['index'];
    console.log('inside tab change event', this.activeTabSelected, this.charts[1]['component']);
  }

  matTabSelected() {
    return this.activeTabSelected;
  }
}
