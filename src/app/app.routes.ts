import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProfileComponent } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
