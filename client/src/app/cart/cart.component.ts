import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { Cart, CartDetailed } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.asObservable().subscribe({
      next: (res: any) => {
        // const cartDetailed = cart.items
        this.cart = res;
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed..'),
    });
  }

  updateQuntity(product: Product, quantity: number): void {
    const cartItem: CartDetailed = {
      product: product,
      quantity: quantity,
    };
    this.cartService.setCartItem(cartItem, true);
  }
}
