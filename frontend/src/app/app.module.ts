import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';

import { AuthComponent } from './auth/auth.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShippingComponent } from './shipping/shipping.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      {path:'home', component: ProductListComponent},
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },

    ]),
  ],
  declarations: [
    AppComponent,
    AuthComponent,

    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
