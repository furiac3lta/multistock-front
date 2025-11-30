import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { BranchService } from '../../core/services/branch.service';

@Component({
  selector: 'app-user-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create-dialog.html'
})
export class UserCreateDialog {

  roles = ['ADMIN', 'USER', 'EMPLEADO', 'GERENTE']; // podes ajustarlos si querés
  branches: any[] = [];

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', Validators.required),
    branchId: new FormControl<number | null>(null, Validators.required),
    active: new FormControl(true),
  });

  constructor(
    private userService: UserService,
    private branchService: BranchService,
    public dialogRef: MatDialogRef<UserCreateDialog>
  ) {
    this.branchService.getAll().subscribe(resp => {
  this.branches = resp;
});

  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    const req = {
      username: data.username!,
      fullName: data.fullName!,
      phone: data.phone!,
      password: data.password!,
      role: data.role!,
      branchId: data.branchId!,
      active: data.active
    };

    this.userService.create(req).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
