import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuHistoryEntry } from '../../models/skuHistoryEntry.model';
import { MatTableDataSource} from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-sku-history-table',
  templateUrl: './sku-history-table.component.html',
  styleUrls: ['./sku-history-table.component.css']
})
export class SkuHistoryTableComponent implements OnInit {
  show: boolean = false;
  searchResults: any = {"productType":"", "productCode":""};
  infoFound: boolean;
  dataSource: MatTableDataSource<SkuHistoryEntry>;
  displayedColumns = ['sku', 'atsqty', 'time'];

  constructor(private candyJarService: CandyJarService, 
    private communicationService: CommunicationService,
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

  ngOnInit() {}

  populateTable(sku: string){
    this.show = false;
    sku = sku.trim();
    this.candyJarService.getSkuHistory(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuHistoryEntry>(stream);
      if (this.dataSource.data.length != 0){
        this.show = true;
      }
    });
  }

  export(){
    const filename = "Product_Info_Table_" + this.searchResults["productType"] + "_" + this.searchResults["productCode"];
    this.utilityService.exportToCSV(this.dataSource.data, filename, true)
  }
}