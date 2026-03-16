import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TransferHistory {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  sourceBranchId: number;
  targetBranchId: number;
  description: string;
  createdBy: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class TransferHistoryService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/stock/transfers`;

  getAll(): Observable<TransferHistory[]> {
    return this.http.get<TransferHistory[]>(this.api);
  }
}
