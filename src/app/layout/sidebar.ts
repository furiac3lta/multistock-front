import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BranchSessionService } from '../core/services/branch-session.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {

  isOpen = true;

  branches = [
    { id: 1, name: 'Sucursal Centro' },
    { id: 2, name: 'Sucursal Norte' },
    { id: 3, name: 'Sucursal Sur' }
  ];

  currentBranch = 1;

  constructor(private branchSession: BranchSessionService) {}

  ngOnInit() {
    this.currentBranch = this.branchSession.getBranch();
  }

  changeBranch(id: number) {
    this.currentBranch = id;
    this.branchSession.setBranch(id);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
