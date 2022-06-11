import { Product } from '../products/product.model';

export class Cart {
  items?: CartDetailed[];
}

export class CartDetailed {
  product?: Product;
  quantity?: number;
  totalAmount?: number;
}
