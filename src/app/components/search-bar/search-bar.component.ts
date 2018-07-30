import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  errorMessage: string;
  errorType: string;
  searchForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
    selectedCode: new FormControl('', [Validators.required]),
    locationInput: new FormControl({value: '', disabled: true}),
    selectedSearchMode: new FormControl('Network Inventory', [Validators.required]),
  });
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  searchMode: string[] = ['Network Inventory', 'Store Inventory'];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.paramMap.subscribe(params => {
      switch(this.route.snapshot.url[0]["path"]){
        case "home":
          this.clear();
          break;
        case "store":
        this.searchForm.setValue({
          "searchInput": params["params"]["code"].toUpperCase(),
          "selectedCode": params["params"]["type"],
          "locationInput": params["params"]["location"] || "",
          "selectedSearchMode": 'Store Inventory'
        });
        break;
        case "network":
        this.searchForm.setValue({
          "searchInput": params["params"]["code"].toUpperCase(),
          "selectedCode": params["params"]["type"],
          "locationInput": params["params"]["location"] || "",
          "selectedSearchMode": 'Network Inventory'
        });
        break;
        case "error":
        this.searchForm.setValue({
          "searchInput": params["params"]["code"].toUpperCase(),
          "selectedCode": params["params"]["type"],
          "locationInput": params["params"]["location"] || "",
          "selectedSearchMode": params["params"]["mode"] == 'network' ? 'Network Inventory' : 'Store Inventory'
        });
         
      }
      this.setMode();
    });
  }

  ngOnInit() {}

  clear(){

    this.searchForm.setValue({
      "searchInput": "",
      "selectedCode": "",
      "locationInput": "",
      "selectedSearchMode": this.searchForm.get("selectedSearchMode").value
    });
  }

  onSubmit(){
    const code = this.searchForm.get("searchInput").value.toUpperCase().trim();
    const type = this.searchForm.get("selectedCode").value.trim();
    const location = this.searchForm.get("locationInput").value.trim();
    const mode = this.searchForm.get("selectedSearchMode").value == 'Network Inventory' ? 'network' : 'store';
    if(this.validateInput(mode, type, code, location)){
      this.router.navigate([mode, type, code, location]);
    } else if (this.searchForm.get("selectedCode").hasError('required')){
      this.errorType = "selectanidentifier";
      this.router.navigate(['error', this.errorType, mode, type, code, location]);
    }

  }

  validateInput(mode: string, type: string, code: string, location: string){
    if(code === "" && type === ""){
      return false;
    }  
    if(!location.match(/^[0-9]+$/) && mode == 'store'){
      this.errorType = "location";
      this.router.navigate(['error', this.errorType, mode, type, code, location]);
      return false;
    }
    switch(type){
      case "eCode":
        if(code.length >= 10 && code.length <= 40 && code.match(/^[0-9a-zA-Z]+$/)){
          return true;
        } else {
          this.errorType = "ecode";
          this.router.navigate(['error', this.errorType, mode, type, code, location]);
          return false;
        }
      case "Style":
        if(code.match(/^[0-9a-zA-Z-_.&:?^,@#$%^&*()]+$/)){
          return true;
        } else {
          this.errorType = "style";
          this.router.navigate(['error', this.errorType, mode, type, code, location]);
          return false;
        }
      case "SKU":
        if(code.length >= 8 && code.length <= 9 && code.match(/^[0-9]+$/)){
          return true;
        }
        else {
          this.errorType = "sku";
          this.router.navigate(['error', this.errorType, mode, type, code, location]);
          return false;
        }
      case "UPC":
        if(code.match(/^[0-9]+$/)){
          return true;
        }else {
          this.errorType = "upc";
          this.router.navigate(['error', this.errorType, mode, type, code, location]);
          return false;
        } 
    }
    return false;
  }

  setMode(){
    if(this.searchForm.get("selectedSearchMode").value === "Store Inventory"){
      this.searchForm.get("locationInput").enable();
      this.searchForm.get("locationInput").setValidators(Validators.required);
    } else {
      this.searchForm.get("locationInput").disable();
      this.searchForm.get("locationInput").clearValidators();
    }
  }

}
