import { Component, OnInit, ViewChild} from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { productInfoEntry } from '../../models/productInfoEntry.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';


@Component({
  selector: 'app-product-info-table',
  templateUrl: './product-info-table.component.html',
  styleUrls: ['./product-info-table.component.css']
})
export class ProductInfoTableComponent implements OnInit {
  dataSource: MatTableDataSource<productInfoEntry>;
  displayedColumns = ['ecode', 'style', 'sku', 'upc', 'supc', 'presale', 'presaleEndDate', 'hotMarket', 'hotMarketEndDate', 'specialOrder', 'vdceligible'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private candyJarService: CandyJarService, private communicationService: CommunicationService) {}

  ngOnInit() {
    this.communicationService.change.subscribe(result => {
      this.populateTable(result["productCode"], result["productType"]);
    })
  }


  populateTable(code: string, type: string){
    code = code.trim();
    this.candyJarService.getProductInfoEntry(code, type).subscribe(stream => {
      this.dataSource = new MatTableDataSource<productInfoEntry>(stream);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    });
  }




}
