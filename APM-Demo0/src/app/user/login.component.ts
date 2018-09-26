import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as UserAction from './state/user.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<any>) {
  }

  ngOnInit(): void {
        this.store.pipe(select(fromUser.getMaskUserName),
        takeWhile(() => this.componentActive))
        .subscribe(maskUsername => this.maskUserName = maskUsername);
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {

    this.store.dispatch(new UserAction.MaskUserName(value));
    // this.store.dispatch({
    //   type: 'MASK_USERNAME',
    //   payload: value
    // });
    // this.maskUserName = value;
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
