import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Traitement } from '../../../../common/tables/Traitement';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }
  public traitements: Traitement[] = [];


  public duplicateError: boolean = false;


  ngOnInit() {
  }
  public getTraitements(): void {
    this.communicationService.getTraitements().subscribe((traitements: Traitement[]) => {
        this.traitements = traitements;
    });
}
  public insertTraitement(noTraitement: string,description:string, cout: number): void {
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
