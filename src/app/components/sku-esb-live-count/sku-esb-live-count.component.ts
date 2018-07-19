import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CommunicationService } from '../../services/communication.service';
import { ActivatedRoute } from '@angular/router';
import { EsbLiveCountEntry } from '../../models/EsbLiveCountEntry.model';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-sku-esb-live-count',
  templateUrl: './sku-esb-live-count.component.html',
  styleUrls: ['./sku-esb-live-count.component.css']
})
export class SkuEsbLiveCountComponent implements OnInit {
  show: boolean = false;
  searchResults: any = {"productType":"", "productCode":""};
  infoFound: boolean;
  dataSource: MatTableDataSource<EsbLiveCountEntry>;
  displayedColumns = ['sku', 'atsqty', 'time'];

  constructor(
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private candyJarService: CandyJarService,
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
    this.candyJarService.getESBInventory(sku).subscribe(stream => {
    
      var i;
      for(i = 0; i< stream["data"]["skus"].length; i++){
        if(stream["data"]["skus"][i] != null){
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],4,'-');
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],7,'-');
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],10,' ');
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],13,':');
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],16,':');
          stream["data"]["skus"][i]["time"] = this.insert(stream["data"]["skus"][i]["time"],19,'.');
        } else {
          stream["data"]["skus"].splice(i);
        }
    }
      this.dataSource = new MatTableDataSource<EsbLiveCountEntry>(stream["data"]["skus"]);
      if (this.dataSource.data.length != 0){
        this.show = true;
      } 
    });
  }

  export(){
    const filename = "Product_Info_Table_" + this.searchResults["productType"] + "_" + this.searchResults["productCode"];
    this.utilityService.exportToCSV(this.dataSource.data, filename, true)
  }

  insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }
}
