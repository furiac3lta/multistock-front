// src/app/core/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Branch {
  id: number;
  name: string;
  address: string | null;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class BranchService {

  private api = `${environment.apiBaseUrl}/branches`;
  private _currentBranchId = 1; // valor por defecto

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.api);
  }

  setCurrentBranch(id: number) {
    this._currentBranchId = id;
  }

  currentBranchId(): number {
    return this._currentBranchId;
  }
  getSummary() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/dashboard/stock-branch`);
  }

}
