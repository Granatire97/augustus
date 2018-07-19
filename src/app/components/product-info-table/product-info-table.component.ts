import { Component, OnInit, ViewChild} from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { productInfoEntry } from '../../models/productInfoEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-product-info-table',
  templateUrl: './product-info-table.component.html',
  styleUrls: ['./product-info-table.component.css']
})
export class ProductInfoTableComponent implements OnInit {
  show: boolean = false;
  showError: boolean = false;
  isHome: boolean;
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
    private communicationService: CommunicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showError = false;
    this.filters = {"presale": "", "hotmarket": "", "specialOrder": "", "vdceligible": ""};
    const codeTypes = ['eCode', 'Style', 'SKU', 'UPC'];
    this.communicationService.currentCode.subscribe(result => {
      if(codeTypes.indexOf(result["productType"]) != -1){
        this.populateTable(result["productCode"], result["productType"]);
      }
    });
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type != null && code != null){
      this.populateTable(code, type);
    } else {
      this.dataSource = null;
      this.show = false;
      this.showError = false;
    }
    this.route.url.subscribe(url => {
      this.showError = false;
      if(url[0]["path"] === "home"){
        this.isHome = true;
        this.show = false;
      }
    });
  }


  populateTable(code: string, type: string){
    this.clear();
    this.showError = false;
    this.show = false;
    code = code.trim();
    this.candyJarService.getProductInfoEntry(code, type).subscribe(stream => {
      this.dataSource = new MatTableDataSource<productInfoEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length == 0){
        this.showError = true && !this.isHome; 
      } else {
        this.show = true && !this.isHome;
        this.showError = false; 
      }
    });
  }

  applyFilter(filter: string, value: string){
    console.log(value);
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
}