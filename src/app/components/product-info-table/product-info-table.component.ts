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
  dataSource: MatTableDataSource<productInfoEntry>;
  
  filters: {"presale": "", "hotmarket": "", "specialOrder": "", "vdceligible": ""};
  displayedColumns = ['ecode', 'style', 'sku', 'upc', 'supc', 'description', 'presale', 'presaleEndDate', 'hotMarket', 'hotMarketEndDate', 'specialOrder', 'vdceligible'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private candyJarService: CandyJarService, 
    private communicationService: CommunicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showError = false;
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
    }
    
  }


  populateTable(code: string, type: string){
    this.showError = false;
    this.show = true;
    code = code.trim();
    this.candyJarService.getProductInfoEntry(code, type).subscribe(stream => {
      this.dataSource = new MatTableDataSource<productInfoEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length == 0){
        this.communicationService.infoFound(false);
        this.showError = true; 
      } else {
        this.communicationService.infoFound(true);
        this.showError = false;
        this.dataSource.filterPredicate = this.createFilter();
        this.communicationService.currentFilters.subscribe(filters => {
          console.log(this.filters);
          console.log(filters);
          this.filters = filters;
          this.dataSource.filter = JSON.stringify(this.filters);
          console.log(this.dataSource.filter);
        })
      }
    });
    
    
    
  }
  createFilter() {
    var flags = [];
    let filterFunction = function(data, filter) : boolean {
      let searchTerms = JSON.parse(filter)
      for(var key in searchTerms){
            if(data[key] != null){
              if(searchTerms[key] === "All" || searchTerms[key].length === 0 || searchTerms[key] === ""){
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