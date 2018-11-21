import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator} from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { AuthService } from '../_auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  processing: Boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // add the extra styles for a public page
    this.document.body.className = 'publicPage';

    this.initForm();
  }

  onSubmitButtonClicked() {
    if (this.loginForm.valid) {
      this.processing  = true;
      this.authService.login(this.loginForm.value.username , this.loginForm.value.password).then(
      data => {
        if (data) {
          this.router.navigate(['/dashboard']);
        } else {
          this.processing  = false;
        }
      },
      err => {
        this.processing = false;
      });
    }
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

}
