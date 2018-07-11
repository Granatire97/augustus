import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { SkuHistoryEntry } from '../../models/skuHistoryEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sku-history-table',
  templateUrl: './sku-history-table.component.html',
  styleUrls: ['./sku-history-table.component.css']
})
export class SkuHistoryTableComponent implements OnInit {
  show: boolean = false;
  showError: boolean = false;
  infoFound: boolean;
  historyError: boolean = false;
  dataSource: MatTableDataSource<SkuHistoryEntry>;
  displayedColumns = ['sku', 'location', 'atsqty', 'time'];
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
    this.candyJarService.getSkuHistory(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuHistoryEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length == 0){
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