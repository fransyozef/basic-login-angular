import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmitButtonClicked() {
    this.error  = false;
    if (this.loginForm.valid) {
      this.processing  = true;
      this.login();
    }
  }

  private login() {
    this.authService.login(this.loginForm.value).then(
      data => {
        if (data) {
          this.router.navigate(['/dashboard']);
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
