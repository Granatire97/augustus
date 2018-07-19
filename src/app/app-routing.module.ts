import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'info/:type/:code', component: ProductDisplayComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule],
})
export class AppRoutingModule { }
