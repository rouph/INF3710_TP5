import { Component } from "@angular/core";
import { Clinique } from "../../../../common/tables/Clinique";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-clinique-vet",
  templateUrl: "./clinique-vet.component.html",
  styleUrls: ["./clinique-vet.component.css"]
})
export class CliniqueVetComponent {
  public constructor(private communicationService: CommunicationService) { }
  public cliniques: Clinique[] = [];

  public duplicateError: boolean = false;

  public getCliniques(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) => {
        this.cliniques = cliniques;
    });
  }
  public insertClinique(cliniqueNumber: string, cliniqueName: string, adresse: string, telNumber: string, faxNumber: string): void {
    // tslint:disable-next-line:no-any
    const clinique: any = {
        "cliniqueNumber" : cliniqueNumber,
        "cliniqueName" : cliniqueName,
        "adresse" : adresse,
        "telNumber" : telNumber,
        "faxNumber" : faxNumber,
    };
    this.communicationService.insertClinique(clinique).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
