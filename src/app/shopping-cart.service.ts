import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  /** create a new shoppin cart in database */
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  /** get the shopping cart from database */
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map((cart: any) => new ShoppingCart(cart.items))
    );
  }

  async clearCart() {
    const cartId = await this.getCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  /** get the id of shopping cart */
  private async getCartId(): Promise<string> {
    // return cartid from local storage if exists
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    // otherwise create new cart in database
    // use await to resolve the promise synchronously
    const result = await this.create();
    // save the id of new created cart in local storage
    localStorage.setItem('cartId', result.key);
    // return the id
    return result.key;
  }

  /** get a reference of a product from shopping cart */
  private getItem(cartId, productId) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  /** add a product in the shopping cart or increase its quantity */
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  /** decrease item quantity in the shopping card or remove if there's only one */
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  /** update item quantity in the shopping cart */
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getCartId();
    // get a reference to a product from shopping cart
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      const newItem = new ShoppingCartItem(product);
      // if product exists in cart, update its quantity
      // otherwise set it to 1 (change)
      const q = (item && item.quantity || 0) + change;
      if (q === 0) {
        item$.remove();
      } else {
        newItem.setQunatity(q);
        // push changes in database
        item$.update(newItem);
      }
    });
  }
}
