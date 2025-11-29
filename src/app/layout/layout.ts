import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { BranchSwitcher } from "../shared/components/brand-switcher/brand-switcher";
import { NavChips } from './nav-chips/nav-chips';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    BranchSwitcher,
    NavChips
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
  constructor() {}
}
