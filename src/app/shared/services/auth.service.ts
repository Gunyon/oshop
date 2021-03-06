import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '@models/app-user';
import { UserService } from '@services/user.service';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap((user) => {
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      } else {
        return of(null);
      }
    }));
  }
}
