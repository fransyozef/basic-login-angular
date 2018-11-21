import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './_auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loggedIn: Boolean = false;

  private onLogout_subscription: Subscription;
  private onLogin_subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    // listen for logout
    this.onLogout_subscription  = this.authService.onLogout.subscribe(
      () => {
        this.loggedIn  = false;
        this.router.navigate(['/login']);
      }
    );

    // listen for login
    this.onLogin_subscription  = this.authService.onLogin.subscribe(
      () => {
        this.loggedIn  = true;
      }
    );

    if (this.authService.hasToken()) {
      this.loggedIn = true;
    }

    // check and validate token
    if (this.authService.hasToken()) {
      this.authService.validateTokenOnServer().subscribe(
        (result) => {
          if (!result) {
            this.logout();
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.onLogout_subscription)  { this.onLogout_subscription.unsubscribe(); }
  }

  logout() {
    this.authService.logout();
  }
}
