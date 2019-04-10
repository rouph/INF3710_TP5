import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.css"]
})
export class EmployeComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }
  public duplicateError: boolean = false;
  public cliniquesNo: string[];
  ngOnInit() {
    this.getCliniques();
  }

  public getCliniques(): void {
    this.communicationService.getCliniquesNumber().subscribe((cliniques: string[]) => {
        this.cliniquesNo = cliniques;
    });
  }
  insertClinique(noEmploye: string, nom: string, adresse: string,
                 dob: string, sex: string, tellNum: string, NAS: string, salaire: string
                , fonction: string, noClinique: string) {
            const employe: any = {
              "noEmploye" : noEmploye,
              "nom" : nom,
              "adresse" : adresse,
              "dob" : dob,
              "sex" : sex,
              "tellNum" : tellNum,
              "NAS" : NAS,
              "salaire" : salaire,
              "fonction" : fonction,
              "noClinique" : noClinique
          };
            this.communicationService.insertEmploye(employe).subscribe((res: number) => {
              if (res > 0) {
                  this.communicationService.filter("update");
              }
              this.duplicateError = (res === -1);
          });
    }
}
