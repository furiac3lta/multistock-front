import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { GlobalLoaderComponent } from '../components/global-loader/global-loader';
import { AppTabs } from "./nav-tabs";



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
   GlobalLoaderComponent,
    AppTabs,
   
  
],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
  constructor() {}
}
