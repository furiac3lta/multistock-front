import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockTransferRequest {
  sourceBranchId: number;
  targetBranchId: number;
  productId: number;
  quantity: number;
  description?: string;
  user: string;
}

@Injectable({ providedIn: 'root' })
export class StockTransferService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/stock/transfer';

  transfer(req: StockTransferRequest): Observable<any> {
    return this.http.post(this.api, req);
  }
}
