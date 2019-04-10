import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Proprio } from '../../../../common/tables/Proprio';

@Component({
  selector: 'app-proprio-animal',
  templateUrl: './proprio-animal.component.html',
  styleUrls: ['./proprio-animal.component.css']
})
export class ProprioAnimalComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }
  public proprios: Proprio[] = [];


  public duplicateError: boolean = false;


  ngOnInit() {
  }
  public getCliniques(): void {
    this.communicationService.getCliniques().subscribe((proprios: Proprio[]) => {
        this.proprios = proprios;
    });
}
  public insertProprio(noProprietaire: string,nom:string, adresse: string, telNumber: string): void {
    const proprio: any = {
        "noProprietaire" : noProprietaire,
        "nom" : nom,
        "adresse" : adresse,
        "telNumber" : telNumber,
    };
    this.communicationService.inserProprio(proprio).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }


}
