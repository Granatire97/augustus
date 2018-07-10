import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { SkuHistoryTableComponent } from './components/sku-history-table/sku-history-table.component';
import { HttpClientModule } from '@angular/common/http';
import { CandyJarService } from './services/candy-jar.service';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatProgressBarModule, MatCardModule, MatIconModule, MatTableModule, MatMenuModule, MatTabsModule, MatPaginatorModule, MatGridListModule, MatSortModule, MatRadioModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommunicationService } from './services/communication.service';
import { SkuAvailabilityTableComponent } from './components/sku-availability-table/sku-availability-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductInfoTableComponent } from './components/product-info-table/product-info-table.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SkuHistoryTableComponent,
    SearchBarComponent,
    SkuAvailabilityTableComponent,
    NavbarComponent,
    ProductInfoTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    MatToolbarModule, MatInputModule, 
    MatInputModule, 
    MatProgressSpinnerModule, 
    MatProgressBarModule, 
    MatCardModule, 
    MatIconModule, 
    MatTableModule, 
    MatMenuModule, 
    MatTabsModule, 
    MatPaginatorModule, 
    MatGridListModule, 
    MatSortModule, 
    MatRadioModule, 
    MatSnackBarModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CandyJarService, CommunicationService],
  exports: [SkuHistoryTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
