import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuAvailableEntry } from '../../models/skuAvailableEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sku-availability-table',
  templateUrl: './sku-availability-table.component.html',
  styleUrls: ['./sku-availability-table.component.css']
})
export class SkuAvailabilityTableComponent implements OnInit {
  show: boolean = false;
  showError: boolean = false;
  infoFound: boolean;
  historyError: boolean = false;
  dataSource: MatTableDataSource<SkuAvailableEntry>;
  displayedColumns = ['sku', 'storeNumber', 'quantity', 'inventoryStatus', 'time'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private candyJarService: CandyJarService, 
    private communicationService: CommunicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.communicationService.currentCode.subscribe(result => {
      if(result["productType"] === "SKU"){
        this.populateTable(result["productCode"]);
      } else {
        this.dataSource = null;
        this.show = false;
        this.showError = false;
        this.historyError = false;
      }
    })

    this.communicationService.currentFound.subscribe(found => {
      this.infoFound = found;
    })
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type == "SKU" && code != null){
      this.populateTable(code);
    } else {
      this.dataSource = null;
      this.show = false;
      this.showError = false;
      this.historyError = false;
    }
  }

  populateTable(sku: string){
    this.showError = false;
    this.historyError = false;
    this.show = true;
    sku = sku.trim();
    this.candyJarService.getSkuAvailableQuantity(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuAvailableEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length == 0){
        console.log(this.infoFound);
        if(this.infoFound){
          this.historyError = true;
          this.showError = false;
        } else {
          this.showError = true;
          this.historyError = false;
        }
      } else {
        this.showError = false;
        this.historyError = false;
      }
    });
  }

}
