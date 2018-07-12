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
  
  filters: {presale: '', hotmarket: '', specialOrder: '', vdceligible: ''};
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
          this.filters = filters;
          console.log(filters);
          this.dataSource.filter = JSON.stringify(this.filters);
        })
      }
    });
    
    
    
  }
  createFilter() {
    let filterFunction = function(data, filter) : boolean {
      let searchTerms = JSON.parse(filter)
      return data['presale'].toString().indexOf(searchTerms['presale']) != -1 &&
      data['vdceligible'].toString().indexOf(searchTerms['vdceligible']) != -1 
          
    }
    return filterFunction
  }
}