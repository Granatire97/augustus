import { Component, OnInit, ViewChild} from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { productInfoEntry } from '../../models/productInfoEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router} from '@angular/router';
import { UtilityService } from '../../services/utility.service';


@Component({
  selector: 'app-product-info-table',
  templateUrl: './product-info-table.component.html',
  styleUrls: ['./product-info-table.component.css']
})
export class ProductInfoTableComponent implements OnInit {
  showError: boolean = false;
  spinner: boolean = true;
  searchResults: any = {"productType":"", "productCode":""};
  dataSource: MatTableDataSource<productInfoEntry>;
  presale: string;
  hotmarket: string;
  specialOrder: string;
  vdcEligible: string;
  presaleStart: string;
  presaleEnd: string;
  hotmarketStart: string;
  hotmarketEnd: string;
  codes: string[] = ['eCode', 'Style', 'SKU', 'UPC'];
  booleanOptions: string[] = ['0', '1'];
  yesNoOptions: string[] = ['N', 'Y'];
  
  filters: {}
  displayedColumns = ['ecode', 'style', 'sku', 'upc', 'supc', 'description', 'presale', 'presaleEndDate', 'hotMarket', 'hotMarketEndDate', 'specialOrder', 'vdceligible'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private candyJarService: CandyJarService,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
    route.paramMap.subscribe(params => {
      this.searchResults = params["params"];
      this.populateTable(this.searchResults["code"], this.searchResults["type"]);
    })
  }

  ngOnInit() {
    this.filters = {"presale": "", "hotmarket": "", "specialOrder": "", "vdceligible": ""};
    const codeTypes = ['eCode', 'Style', 'SKU', 'UPC'];
  }

  populateTable(code: string, type: string){
    this.spinner = true;
    this.clear();
    this.showError = false;
    code = code.trim();
    this.candyJarService.getProductInfoEntry(code, type).subscribe(stream => {
      this.dataSource = new MatTableDataSource<productInfoEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length == 0){
        this.showError = true;
      } else {
        this.showError = false;   
      }
      this.spinner = false;
    });
  }

  applyFilter(filter: string, value: string){
    this.dataSource.filterPredicate = this.createFilter();
    this.filters[filter] = value;
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  clear(){
    this.presale = "";
    this.hotmarket = "";
    this.specialOrder = "";
    this.vdcEligible = "";
    this.presaleStart = "";
    this.presaleEnd = "";
    this.hotmarketStart = "";
    this.hotmarketEnd = "";
  }

  createFilter() {
    var flags = [];
    let filterFunction = function(data, filter) : boolean {
      let searchTerms = JSON.parse(filter)
      for(var key in searchTerms){
            if(data[key] != null){
              if(searchTerms[key] === "Any" || searchTerms[key].length === 0 || searchTerms[key] === ""){
                flags.push(true);
              } else {
                flags.push(data[key].toString().indexOf(searchTerms[key]) != -1);
              }
            
        } 
    }
      var result = true;
      var i;
      for (i = 0; i < flags.length; i++){
        result = result && flags[i];
      }    
      return result;
    }
    return filterFunction
  }

  export(){
    const filename = "Product_Info_Table_" + this.searchResults["productType"] + "_" + this.searchResults["productCode"];
    this.utilityService.exportToCSV(this.dataSource.data, filename, true)
  }

}