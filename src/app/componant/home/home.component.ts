import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';
import { GlobalData } from 'src/app/model/globa-data';
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
    pieChart: GoogleChartInterface ={
      chartType : 'PieChart'
    };

    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public barChartOptions: ChartOptions = {
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

  public barChartLabels= [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData= [];


     initChart(){
      this.dataServise.getAllData().subscribe(result =>{
        this.datatable = [];
        this.datatable.push(["Country","Cases"])
        console.log(this.data)

        this.data.forEach(ce=>{
          // this.datatable.push([ce.country,ce.cases])
          // console.log(ce.country);
          this.pieChartLabels.push(ce.country)
          this.pieChartData.push(ce.cases)
          this.pieChartactive.push(ce.active)
          this.pieChartDeath.push(ce.deaths)
          this.pieChartRecoverd.push(ce.recovered)
        })
        // For Pie chart
        this.pieChartData = this.pieChartData.splice(1, 10);
        this.pieChartLabels = this.pieChartLabels.splice(1, 10);
        this.pieChartactive = this.pieChartactive.splice(1,10);
        this.pieChart = {
          chartType: 'PieChart',
          dataTable:this.datatable,
          //firstRowIsData: true,
          options: {'Country': 'Cases'},
        };

        // For Bar chart
        this.barChartLabels = this.pieChartLabels;
        this.pieChartRecoverd = this.pieChartRecoverd.splice(1,10);
        this.pieChartDeath = this.pieChartDeath.splice(1,10);
        this.barChartData = [
          { data: this.pieChartData,
            label :  'Total cases'
          },
          {
            data : this.pieChartactive,
            label : 'Active cases',
          },
          {
            data : this.pieChartRecoverd,
            label : 'Recovered'
          },
          {
            data : this.pieChartDeath,
            label : 'Death'
          }
        ];
        //this.datatable.splice(1, 1);
      this.ready = true;
      })
      
     
    }
  
    ngOnInit(): void {
      this.dataServise.getAllData().subscribe(data => {
        this.data = data
        console.log(this.data[0]);
        this.cases = this.data[0]['cases']
        this.active = this.data[0]['active']
        this.deaths = this.data[0]['deaths']
        this.recovered = this.data[0]['recovered'] 
    });
    this.initChart();
    
  }

}
