import { Product } from './product';

export class ShoppingCartItem {
  constructor(public product: Product, public quantity: number) {}

  /** get the total price of the item by multiplying the product price with quantity */
  get totalPrice(): number {
    return (+this.product.price * this.quantity);
  }
}
