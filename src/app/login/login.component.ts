import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import { CheckRequiredField } from '../_shared/helpers/form.helper';
import { AuthService } from '../_auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  processing: Boolean = false;
  error: Boolean = false;

  checkField  = CheckRequiredField;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    } else {
      this.initForm();
    }
  }

  // checkRequiredClass(frmControl: string) {
  //   const t  = this.loginForm.get()
  //   return {
  //     'required' : false
  //   };
  // }

  onSubmitButtonClicked() {
    this.error  = false;
    this.processing  = false;
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.processing  = true;
    this.authService.login(this.loginForm.value).then(
      data => {
        if (data) {
          this.handleLoginSuccess();
        } else {
          this.handleLoginError();
        }
      },
      err => {
        console.log('---- ERROR ---- ');
        console.log(err);
        this.handleLoginError();
      });
  }

  private handleLoginSuccess() {
    this.processing = false;
    this.error  = false;
    this.router.navigate(['/dashboard']);
  }

  private handleLoginError() {
    this.processing = false;
    this.error  = true;
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

}
