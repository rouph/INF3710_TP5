import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";
import { RoomComponent } from "./room/room.component";
import { ProprioAnimalComponent } from "./proprio-animal/proprio-animal.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "room", component: RoomComponent },
  { path: "clinique", component: CliniqueVetComponent },
  { path: "proprio", component: ProprioAnimalComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
