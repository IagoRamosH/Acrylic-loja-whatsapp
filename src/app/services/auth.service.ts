import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface AuthUser {
  name: string;
  email: string;
  status: string;
}

export interface AuthResult {
  success: boolean;
  user: AuthUser | null;
  message?: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usersStorageKey = 'loja-whatsapp-users';
  private readonly currentUserStorageKey = 'loja-whatsapp-user';
  private readonly demoUser: StoredUser = {
    name: 'Usuario da Loja',
    email: 'usuario@email.com',
    password: '123456',
    status: 'Conta demo ativa'
  };
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readStoredCurrentUser());

  constructor() {
    this.ensureSeedUsers();
  }

  login(email: string, password: string): Observable<AuthResult> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getStoredUsers().find(
      (candidate) =>
        candidate.email.toLowerCase() === normalizedEmail &&
        candidate.password === password
    );

    if (!user) {
      return of({
        success: false,
        user: null,
        message: 'E-mail ou senha incorretos.'
      });
    }

    const currentUser = this.toAuthUser(user);
    this.persistCurrentUser(currentUser);

    return of({
      success: true,
      user: currentUser
    });
  }

  register(name: string, email: string, password: string): Observable<AuthResult> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();
    const normalizedPassword = password.trim();

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return of({
        success: false,
        user: null,
        message: 'Preencha nome, e-mail e senha para continuar.'
      });
    }

    const users = this.getStoredUsers();
    const alreadyExists = users.some(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail
    );

    if (alreadyExists) {
      return of({
        success: false,
        user: null,
        message: 'Ja existe uma conta cadastrada com esse e-mail.'
      });
    }

    const newUser: StoredUser = {
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
      status: 'Conta ativa'
    };

    users.push(newUser);
    this.persistUsers(users);

    return of({
      success: true,
      user: this.toAuthUser(newUser),
      message: 'Cadastro realizado com sucesso.'
    });
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.currentUserStorageKey);
    }

    this.userSubject.next(null);
  }

  getUser(): Observable<AuthUser | null> {
    return this.userSubject.asObservable();
  }

  getCurrentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private ensureSeedUsers() {
    const users = this.getStoredUsers();
    const hasDemoUser = users.some(
      (candidate) => candidate.email.toLowerCase() === this.demoUser.email
    );

    if (!hasDemoUser) {
      users.unshift(this.demoUser);
      this.persistUsers(users);
    }
  }

  private getStoredUsers(): StoredUser[] {
    if (typeof localStorage === 'undefined') {
      return [this.demoUser];
    }

    const rawUsers = localStorage.getItem(this.usersStorageKey);

    if (!rawUsers) {
      return [this.demoUser];
    }

    try {
      const users = JSON.parse(rawUsers) as StoredUser[];
      return Array.isArray(users) ? users : [this.demoUser];
    } catch {
      return [this.demoUser];
    }
  }

  private persistUsers(users: StoredUser[]) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.usersStorageKey, JSON.stringify(users));
  }

  private persistCurrentUser(user: AuthUser) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));
    }

    this.userSubject.next(user);
  }

  private readStoredCurrentUser(): AuthUser | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const storedUser = localStorage.getItem(this.currentUserStorageKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem(this.currentUserStorageKey);
      return null;
    }
  }

  private toAuthUser(user: StoredUser): AuthUser {
    return {
      name: user.name,
      email: user.email,
      status: user.status
    };
  }
}
