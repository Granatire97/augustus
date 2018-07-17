import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuHistoryEntry } from '../../models/skuHistoryEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute } from '@angular/router';
import { EsbInventoryService } from '../../services/esb-inventory.service';

@Component({
  selector: 'app-sku-history-table',
  templateUrl: './sku-history-table.component.html',
  styleUrls: ['./sku-history-table.component.css']
})
export class SkuHistoryTableComponent implements OnInit {
  show: boolean = false;
  infoFound: boolean;
  isHome: boolean;
  dataSource: MatTableDataSource<SkuHistoryEntry>;
  displayedColumns = ['sku', 'atsqty', 'time'];
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
      }
    })
    const type = this.route.snapshot.paramMap.get('type');
    const code = this.route.snapshot.paramMap.get('code');
    if(type == "SKU" && code != null){
      this.populateTable(code);
    } else {
      this.dataSource = null;
      this.show = false;
    }

    this.route.url.subscribe(url => {
      if(url[0]["path"] === "home"){
        this.show = false;
        this.isHome = true;
      }
    });
  }

  populateTable(sku: string){
    this.show = false;
    sku = sku.trim();
    this.candyJarService.getSkuHistory(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuHistoryEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length != 0){
        this.show = true && !this.isHome;
      }
    });
  }
}