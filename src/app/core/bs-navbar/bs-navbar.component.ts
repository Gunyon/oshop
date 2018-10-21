import { Component, OnInit } from '@angular/core';
import { AppUser } from '@models/app-user';
import { ShoppingCart } from '@models/shopping-cart';
import { AuthService } from '@services/auth.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { Observable } from 'rxjs';
// import { faLeaf, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;
  // faLeaf = faLeaf;
  // faShoppingCart = faShoppingCart;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
