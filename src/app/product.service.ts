import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})))
    );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
