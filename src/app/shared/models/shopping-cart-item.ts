export class ShoppingCartItem {
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(obj?: Partial<ShoppingCartItem>) {
    // Object.assign(this, obj);
    this.key = obj && obj.key || null;
    this.title = obj && obj.title || null;
    this.price = obj && obj.price || null;
    this.imageUrl = obj && obj.imageUrl || null;
    this.quantity = obj && obj.quantity || null;
  }

  /** get the total price of the item by multiplying the product price with quantity */
  get totalPrice(): number {
    return this.price * this.quantity;
  }

  setQunatity(quantity) {
    this.quantity = quantity;
  }
}
