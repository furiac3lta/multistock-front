import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movement } from '../models/movement.model';
import { MovementType } from '../models/movement-type.enum';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StockService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/stock`;

  moveStock(
    productId: number,
    quantity: number,
    type: MovementType,
    description: string,
    user: string
  ) {
    const params = new HttpParams()
      .set('quantity', quantity)
      .set('type', type)
      .set('description', description)
      .set('user', user);

    return this.http.post<Movement>(
      `${this.api}/${productId}/move`,
      null,
      { params }
    );
  }

  history(productId: number) {
    return this.http.get<Movement[]>(`${this.api}/${productId}/history`);
  }
}
