import { ShoppingCartItem } from '@models/shopping-cart-item';
import { Product } from '@models/product';

export class ShoppingCart {
  items: Array<ShoppingCartItem> = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    let item;
    this.itemsMap = itemsMap || {};
    // transform cart items in array to be able to iterate in template with ngFor
    for (const productId of Object.keys(this.itemsMap)) {
      item = this.itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item }));
    }
  }

  /** get the quantity of a specific product in the shopping cart */
  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  /** get the total prrice of all the products in the shopping cart */
  get totalPrice() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.totalPrice;
    }
    return sum;
  }

  /** get the total number of the products in the shoppin cart */
  get totalItemsCount() {
    let count = 0;
    for (const productId of Object.keys(this.itemsMap)) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
