import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  public propriosNo: string[];
  public cliniquesNo: string[];
  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getPropritaireNo();
    this.getCliniques();
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
}
