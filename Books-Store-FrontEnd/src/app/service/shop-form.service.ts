import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { City } from '../model/city';
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  
  constructor(private httpClient: HttpClient) { }


  getYears(): Observable<number[]> {
    let years: number[] = [];
    let theStarYear: number = new Date().getFullYear();
    for (let year = theStarYear; year <= theStarYear + 10; year++) {
      years.push(year);
    }
    return of(years);
  }

  getMonths(theStartMonth: number): Observable<number[]> {
    let months: number[] = [];
    for (let month = theStartMonth; month <= 12; month++) {
      months.push(month);
    }
    return of(months);
  }

  getCountries(): Observable<Country[]>{
    let countryURL= 'http://localhost:8080/api/countries?size=246';
    return this.httpClient.get<GetReponseCountries>(countryURL).pipe(
      map(response => response._embedded.countries)
    )
  }
  getStates(shortname: string): Observable<State[]>{
    let stateURL= `http://localhost:8080/api/states/search/findByCountryShortname?shortname=${shortname}`;
    return this.httpClient.get<GetReponseStates>(stateURL).pipe(
      map(response => response._embedded.states)
    )
  }
  getCities(state_id: number): Observable<City[]>{
    let cityURL= `http://localhost:8080/api/cities/search/findByStateId?state_id=${state_id}`;
    return this.httpClient.get<GetReponseCities>(cityURL).pipe(
      map(response => response._embedded.cities)
    )
  }
}
interface GetReponseCountries{
  _embedded:{
    countries: Country[];
  }
}
interface GetReponseStates{
  _embedded:{
    states: State[];
  }
}
interface GetReponseCities{
  _embedded:{
    cities: City[];
  }
}
