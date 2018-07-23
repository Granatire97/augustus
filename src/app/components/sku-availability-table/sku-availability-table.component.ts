import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuAvailableEntry } from '../../models/skuAvailableEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-sku-availability-table',
  templateUrl: './sku-availability-table.component.html',
  styleUrls: ['./sku-availability-table.component.css']
})
export class SkuAvailabilityTableComponent implements OnInit {
  show: boolean = false;
  searchResults: any = {"productType":"", "productCode":""};
  infoFound: boolean;
  realDataSource: any[] = [];
  dataSource: MatTableDataSource<SkuAvailableEntry>;
  displayedColumns = ['sku', 'quantity', 'inventoryStatus', 'time'];
  lines: number = 0;

  constructor(
    private candyJarService: CandyJarService, 
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
    route.paramMap.subscribe(params => {
      this.searchResults = params["params"];
      if(this.searchResults["type"] === "SKU"){
        this.populateTable(this.searchResults["code"]);
      } else {
        this.dataSource = null;
        this.show = false;
      }
    });
  }

  onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    
    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer; 
    if (scrollLocation > limit) {
    this.realDataSource = this.realDataSource.concat(this.dataSource.data.slice(this.lines,this.lines + 20));
    this.lines += 20;
    }
  }

  ngOnInit() {}

  populateTable(sku: string){
    this.show = false;
    sku = sku.trim();
    this.candyJarService.getSkuAvailableQuantity(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuAvailableEntry>(stream);
      if (this.dataSource.data.length != 0){
        this.show = true; 
        this.lines = 20;
        this.realDataSource =  this.dataSource.data.slice(0,this.lines); 
      } 
    });
  }

  export(){
    const filename = "Product_Info_Table_" + this.searchResults["productType"] + "_" + this.searchResults["productCode"];
    this.utilityService.exportToCSV(this.dataSource.data, filename, true)
  }

}
