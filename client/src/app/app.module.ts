import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CliniqueVetComponent } from "./clinique-vet/clinique-vet.component";
import { CommunicationService } from "./communication.service";
import { RoomComponent } from "./room/room.component";

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    CliniqueVetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
