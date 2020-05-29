import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalData } from '../model/globa-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private url = 'https://coronavirus-19-api.herokuapp.com/countries'
  constructor(private http : HttpClient) { }

  getAllData(){
    return this.http.get(this.url) as Observable<any>
  }
}
