import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";

import { AnimalComponent } from "./animal/animal.component";
import { EmployeComponent } from "./employe/employe.component";
import { ProprioAnimalComponent } from "./proprio-animal/proprio-animal.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "employe", component: EmployeComponent },
  { path: "app", component: AppComponent },
  { path: "clinique", component: CliniqueVetComponent },
  { path: "proprio", component: ProprioAnimalComponent },
  { path: "animals", component: AnimalComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
