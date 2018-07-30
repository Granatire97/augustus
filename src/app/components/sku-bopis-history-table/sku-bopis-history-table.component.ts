import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuBopisHistoryEntry } from '../../models/skuBopisHistoryEntry.model';
import { MatTableDataSource, MatSort} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-sku-bopis-history-table',
  templateUrl: './sku-bopis-history-table.component.html',
  styleUrls: ['./sku-bopis-history-table.component.css']
})
export class SkuBopisHistoryTableComponent implements OnInit {
  show: boolean = false;
  searchResults: any = {"productType":"", "productCode":"", "location":""};
  infoFound: boolean;
  realDataSource = new MatTableDataSource<SkuBopisHistoryEntry>();
  dataSource: MatTableDataSource<SkuBopisHistoryEntry>;
  displayedColumns = ['location','sku', 'atsqty', 'isaqty',  'time'];
  lines: number = 0;
  @ViewChild(MatSort) sort: MatSort;
  mode: string;

  constructor(private candyJarService: CandyJarService,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) {
    route.paramMap.subscribe(params => {
      this.searchResults = params["params"];
      if(this.searchResults["type"] === "SKU"){
        this.mode = this.route.snapshot.url[0]["path"];
        const location = this.mode === 'store' ? this.route.snapshot.params["location"] : '0';
        this.populateTable(location,this.searchResults["code"]);
      } else if(this.searchResults["type"] === "UPC"){
        this.mode = this.route.snapshot.url[0]["path"];
        const location = this.mode === 'store' ? this.route.snapshot.params["location"] : '0';
        this.candyJarService.getSkuByUpc(this.searchResults["code"]).subscribe(stream => {
          const sku = stream["sku"];
          this.populateTable(location, sku);
        });
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
      this.realDataSource.data = this.realDataSource.data.concat(this.dataSource.data.slice(this.lines,this.lines + 20));
      this.lines += 20;
      }
    }

  ngOnInit() {
    this.realDataSource.sort = this.sort;
  }

  populateTable(location: string, sku: string){
    this.show = false;
    sku = sku.trim();
    location = location.trim();
    this.candyJarService.getSkuBopisHistory(location, sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuBopisHistoryEntry>(stream);
      this.dataSource.sort = this.sort;
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.realDataSource.sort = this.sort;
      if (this.dataSource.data.length != 0){
        this.show = true; 
        this.lines = 20;
        this.realDataSource.data  = this.dataSource.data.slice(0,this.lines);
      }
    });
  }

  export(){
    const filename = "Product_Info_Table_" + this.searchResults["productType"] + "_" + this.searchResults["productCode"];
    this.utilityService.exportToCSV(this.dataSource.data, filename, true)
  }
}
