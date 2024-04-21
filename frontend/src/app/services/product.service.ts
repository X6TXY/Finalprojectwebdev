import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}product/`)
      .pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}product/${id}`)
      .pipe(catchError(this.handleError));
  }

handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Client-side Error: ${error.error.message}`;
  } else {
    errorMessage = `Server-side Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error('Error occurred:', errorMessage);
  return throwError(() => new Error(errorMessage));
}

postProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.BASE_URL}product-post/`, product, )
  .pipe(catchError(this.handleError));
  
}

deleteProduct(id: number): Observable<any> {
  return this.http.delete<Product>(`${this.BASE_URL}product/${id}`).pipe(catchError(this.handleError));
}

updateProduct(id: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.BASE_URL}product/${id}`, JSON.stringify(product), {
    headers: { 'Content-Type': 'application/json' }
  }).pipe(catchError(this.handleError));
}


 
}
