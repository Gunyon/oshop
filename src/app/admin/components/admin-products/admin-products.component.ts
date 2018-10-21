import { Product } from '@models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Array<Product>;
  filteredProducts: Array<Product>;
  subsGetAll: Subscription;

  constructor(private productService: ProductService) {
    this.subsGetAll = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query) {
    this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query)) :
      this.products;
  }

  ngOnInit() {
  }

}
