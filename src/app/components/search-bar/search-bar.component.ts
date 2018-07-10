import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchInput: string;
  selectedCode: string;
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  constructor(
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type != null && code != null){
      this.searchInput = code;
      this.selectedCode = type;
    }
  }

  search(){
    this.router.navigate(['info', this.selectedCode, this.searchInput])
    this.communicationService.sendCode(this.searchInput, this.selectedCode);  
  }
}
