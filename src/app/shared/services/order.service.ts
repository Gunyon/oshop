import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { ShoppingCartService } from '@services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase
  ) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    // clear the shopping cart after the order was placed
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    // TODO: select only orders of specific user by userID
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
