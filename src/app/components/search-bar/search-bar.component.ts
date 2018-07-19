import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string;
  searchInput = new FormControl('', [Validators.required]);
  selectedCode = new FormControl('', [Validators.required]);
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  searchAttempted: boolean = false;

  
  constructor(
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type != null && code != null){
      this.searchInput.setValue(code);
      this.selectedCode.setValue(type);
    }
  }

  search(){
    this.showError = false;
    this.searchAttempted = true;
    if(this.validateInput(this.searchInput.value.trim(), this.selectedCode.value.trim())){
      this.router.navigate(['info', this.selectedCode.value, this.searchInput.value]);
      this.communicationService.updateCode(this.searchInput.value, this.selectedCode.value);
    } 
    
  }

  validateInput(code: string, type: string){
    if(code === "" && type === ""){
      return false;
    }    
    switch(type){
      case "eCode":
        if(code.length >= 10 && code.match(/^[0-9a-zA-Z]+$/)){
          return true;
        } else {
          this.errorMessage = "eCodes should be at least 10 characters and contain only letters and numbers.";
          this.showError = true;
          return false;
        }
      case "Style":
        if(code.match(/^[0-9a-zA-Z-_.&:?^,@#$%^&*()]+$/)){
          return true;
        } else {
          this.errorMessage = "The style you inputted is invalid.";
          this.showError = true;
          return false;
        }
      case "SKU":
        if(code.length >= 8 && code.length <= 9 && code.match(/^[0-9]+$/)){
          return true;
        }
        else {
          this.errorMessage = "SKUs should be between 8-9 character and contain only numbers.";
          this.showError = true;
          return false;
        }
      case "UPC":
        if(code.match(/^[0-9]+$/)){
          return true
        }else {
          this.errorMessage = "UPCs should only contain numbers.";
          this.showError = true;
          return false;
        } 
    }
    return false;
  }


}
