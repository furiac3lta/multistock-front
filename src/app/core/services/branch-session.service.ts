import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchSessionService {

  private readonly STORAGE_KEY = 'current_branch';

  private branchId = new BehaviorSubject<number>(this.loadInitialBranch());
  branchId$ = this.branchId.asObservable();

  constructor() {}

  private loadInitialBranch(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? Number(stored) : 1; 
  }

  setBranch(id: number) {
    localStorage.setItem(this.STORAGE_KEY, String(id));
    this.branchId.next(id);
  }

  getBranch(): number {
    return this.branchId.value;
  }
}
