import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalData } from '../../model/globa-data';
import { DataServiceService } from '../../service/data-service.service';
import { ChartType, ChartOptions } from 'chart.js';



@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  constructor(private dataServise : DataServiceService) { }
  
  result : [] = []
  countryArray : string[] = [];
  countryArray1 : string[] = [];
  countryConfirmed : string[] = [];
  countryRecovered : string[] = [];
  countryDeaths : string[] = []; 
  oneDayConfirmedcases : [] = [];
  oneDayActivecases : [] = [];
  oneDayDeathscases : [] = [];
  oneDayRecoveredcases : [] = [];
  oneDaydate : [] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false
  };
  public lineChartData = [];
  public lineChartLabels= [];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartColors =[];
  n : string = "";

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
    data : [] ;
    replaceCountry : any;
    countryNameInput : string;
    // ready : boolean = false;
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

    this.inItChart();



  }

  inItChart(){
    this.lineChartData  = [
      { data: this.oneDayConfirmedcases,
        label: 'Confirmed' 
      },
      { data: this.oneDayActivecases,
        label: 'Active' 
      },
      { data: this.oneDayRecoveredcases,
        label: 'Recover' 
      },
      { data: this.oneDayDeathscases,
        label: 'Dathes' 
      },

    ];
    this.lineChartLabels = this.oneDaydate;
    this.lineChartColors = [
      {
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        borderColor: 'blue',
        backgroundColor: 'rgba(0,255,0,0.3)',
      },
      {
        borderColor: 'green',
        backgroundColor: 'rgba(0,0,255,0.3)',
      },
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.3)',
      },
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.lineChartPlugins = [];
  }
  
  
  updateValue(countryInput : string){
    console.log(countryInput);
    this.cName = countryInput
    // this.ready = false;
    this.result.forEach(countryName =>{
      if(countryName['Country'] == countryInput){
      
      
      
        this.cases = countryName['TotalConfirmed'];
        this.active = countryName['TotalConfirmed'] - countryName['TotalRecovered'] -countryName['TotalDeaths'];
        this.deaths = countryName['TotalDeaths'];
        this.recovered = countryName['TotalRecovered']; 
        this .countryNameInput = countryName['Slug']  
        console.log(this.cases,this.active,this.deaths,this.recovered);
        
      }
    })
    // this.replaceCountry = countryInput.replace(' ', '-')
    // this.replaceCountry = countryInput.toString().split(' ').join('-')
    this.oneDayConfirmedcases.length = 0
    this.oneDaydate.length = 0
    this.oneDayActivecases.length = 0;
    this.oneDayRecoveredcases.length = 0;
    this.oneDayDeathscases.length = 0;
    console.log(this.countryNameInput)
    this.dataServise.getDayByDay(this.countryNameInput).subscribe(data => {
      this.data = data
      this.data.forEach(dailyCases =>{
        this.oneDayConfirmedcases.push(dailyCases['Confirmed']);
        this.oneDayActivecases.push(dailyCases['Active']);
        this.oneDayRecoveredcases.push(dailyCases['Recovered']);
        this.oneDayDeathscases.push(dailyCases['Deaths']);
        // this.n = dailyCases['Date']
        // this.n  = this.n.substr(0,10)
        this.oneDaydate.push(dailyCases['Date']);
        
      })
      console.log(this.oneDaydate)
      console.log(this.oneDayConfirmedcases);
      console.log(this.oneDayActivecases);
      console.log(this.oneDayRecoveredcases);
      console.log(this.oneDayDeathscases);

      
      // this.ready =true;
      
     

    });

    
  }

}
