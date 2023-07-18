import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentTime: Date = new Date();

  constructor(private authService: AuthService, private router: Router) {
    setInterval( () => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
