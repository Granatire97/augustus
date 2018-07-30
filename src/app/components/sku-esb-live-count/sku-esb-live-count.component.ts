import { Component, OnInit, ViewChild } from '@angular/core';
import { CandyJarService } from '../../services/candy-jar.service';
import { MatTableDataSource, MatSort } from '@angular/material';
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
  mode: string;

  constructor(
    private route: ActivatedRoute,
    private candyJarService: CandyJarService,
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

  ngOnInit() {}

  populateTable(location: string, sku: string){
    this.show = false;
    location = location.trim();
    sku = sku.trim();
    this.candyJarService.getESBInventory(location, sku).subscribe(stream => {
    
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
