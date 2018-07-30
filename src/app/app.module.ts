import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { SkuHistoryTableComponent } from './components/sku-history-table/sku-history-table.component';
import { HttpClientModule } from '@angular/common/http';
import { CandyJarService } from './services/candy-jar.service';
import { UtilityService } from './services/utility.service';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatProgressBarModule, MatCardModule, MatIconModule, MatTableModule, MatMenuModule, MatTabsModule, MatPaginatorModule, MatGridListModule, MatSortModule, MatRadioModule, MatSnackBarModule, MatListModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SkuAvailabilityTableComponent } from './components/sku-availability-table/sku-availability-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductInfoTableComponent } from './components/product-info-table/product-info-table.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { SkuEsbLiveCountComponent } from './components/sku-esb-live-count/sku-esb-live-count.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SkuBopisHistoryTableComponent } from './components/sku-bopis-history-table/sku-bopis-history-table.component';
import { SkuBopisDisplayComponent } from './components/sku-bopis-display/sku-bopis-display.component';





@NgModule({
  declarations: [
    AppComponent,
    SkuHistoryTableComponent,
    SearchBarComponent,
    SkuAvailabilityTableComponent,
    NavbarComponent,
    ProductInfoTableComponent,
    ProductDisplayComponent,
    SkuEsbLiveCountComponent,
    HomeComponent,
    ErrorMessageComponent,
    SkuBopisHistoryTableComponent,
    SkuBopisDisplayComponent
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
    AppRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [CandyJarService, UtilityService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
