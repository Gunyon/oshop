import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product';
import { ShoppingCart } from '@models/shopping-cart';
import { ProductService } from '@services/product.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
