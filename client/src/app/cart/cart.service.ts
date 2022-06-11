import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartDetailed } from './cart.model';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if (!cart) {
      const intialCart = {
        items: [],
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  getCart(): Cart {
    const cartjsonString = localStorage.getItem(CART_KEY);
    const cart: Cart = cartjsonString ? JSON.parse(cartjsonString) : null;
    return cart;
  }

  emaptyCart() {
    const intialCart = {
      items: [],
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }

  setCartItem(cartItem: CartDetailed, updateItem?: boolean) {
    const cart = this.getCart();
    const cartItemExist = (cart.items ?? []).find(
      (item) => item.product?._id === cartItem?.product?._id
    );

    if (cartItemExist) {
      cart.items = (cart.items ?? [])
        .map((item) => {
          if (item.product?._id === cartItem?.product?._id) {
            if (updateItem) {
              item.quantity = cartItem.quantity;
            } else {
              item.quantity = item?.quantity! + cartItem.quantity!;
            }
            item.totalAmount = item?.product!.price * item?.quantity!;
          }
          return item;
        })
        .filter((item) => item.quantity);
    } else {
      cartItem.totalAmount = cartItem.product?.price! * 1;
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }
}
