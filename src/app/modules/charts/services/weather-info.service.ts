import {Injectable} from '@angular/core';
import {APP_CONST} from "../../shared/constants/app.constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, tap, withLatestFrom, zipAll} from "rxjs/operators";
import {Temperature} from "../models/temperature";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {

  tempData: BehaviorSubject<Temperature[]>;
  constructor(private readonly httpClient: HttpClient) {
    this.tempData = new BehaviorSubject<Temperature[]>(null);
  }

  getWeatherData(city: string):Observable<unknown> {
    const params = new HttpParams().set('q', city).set(APP_CONST.API.PARAMS.APP_ID, APP_CONST.API.OPEN_WEATHER_API);

    const url = APP_CONST.API.OPEN_WEATHER_URL+'?'+APP_CONST.API.PARAMS.Q+
      '='+city+'&'+APP_CONST.API.PARAMS.APP_ID+'='+APP_CONST.API.OPEN_WEATHER_API;
    return this.httpClient.get(APP_CONST.API.OPEN_WEATHER_URL, {params: params}).pipe(tap(result => {
      console.log('tapped data:', result['name']);
    }),map(result => {

      const temperature = new Temperature();
      temperature.city = result['name'];
      temperature.max = result['main']['temp_max'];
      temperature.min = result['main']['temp_min'];
      temperature.pressure = result['main']['pressure'];
      return temperature;
    }));
  }

  //   CITIES: ['London', 'Atlanta', 'Berlin', 'Delhi', 'Chennai'],
  getWeatherDataForAllCities(): Observable<unknown> {
    const cityLondon$ = this.getWeatherData('London');
    const cityAtlanta$ = this.getWeatherData('Atlanta');
    const cityBerlin$ = this.getWeatherData('Berlin');
    const cityDelhi$ = this.getWeatherData('Delhi');
    const cityChennai$ = this.getWeatherData('Chennai');

    return forkJoin(cityLondon$, cityAtlanta$, cityBerlin$, cityDelhi$, cityChennai$);

  }

  setCitySubjectDetails() {
    this.getWeatherDataForAllCities().subscribe(
      ([londonData, atlantaData, berlinData, delhiData, chennaiData]) => {
        this.tempData.next([londonData, atlantaData, berlinData, delhiData, chennaiData]);
      });
  }

  getCityDetailsAsObs():Observable<Temperature[]> {
    return this.tempData.asObservable();

  }

}
