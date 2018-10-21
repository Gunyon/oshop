import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getAll(): Observable<Array<Product>> {
    return this.db.list('/products').snapshotChanges().pipe(
      // map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})))
      map(changes => changes.map(c => {
        return new Product(Object.assign({ key: c.payload.key}, c.payload.val()));
      }))
    );
  }

  get(productId): Observable<Product> {
    return this.db.object('/products/' + productId).valueChanges().pipe(
      map(p => new Product(p))
    );
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
