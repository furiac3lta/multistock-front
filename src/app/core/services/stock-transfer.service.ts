import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private api = `${environment.apiBaseUrl}/stock/transfer`;

  transfer(req: StockTransferRequest): Observable<any> {
    return this.http.post(this.api, req);
  }
}
