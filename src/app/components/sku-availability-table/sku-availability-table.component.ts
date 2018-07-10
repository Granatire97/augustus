import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuAvailableEntry } from '../../models/skuAvailableEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-sku-availability-table',
  templateUrl: './sku-availability-table.component.html',
  styleUrls: ['./sku-availability-table.component.css']
})
export class SkuAvailabilityTableComponent implements OnInit {
  dataSource: MatTableDataSource<SkuAvailableEntry>;
  displayedColumns = ['sku', 'storeNumber', 'quantity', 'inventoryStatus', 'time'];
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
    this.candyJarService.getSkuAvailableQuantity(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuAvailableEntry>(stream);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    });
  }

}
