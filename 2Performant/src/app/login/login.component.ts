import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { FormBuilder } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  login(): void {
    let user: User = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? ''
    }
    this.authService.login(user).subscribe( () => {
      this.router.navigate(['/home']);
    });
  }

}
