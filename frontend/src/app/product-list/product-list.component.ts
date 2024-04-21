import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../models/models';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  isLoggedIn: boolean | undefined;

  products: Product[] = [];
  categories: Category[] = [];
  constructor(public productService: ProductService, public categoryService: CategoryService,private authService: AuthService){}

  ngOnInit(): void {

    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.categoryService.getCategory().subscribe(categories => { 
      this.categories = categories;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getRatingStars(rating: number): Array<number> {
    return new Array(rating);
  }

  getEmptyStars(rating: number): Array<number> {
    return new Array(5- rating);
  }
  
}
