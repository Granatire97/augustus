import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
    
  errorMessage: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService
  ) { 
    route.paramMap.subscribe(params =>{
    
    if (this.route.snapshot.url[1]["path"] == "selectanidentifier")
      this.errorMessage = "Please select an identifier.";
    else if(this.route.snapshot.url[1]["path"] == "ecode") 
      this.errorMessage = "eCodes should be at least 10 characters and contain only letters and numbers.";
    else if (this.route.snapshot.url[1]["path"] == "style")
      this.errorMessage = "The style you inputted is invalid.";
    else if (this.route.snapshot.url[1]["path"] == "sku")
      this.errorMessage = "SKUs should be between 8-9 character and contain only numbers.";
    else if (this.route.snapshot.url[1]["path"] == "upc")
      this.errorMessage = "UPCs should only contain numbers.";
    else if (this.route.snapshot.url[1]["path"] == "noresults")
      this.errorMessage = "Sorry we couldn't find any results for you. Please check your input and try again :)";
    else if (this.route.snapshot.url[1]["path"] == "location")
      this.errorMessage = "Store numbers should only contain numbers and cannot be empty when using the 'Store Inventory' option";
    })
  }

  ngOnInit() {
  }

}
