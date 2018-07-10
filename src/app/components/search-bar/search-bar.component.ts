import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchInput: string;
  selectedCode: string;
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
  }

  search(){
    this.communicationService.sendCode(this.searchInput, this.selectedCode);  
  }
}
