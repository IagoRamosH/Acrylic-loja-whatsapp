import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AuthUser } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
