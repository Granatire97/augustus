import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ProductInfoTableComponent } from './components/product-info-table/product-info-table.component';
import { AppComponent } from './app.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: ProductDisplayComponent},
  {path: 'info/:type/:code', component: ProductDisplayComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule],
})
export class AppRoutingModule { }
