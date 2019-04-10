import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";
import { EmployeComponent } from "./employe/employe.component";
import { ProprioAnimalComponent } from "./proprio-animal/proprio-animal.component";
import { RoomComponent } from "./room/room.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "room", component: RoomComponent },
  { path: "employe", component: EmployeComponent },
  { path: "clinique", component: CliniqueVetComponent },
  { path: "proprio", component: ProprioAnimalComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
