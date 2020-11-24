import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {ChartDataService} from "../services/chart-data.service";

@Directive({
  selector: '[appChartDirective]'
})
export class ChartDirective implements AfterViewInit, OnChanges{

  @Input('tabDetails') tabNumber: any;
  constructor(private viewContainerRef: ViewContainerRef ,
        private componentFactoryResolver: ComponentFactoryResolver,
              private readonly chartDataService: ChartDataService) {

  }

  ngAfterViewInit() {
    // console.log('inside directive:', this.tabNumber);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes in directive:',changes, );
    const chartDetails = this.chartDataService.getChartsToBeDisplayed();
    const val = changes['tabNumber'].currentValue;

    // irrespective of the chart selected, we can get ti from chartDetails
    this.viewContainerRef.clear();
    // @ts-ignore
    let resolver = this.componentFactoryResolver.resolveComponentFactory(chartDetails[val].component);
    let componentFactory = this.viewContainerRef.createComponent(resolver);
    componentFactory.changeDetectorRef.detectChanges();
    // if(val === 0) {
    //   this.viewContainerRef.clear();
    //   let resolver = this.componentFactoryResolver.resolveComponentFactory(BarChartComponent);
    //   let componentFactory =   this.viewContainerRef.createComponent(resolver);
    //   componentFactory.changeDetectorRef.detectChanges()
    //   console.log('component ref', componentFactory);
    //   // create bar chart component
    // } else if(val === 1) {
    //   this.viewContainerRef.clear();
    //   let resolver = this.componentFactoryResolver.resolveComponentFactory(PieChartComponent);
    //   let componentFactory =   this.viewContainerRef.createComponent(resolver);
    //   componentFactory.changeDetectorRef.detectChanges()
    //   console.log('component ref', componentFactory);
    //   // create pie chart component
    // } else {
    //   this.viewContainerRef.clear();
    //   let resolver = this.componentFactoryResolver.resolveComponentFactory(BarChartComponent);
    //   let componentFactory =   this.viewContainerRef.createComponent(resolver);
    //   componentFactory.changeDetectorRef.detectChanges()
    //   console.log('component ref', componentFactory);
    //   //create scatter plot component
    // }

  }
}
