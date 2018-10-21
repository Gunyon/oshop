import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

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
      if (!user) { return; }
      this.userService.save(user);

      const redirectUrl = localStorage.getItem('returnUrl');
      if (!redirectUrl) { return; }
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(redirectUrl);
    });
  }
}
