import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shippingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shippingCart.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}