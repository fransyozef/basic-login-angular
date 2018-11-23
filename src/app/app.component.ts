import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { AuthService } from './_auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loggedIn$: BehaviorSubject<boolean>;
  private isLoggedIn_subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {

    this.loggedIn$  =  this.authService.isLoggedIn;

    this.isLoggedIn_subscription  = this.authService.isLoggedIn.subscribe(
      (status) => {
        this.document.body.className = status ? '' : 'publicPage';

        if (!status) {
          this.router.navigate(['/login']);
        }
      }
    );

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
    if (this.isLoggedIn_subscription)  { this.isLoggedIn_subscription.unsubscribe(); }
  }

  private logout() {
    this.authService.logout();
  }
}
