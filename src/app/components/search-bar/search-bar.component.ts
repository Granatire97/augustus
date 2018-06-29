import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
  }

  search(sku: string){
    this.communicationService.sendSku(sku);
  }

}
