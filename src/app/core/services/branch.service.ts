// src/app/core/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Branch {
  id: number;
  name: string;
  address: string | null;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class BranchService {

  private api = 'http://localhost:8080/branches';
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
}
