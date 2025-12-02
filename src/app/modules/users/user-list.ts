import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../core/services/user.service';
import { User } from './user.model';
import { UserPasswordDialog } from './user-password-dialog';
import { UserCreateDialog } from './user-create-dialog';
import { UserEditDialog } from './user-edit-dialog';
import { UserRoleDialog } from './user-role-dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList implements OnInit {

  private dialog = inject(MatDialog);
  private userService = inject(UserService);

  users: User[] = [];

  displayedColumns = ['username', 'fullName', 'roles', 'branchName', 'active', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: resp => this.users = resp,
      error: err => console.error('ERROR USERS:', err)
    });
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