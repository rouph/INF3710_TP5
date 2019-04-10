import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Clinique } from '../../../../common/tables/Clinique';

@Component({
  selector: 'app-clinique-vet',
  templateUrl: './clinique-vet.component.html',
  styleUrls: ['./clinique-vet.component.css']
})
export class CliniqueVetComponent implements OnInit {
  public constructor(private communicationService: CommunicationService) { }
  public cliniques: Clinique[] = [];


  public duplicateError: boolean = false;


  ngOnInit() {
  }
  public getCliniques(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) => {
        this.cliniques = cliniques;
    });
  }
  public insertClinique(cliniqueNumber: string,cliniqueName:string, adresse: string, telNumber: string, faxNumber: string): void {
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
