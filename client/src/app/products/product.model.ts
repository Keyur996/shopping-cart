export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  colors: Array<string>;
  categories: Array<string>;
  quantity?: number;
}
