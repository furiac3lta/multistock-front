import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface AuthRequest {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="login-shell">
      <div class="login-panel">
        <div class="login-copy">
          <span class="login-kicker">MultiStock</span>
          <h1>Acceso al sistema</h1>
          <p>Gestioná inventario, movimientos y usuarios desde una interfaz clara, estable y profesional.</p>
        </div>

        <mat-card class="login-card">
          <div class="login-card-header">
            <h2>Iniciar sesión</h2>
            <p>Ingresá tus credenciales para continuar.</p>
          </div>

          <form [formGroup]="form" class="login-form">
            <mat-form-field appearance="outline">
              <mat-label>Usuario</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" formControlName="password">
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="submit()">
              Ingresar
            </button>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-shell {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      background: var(--bg-body);
    }

    .login-panel {
      width: min(980px, 100%);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      align-items: stretch;
    }

    .login-copy,
    .login-card {
      padding: 28px;
      border-radius: 20px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
    }

    .login-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      box-shadow: var(--shadow-sm);
    }

    .login-kicker {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .login-copy h1 {
      font-size: clamp(2rem, 3vw, 3rem);
      line-height: 1.05;
    }

    .login-copy p,
    .login-card-header p {
      margin: 0;
      color: var(--text-secondary);
    }

    .login-card {
      width: 100%;
      box-shadow: var(--shadow-sm);
    }

    .login-card-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .login-form {
      display: grid;
      gap: 14px;
    }

    button {
      width: 100%;
    }

    @media (max-width: 767px) {
      .login-copy,
      .login-card {
        padding: 22px;
      }
    }
  `]
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

  this.auth.login(this.form.getRawValue() as AuthRequest).subscribe({
  next: (res) => {
    this.auth.setToken(res.token);
    this.router.navigate(['/']);
  },
  error: () => {
    alert('Credenciales inválidas');
  }
});

  }
}
