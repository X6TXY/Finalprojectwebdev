import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from '../models/models';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  category: Category | undefined;
  isLoggedIn: boolean | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      if (!isNaN(id) && id > 0) { 
        this.getProductById(id);
      } else {
        console.error('Invalid ID:', id);
        this.router.navigate(['/']);
      }
    });
  }

  getProductById(id: number): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        if (product.category_id) {
          this.getCategory(product.category_id); 
        } else {
          console.error('Product does not have a category_id');
        }
      },
      error => console.error('Error fetching product:', error)
    );
  }
  
  

  getCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(category =>{ this.category = category;},error => console.error('Error fetching product:', error));
  }

  getRatingStars(rating: number): Array<number> {
    return new Array(rating);
  }

  getEmptyStars(rating: number): Array<number> {
    return new Array(5- rating);
  }

  deleteProduct(): void{
if(this.product){
  this.productService.deleteProduct(this.product.id).subscribe({
    next: () => {
      console.log('Product deleted');
      this.router.navigate(['/']);
    },
    error: (error) => console.error('Error deleting the vacancy', error)
  })
}
  }


  
}
