import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.appUser$.pipe(map((appUser) => {
      if (!appUser.isAdmin) {
        this.router.navigate(['/']);
      }
      return appUser.isAdmin;
    }));
  }
}
