import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SkuBopisDisplayComponent } from './components/sku-bopis-display/sku-bopis-display.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'network/:type/:code/:location', component: ProductDisplayComponent},
  {path: 'network/:type/:code', component: ProductDisplayComponent},
  {path: 'error/:errortype/:mode/:type/:code/:location', component: ErrorMessageComponent},
  {path: 'store/:type/:code/:location', component: SkuBopisDisplayComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule],
})
export class AppRoutingModule { }
