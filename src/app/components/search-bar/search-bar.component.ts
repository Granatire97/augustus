import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  errorMessage: string;
  errorType: string;
  searchInput = new FormControl('', [Validators.required]);
  selectedCode = new FormControl('', [Validators.required]);
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  searchAttempted: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.paramMap.subscribe(params => {
      if(this.route.snapshot.url[0]["path"] == "home"){
        this.clear();
      } else {
        this.searchInput.setValue(params["params"]["code"].toUpperCase());
        this.selectedCode.setValue(params["params"]["type"]);
      }
    })
  }

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type != null && code != null){
      this.searchInput.setValue(code.toUpperCase());
      this.selectedCode.setValue(type);
    }
  }

  clear(){
    this.searchInput.setValue("");
    this.selectedCode.setValue("");
  }

  search(){
    this.searchAttempted = true;

    if(this.validateInput(this.searchInput.value.toUpperCase().trim(), this.selectedCode.value.trim())){
      this.router.navigate(['info', this.selectedCode.value, this.searchInput.value.toUpperCase()]);
    }

    if (this.selectedCode.hasError('required')){
      this.errorType = "selectanidentifier";
      this.router.navigate(['error', this.errorType, this.selectedCode.value, this.searchInput.value.toUpperCase()]);
    }

  }

  validateInput(code: string, type: string){
    if(code === "" && type === ""){
      return false;
    }   
    switch(type){
      case "eCode":
        if(code.length >= 10 && code.length <= 40 && code.match(/^[0-9a-zA-Z]+$/)){
          return true;
        } else {
          this.errorType = "ecode";
          this.router.navigate(['error', this.errorType, this.selectedCode.value, this.searchInput.value.toUpperCase()]);
          return false;
        }
      case "Style":
        if(code.match(/^[0-9a-zA-Z-_.&:?^,@#$%^&*()]+$/)){
          return true;
        } else {
          this.errorType = "style";
          this.router.navigate(['error', this.errorType, this.selectedCode.value, this.searchInput.value.toUpperCase()]);
          return false;
        }
      case "SKU":
        if(code.length >= 8 && code.length <= 9 && code.match(/^[0-9]+$/)){
          return true;
        }
        else {
          this.errorType = "sku";
          this.router.navigate(['error', this.errorType, this.selectedCode.value, this.searchInput.value]);
          return false;
        }
      case "UPC":
        if(code.match(/^[0-9]+$/)){
          return true;
        }else {
          this.errorType = "upc";
          this.router.navigate(['error', this.errorType, this.selectedCode.value, this.searchInput.value]);
          return false;
        } 
    }
    return false;
  }


}
