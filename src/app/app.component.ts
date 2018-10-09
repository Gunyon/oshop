import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);
        const redirectUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(redirectUrl);
      }
    });
  }
}
