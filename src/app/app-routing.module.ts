import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componant/home/home.component';
import { CountriesComponent } from './componant/countries/countries.component';


const routes: Routes = [
  {path : '' ,component : HomeComponent},
  {path : "Countries" ,component : CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
