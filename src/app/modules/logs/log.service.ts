import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogMovement } from './log.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/logs`;

  findAll(): Observable<LogMovement[]> {
    return this.http.get<LogMovement[]>(this.api);
  }

  byUser(username: string): Observable<LogMovement[]> {
    return this.http.get<LogMovement[]>(`${this.api}/user/${username}`);
  }

  byBranch(branchId: number): Observable<LogMovement[]> {
    return this.http.get<LogMovement[]>(`${this.api}/branch/${branchId}`);
  }

  byProduct(productId: number): Observable<LogMovement[]> {
    return this.http.get<LogMovement[]>(`${this.api}/product/${productId}`);
  }
}
