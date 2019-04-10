import { Component } from "@angular/core";
import { Proprio } from "../../../../common/tables/Proprio";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-proprio-animal",
  templateUrl: "./proprio-animal.component.html",
  styleUrls: ["./proprio-animal.component.css"]
})
export class ProprioAnimalComponent {

  public constructor(private communicationService: CommunicationService) { }
  public proprios: Proprio[] = [];
  public duplicateError: boolean = false;

  public getProprios(): void {
    this.communicationService.getProprios().subscribe((proprios: Proprio[]) => {
        this.proprios = proprios;
    });
}
  public insertProprio(noProprietaire: string, nom: string, adresse: string, telNumber: string): void {
    // tslint:disable-next-line:no-any
    const proprio: any = {
        "noProprietaire" : noProprietaire,
        "nom" : nom,
        "adresse" : adresse,
        "telNumber" : telNumber,
    };
    this.communicationService.insertProprio(proprio).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
