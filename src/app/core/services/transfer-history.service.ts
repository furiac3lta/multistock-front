import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransferRecord {
  id: number;
  productId: number;
  productName: string;
  sourceBranchId: number;
  sourceBranchName: string;
  targetBranchId: number;
  targetBranchName: string;
  quantity: number;
  description: string;
  user: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class TransferHistoryService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/stock/transfers/history';

  getHistory(): Observable<TransferRecord[]> {
    return this.http.get<TransferRecord[]>(this.api);
  }
}
