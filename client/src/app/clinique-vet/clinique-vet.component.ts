import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-clinique-vet',
  templateUrl: './clinique-vet.component.html',
  styleUrls: ['./clinique-vet.component.css']
})
export class CliniqueVetComponent implements OnInit {

  
  ngOnInit() {
  }
  public constructor(private communicationService: CommunicationService) { }


  public duplicateError: boolean = false;

  public insertClinique(cliniqueNumber: string, adresse: string, telNumber: string, faxNumber: string): void {
    const clinique: any = {
        "cliniqueNumber" : cliniqueNumber,
        "adresse" : adresse,
        "telNumber" : telNumber,
        "faxNumber" : faxNumber,
    };
    this.communicationService.insertHotel(clinique).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
