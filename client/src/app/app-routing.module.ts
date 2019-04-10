import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";
import { ProprioAnimalComponent } from "./proprio-animal/proprio-animal.component";
import { AnimalComponent } from "./animal/animal.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
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
