import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'user-password-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './user-password-dialog.html'
})
export class UserPasswordDialog {

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserPasswordDialog>
  ) {}

  save() {
    if (this.form.invalid) return;

    this.service.changePassword(this.data.id, this.form.value.password!)
      .subscribe(() => this.dialogRef.close(true));
  }
}
