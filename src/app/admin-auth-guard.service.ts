import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate() {
    console.log('canactivateadmin');

    return this.auth.appUser$.pipe(map((appUser) => {
      console.log(appUser);

      return appUser.isAdmin;
    }));
  }
}
