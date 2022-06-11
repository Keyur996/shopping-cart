import { Component, Input, OnInit } from '@angular/core';
import { CartDetailed } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input('product') product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    ++this.product.quantity!;
    const cartItem: CartDetailed = {
      product: product,
      quantity: this.product.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }

  updateQuntity(product: Product, quantity: number): void {
    this.product.quantity = quantity;
    const cartItem: CartDetailed = {
      product: product,
      quantity: this.product.quantity,
    };
    this.cartService.setCartItem(cartItem, true);
  }
}
