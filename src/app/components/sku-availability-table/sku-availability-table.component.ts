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
  isHome: boolean;
  infoFound: boolean;
  dataSource: MatTableDataSource<SkuAvailableEntry>;
  displayedColumns = ['sku', 'quantity', 'inventoryStatus', 'time'];
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
    this.candyJarService.getSkuAvailableQuantity(sku).subscribe(stream => {
      this.dataSource = new MatTableDataSource<SkuAvailableEntry>(stream);
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length != 0){
        this.show = true && !this.isHome;
      } 
    });
  }

}
