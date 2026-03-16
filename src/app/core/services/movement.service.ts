import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movement } from '../models/movement.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovementService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/movements`;

  getAll(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.api);
  }

  create(movement: Movement): Observable<Movement> {
    return this.http.post<Movement>(this.api, movement);
  }
}
