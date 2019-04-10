import { Component } from "@angular/core";
import { Traitement } from "../../../../common/tables/Traitement";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-traitement",
  templateUrl: "./traitement.component.html",
  styleUrls: ["./traitement.component.css"]
})
export class TraitementComponent {

  public constructor(private communicationService: CommunicationService) { }
  public traitements: Traitement[] = [];
  public duplicateError: boolean = false;

  public getTraitements(): void {
    this.communicationService.getTraitements().subscribe((traitements: Traitement[]) => {
        this.traitements = traitements;
    });
}
  public insertTraitement(noTraitement: string, description: string, cout: number): void {
    // tslint:disable-next-line:no-any
    const traitement: any = {
        "noTraitement" : noTraitement,
        "description" : description,
        "cout" : cout,
    };
    this.communicationService.insertTraitement(traitement).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
