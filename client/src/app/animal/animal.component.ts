import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Traitement, TraitementFFK } from "../../../../common/tables/Traitement";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent implements OnInit {
  public propriosNo: string[];
  public cliniquesNo: string[];
  public duplicateError: boolean = false;
  public animals: Animal[] = [];
  public animalsFN: Animal[] = [];
  public traitements: TraitementFFK[] = [];
  public facture: Traitement[] = [];

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    this.getPropritaireNo();
    this.getCliniques();
    this.getAnimals();
  }

  public getPropritaireNo(): void {
    this.communicationService.getProprietaireNo().subscribe((propriosNo: string[]) => {
        this.propriosNo = propriosNo;
    });
  }
  public getCliniques(): void {
    this.communicationService.getCliniquesNumber().subscribe((cliniques: string[]) => {
        this.cliniquesNo = cliniques;
    });
  }

  public insertAnimal(noAnimal: string, nom: string, type: string, description: string,
                      dob: string, date_inscription: string, etat: string,
                      noProprio: string, noClinique: string): void {
    // tslint:disable-next-line:no-any
    const animal: any = {
        "noAnimal" : noAnimal,
        "nom" : nom,
        "type" : type,
        "description" : description,
        "dob" : dob,
        "date_inscription" : date_inscription,
        "etat" : etat,
        "noProprio" : noProprio,
        "noClinique" : noClinique,
    };
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
            this.getAnimals();
        }
        this.duplicateError = (res === -1);
    });
    
  }

  public getAnimals(): void {
    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
        this.animals = animals;
    });
  }

  public getAnimalsFromName(nom: string): void {
    this.communicationService.getAnimalsFromName(nom).subscribe((animalsFN: Animal[]) => {
        this.animalsFN = animalsFN;
    });
  }

  public getTraitementsFFK(noAnimal: string, noClinique: string): void {
    this.communicationService.getTraitementsFFK(noAnimal, noClinique).subscribe((traitement: TraitementFFK[]) => {
        this.traitements = traitement;
    });
  }
  public getFacture(noAnimal: string, noClinique: string): void {
    this.communicationService.getFacture(noAnimal, noClinique).subscribe((traitement: Traitement[]) => {
        this.facture = traitement;
    });
  }

  public delete(noAnimal: string, noClinique: string): void {
    this.communicationService.deleteAnimal(noAnimal, noClinique).subscribe((traitement: any) => {
        this.getAnimals();
    });
  }
  public updateAnimal(noAnimal: string, noClinique: string, nom:string, desc:string, etat: string): void {
    this.communicationService.updateAnimal(noAnimal, noClinique, nom, desc, etat).subscribe((traitement: any) => {
        this.getAnimals();
    });
  }
}
