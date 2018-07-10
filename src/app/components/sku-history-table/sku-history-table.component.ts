import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuHistoryEntry } from '../../models/skuHistoryEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-sku-history-table',
  templateUrl: './sku-history-table.component.html',
  styleUrls: ['./sku-history-table.component.css']
})
export class SkuHistoryTableComponent implements OnInit {
  dataSource: MatTableDataSource<SkuHistoryEntry>;
  displayedColumns = ['sku', 'location', 'atsqty', 'time'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private candyJarService: CandyJarService, private communicationService: CommunicationService) {}

  ngOnInit() {
    this.communicationService.change.subscribe(result => {
      if(result["productType"] === "SKU"){
        this.populateTable(result["productCode"]);
      } else {
        this.dataSource = null;
      }
    })
  }

  populateTable(sku: string){
    sku = sku.trim();
    this.candyJarService.getSkuHistory(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuHistoryEntry>(stream);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    });
  }
}