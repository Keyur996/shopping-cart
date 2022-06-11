import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cart, CartDetailed } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  pageSizeOptions: Array<number> = [5, 10, 25, 100];
  pageSize: number = 5;
  currentPage: number = 1;
  products!: Product[];
  length!: number;
  cart!: Cart;
  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
    let cartProduct;
    this.productService.getProducts(this.currentPage, this.pageSize);
    this.productService.getProductChanged().subscribe({
      next: (res: { products: Product[]; count: number }) => {
        this.products = (res.products ?? []).map((product: Product) => {
          cartProduct = this.cart.items?.find(
            (cartDetailed: CartDetailed) =>
              cartDetailed?.product?._id === product._id
          );
          product.quantity = cartProduct ? cartProduct.quantity : 0;
          return product;
        });
        this.length = res.count;
      },
    });
  }

  pageChanged(pageData: PageEvent) {
    this.productService.getProducts(pageData.pageIndex + 1, pageData.pageSize);
  }
}
