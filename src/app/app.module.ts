import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componant/navbar/navbar.component';
import { HomeComponent } from './componant/home/home.component';
import { CountriesComponent } from './componant/countries/countries.component';
import {HttpClientModule} from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    NgChartjsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
