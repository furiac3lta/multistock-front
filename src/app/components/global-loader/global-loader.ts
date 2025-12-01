import { Component, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';
@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './global-loader.html',
  styleUrls: ['./global-loader.scss']
})
export class GlobalLoaderComponent {
  loading$ = inject(LoadingService).loading$;
}
