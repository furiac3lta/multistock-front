import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, BranchService } from '../core/services/branch.service';
import { BranchSessionService } from '../core/services/branch-session.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class AppHeader {

  private branchService = inject(BranchService);
  private branchSession = inject(BranchSessionService);
  private router = inject(Router);

  branches: Branch[] = [];
  selectedBranchId: number = 1;

  ngOnInit() {
    this.branchService.getAll().subscribe(branches => {
      this.branches = branches;
      this.selectedBranchId = this.branchSession.getBranch();
    });
  }

  onBranchChange(id: any) {
    const branchId = Number(id);
    this.branchSession.setBranch(branchId);
    this.router.navigateByUrl(this.router.url);
  }

  goConfig() {
    alert("Abrir configuraciones (pronto lo creamos)");
  }
}
