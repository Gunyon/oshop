import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { ProductQuantityComponent } from '@components/product-quantity/product-quantity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLeaf, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '@services/auth-guard.service';
import { AuthService } from '@services/auth.service';
import { CategoryService } from '@services/category.service';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { UserService } from '@services/user.service';
import { DataTableModule } from 'angular-6-datatable';
import { CustomFormsModule } from 'ng2-validation';

library.add(faLeaf, faShoppingCart);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    ProductCardComponent,
    ProductQuantityComponent,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
