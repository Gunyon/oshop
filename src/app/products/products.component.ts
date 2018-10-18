import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  category: string;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }

  async ngOnInit() {
    const sub = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
    this._subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

}
