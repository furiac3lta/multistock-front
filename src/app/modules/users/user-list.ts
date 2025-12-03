import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { User } from './user.model';
import { UserPasswordDialog } from './user-password-dialog';
import { UserCreateDialog } from './user-create-dialog';
import { UserEditDialog } from './user-edit-dialog';   // ← AGREGAR ESTO
import { UserRoleDialog } from './user-role-dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList {

  private dialog = inject(MatDialog);
  private userService = inject(UserService);

  users: User[] = [];
  displayedColumns = ['code', 'username', 'fullName', 'role', 'branch', 'status', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: resp => this.users = resp,
      error: err => console.error('ERROR USERS:', err)
    });
  }

  formatCode(user: User) {
    return `USR-${String(user.id).padStart(3, '0')}`;
  }

  // ============================
  //    CREAR USUARIO
  // ============================
  openCreate() {
    const ref = this.dialog.open(UserCreateDialog, {
      width: '500px'
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) this.loadUsers();
    });
  }

  // ============================
  //   CAMBIAR CONTRASEÑA
  // ============================
  openPassword(user: User) {
    const ref = this.dialog.open(UserPasswordDialog, {
      width: '400px',
      data: user
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) this.loadUsers();
    });
  }

  // ============================
  //  ACTIVAR / DESACTIVAR
  // ============================
  toggle(user: User) {
    this.userService.toggle(user.id!).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }
openEdit(user: User) {
  const ref = this.dialog.open(UserEditDialog, {
    width: '500px',
    data: user
  });

  ref.afterClosed().subscribe(ok => {
    if (ok) this.loadUsers();
  });
}
openRole(user: User) {
  const ref = this.dialog.open(UserRoleDialog, {
    width: '400px',
    data: user
  });
ref.afterClosed().subscribe(ok => {
    if (ok) this.loadUsers();
  });

}
}