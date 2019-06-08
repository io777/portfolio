import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MessagesService} from '../../messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessagesService, public fb: FormBuilder, private authService: AuthService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loginFun() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  ngOnInit() {
  }

}
