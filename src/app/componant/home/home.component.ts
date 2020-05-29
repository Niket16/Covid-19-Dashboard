import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';
import { GlobalData } from 'src/app/model/globa-data';
import { GoogleChartInterface } from 'ng2-google-charts';

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


    

     initChart(){
      this.dataServise.getAllData().subscribe(result =>{
        this.datatable = [];
        this.datatable.push(["Country","Cases"])
        console.log(this.data)

        this.data.forEach(ce=>{
          this.datatable.push([ce.country,ce.cases])
          console.log(ce.country);
        })
      console.log(this.datatable);
      })
      console.log(this.datatable);  
      this.pieChart = {
        chartType: 'PieChart',
        dataTable:this.datatable,
        //firstRowIsData: true,
        options: {'Country': 'Cases'},
      };
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
