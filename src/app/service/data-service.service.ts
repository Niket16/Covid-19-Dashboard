import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private url = 'https://coronavirus-19-api.herokuapp.com/countries';
  private url1 = 'https://api.covid19api.com/summary';
  private dayByDayUrl = 'https://api.covid19api.com/dayone/country/india/status/confirmed'
  constructor(private http : HttpClient) { }

  getAllData(){
    return this.http.get(this.url) as Observable<any>
  }

  getCountryData(){
    return this.http.get(this.url1) as Observable<any>
  }

  getDayByDay(countryName : string){
    console.log('https://api.covid19api.com/dayone/country/'+ countryName+'/status/confirmed');
    
    return this.http.get('https://api.covid19api.com/dayone/country/'+ countryName+'/status/confirmed') as Observable<any>
  }


}
