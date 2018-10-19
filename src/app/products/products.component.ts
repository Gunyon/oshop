import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      // set products then switch to queryParamMap observable
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      // get category from query param and apply filter
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  /** filter products by category */
  private applyFilter() {
    this.filteredProducts = this.category ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
