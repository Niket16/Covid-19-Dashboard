import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../service/data-service.service';
import { GlobalData } from '../../model/globa-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartType, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor(private dataServise : DataServiceService) { }
    data : GlobalData[] =[];
    // pieChart: GoogleChartInterface ={
    //   chartType : 'PieChart'
    // };
    datatable = []
    country: string;
    cases : number;
    todayCases : number;
    deaths : number;
    todayDeaths : number;
    recovered : number;
    active : number;
    critical : number;
    casesPerOneMillion : number;
    deathsPerOneMillion : number;
    totalTests : number;
    testsPerOneMillion : number;
    ready : boolean = false;
    result : [] = []

   
    public barChartOptions: ChartOptions = {
      responsive: true,
    };

    public barChartLabels= [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData= [];
    public barChartRecoverd =[]
    public barChartDeath = []

    public pieChartOptions: ChartOptions = {
      responsive: true,
    };

    public pieChartLabels  = [];
    public pieChartData = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public pieChartactive= [];
    public pieChartDeath = [];
    public pieChartRecoverd = [];
    leftside : any
    rightside : any


     initChart(){
      this.dataServise.getCountryData().subscribe(result =>{
        //this.datatable = [];
        //this.datatable.push(["Country","Cases"])
        //console.log(this.data)
        this.result = result['Countries'];

        //Sort data by key value
        this.result.sort((leftside :any , rightside : any) : number =>{
          if( leftside.TotalConfirmed < rightside.TotalConfirmed) return 1;
          if( leftside.TotalConfirmed > rightside.TotalConfirmed) return -1;
        });

        console.log(this.result);
        

        this.result.forEach(ce=>{
          // this.datatable.push([ce.country,ce.cases])
          // console.log(ce.country);
          this.pieChartLabels.push(ce['Country'])
          this.pieChartData.push(ce['TotalConfirmed'])
          this.pieChartactive.push(ce['TotalConfirmed'] - ce['TotalDeaths'] - ce['TotalRecovered'] )
          this.pieChartDeath.push(ce['TotalDeaths'])
          this.pieChartRecoverd.push(ce['TotalRecovered'])
        })
        // For Pie chart
        this.pieChartData = this.pieChartData.splice(0, 10);
        this.pieChartLabels = this.pieChartLabels.splice(0, 10);
        this.pieChartactive = this.pieChartactive.splice(0,10);
        // this.pieChart = {
        //   chartType: 'PieChart',
        //   dataTable:this.datatable,
        //   //firstRowIsData: true,
        //   options: {'Country': 'Cases'},
        // };

        // For Bar chart
        this.barChartLabels = this.pieChartLabels;
        this.barChartRecoverd = this.pieChartRecoverd.splice(1,10);
        this.barChartDeath = this.pieChartDeath.splice(1,10);
        this.barChartData = [
          { data: this.pieChartData,
            label :  'Total cases'
          },
          {
            data : this.pieChartactive,
            label : 'Active cases',
          },
          {
            data : this.barChartRecoverd,
            label : 'Recovered'
          },
          {
            data : this.barChartDeath,
            label : 'Death'
          }
        ];
        //this.datatable.splice(1, 1);
      this.ready = true;
      })
      
     
    }
  
    ngOnInit(): void {
      this.dataServise.getCountryData().subscribe(data => {
        this.data = data['Global']
        console.log(this.data);
        this.cases = this.data['TotalConfirmed']
        this.active = this.data['TotalConfirmed'] - this.data['TotalDeaths'] - this.data['TotalRecovered']; 
        this.deaths = this.data['TotalDeaths']
        this.recovered = this.data['TotalRecovered'] 
    });
    this.initChart();
    
  }

}
