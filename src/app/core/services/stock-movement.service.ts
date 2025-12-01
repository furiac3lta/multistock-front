import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMovement } from '../models/stock-movement.model';

@Injectable({ providedIn: 'root' })
export class StockMovementService {

  private api = 'http://localhost:8080/stock';

  constructor(private http: HttpClient) {}

  // 🔥 Obtener todos los movimientos
  getAll(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.api}/all`);
  }

  // 🔥 Historial por producto
  history(productId: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.api}/${productId}/history`);
  }

  // 🔥 Movimiento de stock
  move(productId: number, quantity: number, type: string, description: string, user: string) {
    return this.http.post(`${this.api}/${productId}/move`, null, {
      params: { quantity, type, description, user }
    });
  }
  getLast30Days(branchId: number) {
  return this.http.get<any[]>(`http://localhost:8080/dashboard/movements-30/${branchId}`);
}

}
