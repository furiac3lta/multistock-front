
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { User } from './user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-role-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './user-role-dialog.html'
})
export class UserRoleDialog {

  roles = ['ADMIN', 'USER'];

  form = new FormGroup({
    role: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<UserRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {}

  save() {
    if (this.form.invalid) return;

    const role = this.form.value.role!;

    this.userService.changeRole(this.data.id!, role).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error(err)
    });
  }
}
