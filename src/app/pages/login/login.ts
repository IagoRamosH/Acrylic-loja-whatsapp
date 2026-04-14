import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe((result) => {
      if (result.success) {
        this.router.navigate(['/perfil']);
        return;
      }

      this.errorMessage = result.message ?? 'Nao foi possivel fazer login.';
    });
  }
}
