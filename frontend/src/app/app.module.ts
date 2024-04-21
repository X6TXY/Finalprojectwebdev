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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { HeadingComponent } from './heading/heading.component';
import { AuthInterceptor } from './interceptor/auth-interceptor.interceptor';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,RouterModule,
    RouterModule.forRoot([
      { path: 'auth', component: AuthComponent },
      {path:'', component: ProductListComponent},
      {path:'updateproduct/:id', component: UpdateproductComponent},
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      {path:'addproduct', component: AddproductComponent},

    ]),
  ],
  declarations: [
    AppComponent,
    AuthComponent,

    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    HeadingComponent,
    AddproductComponent,
    UpdateproductComponent

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
