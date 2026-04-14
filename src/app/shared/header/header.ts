import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  readonly user$;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.getUser();
  }
}
