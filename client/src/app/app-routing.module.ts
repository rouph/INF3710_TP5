import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";

import { AnimalComponent } from "./animal/animal.component";
<<<<<<< HEAD
import { TraitementComponent } from "./traitement/traitement.component";
=======
import { EmployeComponent } from "./employe/employe.component";
import { ProprioAnimalComponent } from "./proprio-animal/proprio-animal.component";
>>>>>>> ba09867efdcadb77cd1104232654824add889ca6

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "employe", component: EmployeComponent },
  { path: "app", component: AppComponent },
  { path: "clinique", component: CliniqueVetComponent },
  { path: "proprio", component: ProprioAnimalComponent },
  { path: "animals", component: AnimalComponent },
  { path: "traitement", component: TraitementComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
