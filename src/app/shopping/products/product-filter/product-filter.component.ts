import { CategoryService } from '@services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input() category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

}
