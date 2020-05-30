import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalData } from 'src/app/model/globa-data';
import { DataServiceService } from 'src/app/service/data-service.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  constructor(private dataServise : DataServiceService) { }
  data : GlobalData[] =[];
  countryArray : string[] = [];
  country: string;
    cases : any;
    todayCases : number;
    deaths : any;
    todayDeaths : number;
    recovered : any;
    active : any;
    critical : number;
    casesPerOneMillion : number;
    deathsPerOneMillion : number;
    totalTests : number;
    testsPerOneMillion : number;
    cName : string;
  ngOnInit(){

    this.dataServise.getAllData().subscribe(data => {
      this.data =data
      console.log(this.data);
      this.data.forEach(countryName =>{
        this.countryArray.push(countryName['country'])
      })
      console.log(this.countryArray)
     

      
    });
  }
  updateValue(countryInput : string){
    console.log(countryInput);
    this.cName =countryInput

    this.data.forEach(countryName =>{
      if(countryName.country == countryInput){
        
        this.cases = countryName['cases']
        this.active = countryName['active']
        this.deaths = countryName['deaths']
        this.recovered = countryName['recovered']
        if(countryName['active'] == null){
          this.active = 'Not available'  
        }
        if(countryName['recovered'] == null){
          this.recovered = 'Not available'  
        }
        if(countryName['deaths'] == null){
          this.deaths = 'Not available'  
        }
        if(countryName['cases'] == null){
          this.cases = 'Not available'  
        }
        console.log(this.cases,this.active,this.deaths,this.recovered);
        
      }
    })
    
  }

}
