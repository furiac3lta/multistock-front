import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../core/services/branch.service';
import { UserService } from '../../core/services/user.service';
import { User } from './user.model';



@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './user-edit-dialog.html',
  styleUrls: ['./user-edit-dialog.scss']
})
export class UserEditDialog {

  dialogRef = inject(MatDialogRef<UserEditDialog>);
  userService = inject(UserService);
  branchService = inject(BranchService);

  branches: any[] = [];

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    branchId: new FormControl<number | null>(null, Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit() {
    this.branchService.getAll().subscribe(b => this.branches = b);

    // precargar datos
    this.form.patchValue({
      fullName: this.user.fullName,
      phone: this.user.phone,
      branchId: this.user.branchId
    });
  }

  save() {
    if (this.form.invalid) return;

    this.userService.update(this.user.id!, this.form.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error(err)
    });
  }
}
