import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productChanged: Subject<{ products: Product[]; count: number }> =
    new Subject();
  constructor(private http: HttpClient) {}

  getProducts(page?: number, limit?: number) {
    let params;
    if (page && limit) {
      params = new HttpParams().set('page', page).set('limit', limit);
    }
    this.http
      .get<{ success: boolean; data: Product[]; count: number }>(
        `${environment.API_END}/products`,
        { params: params }
      )
      .subscribe({
        next: (res: { success: boolean; data: Product[]; count: number }) => {
          this.productChanged.next({
            products: [...res.data],
            count: res.count,
          });
        },
        error: (err) => console.log(err),
      });
  }

  getProductChanged() {
    return this.productChanged.asObservable();
  }
}
