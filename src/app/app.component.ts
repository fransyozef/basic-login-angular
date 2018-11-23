import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {

    // listen for logout
    this.onLogout_subscription  = this.authService.onLogout.subscribe(
      () => {
        this.loggedIn  = false;
        this.router.navigate(['/login']);
        this.checkBodyClassName();
      }
    );

    // listen for login
    this.onLogin_subscription  = this.authService.onLogin.subscribe(
      () => {
        this.loggedIn  = true;
        this.checkBodyClassName();
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
          this.checkBodyClassName();
        }
      );
    }

    this.checkBodyClassName();
  }

  ngOnDestroy() {
    if (this.onLogout_subscription)  { this.onLogout_subscription.unsubscribe(); }
  }

  checkBodyClassName() {
    this.document.body.className = this.loggedIn ? '' : 'publicPage';
  }

  logout() {
    this.authService.logout();
  }
}
