import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalData } from '../../model/globa-data';
import { DataServiceService } from '../../service/data-service.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  constructor(private dataServise : DataServiceService) { }
  data : GlobalData[] =[];
  result : [] = []
  countryArray : string[] = [];
  countryArray1 : string[] = [];
  countryConfirmed : string[] = [];
  countryRecovered : string[] = [];
  countryDeaths : string[] = []; 

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

    // this.dataServise.getAllData().subscribe(data => {
    //   this.data =data
    //   console.log(this.data);
    //   this.data.forEach(countryName =>{
    //     this.countryArray.push(countryName['country'])
        
    //   })
    //   //console.log(this.countryArray) 
    // });

    //second api

    this.dataServise.getCountryData().subscribe(result => {
      this.result = result
      this.result = this.result['Countries']
      this.result.forEach(countryName1 =>{
        this.countryArray1.push(countryName1['Country'])
        this.countryConfirmed.push(countryName1['TotalConfirmed'])
        this.countryRecovered.push(countryName1['TotalRecovered'])
        this.countryDeaths.push(countryName1['TotalDeaths'])
      })
      console.log(this.countryArray1)
      console.log(this.countryConfirmed)
      console.log(this.countryRecovered)
      console.log(this.countryDeaths)

    });



  }
  
  
  updateValue(countryInput : string){
    console.log(countryInput);
    this.cName =countryInput

    this.result.forEach(countryName =>{
      if(countryName['Country'] == countryInput){
        
        this.cases = countryName['TotalConfirmed'];
        this.active = countryName['TotalConfirmed'] - countryName['TotalRecovered'] -countryName['TotalDeaths'];
        this.deaths = countryName['TotalDeaths'];
        this.recovered = countryName['TotalRecovered'];
        console.log(this.cases,this.active,this.deaths,this.recovered);
        
      }
    })
    
  }

}
