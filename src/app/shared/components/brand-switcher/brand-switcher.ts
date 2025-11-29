import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import { BranchService, Branch } from '../../../core/services/branch.service';
import { BranchSessionService } from '../../../core/services/branch-session.service';

@Component({
  selector: 'app-branch-switcher',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './brand-switcher.html',
   styleUrls: ['./brand-switcher.scss']
})
export class BranchSwitcher implements OnInit {

  private branchService = inject(BranchService);
  private branchSession = inject(BranchSessionService);

  branches: Branch[] = [];
  currentBranch = 1;

  ngOnInit() {
    this.branchService.getAll().subscribe(branches => {
      this.branches = branches;

      const saved = this.branchSession.getBranch();
      this.currentBranch = branches.some(b => b.id === saved)
        ? saved
        : branches[0].id;
    });
  }

  changeBranch(id: number) {
    this.currentBranch = id;
    this.branchSession.setBranch(id);
  }
}
