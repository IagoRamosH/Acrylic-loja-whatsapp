import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.name, this.email, this.password).subscribe((result) => {
      if (!result.success) {
        this.errorMessage = result.message ?? 'Nao foi possivel concluir o cadastro.';
        return;
      }

      this.successMessage = result.message ?? 'Cadastro realizado com sucesso.';
      this.router.navigate(['/login']);
    });
  }
}
