import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchSessionService {

  private branchId = new BehaviorSubject<number>(1); // por defecto Sucursal 1
  branchId$ = this.branchId.asObservable();

  setBranch(id: number) {
    this.branchId.next(id);
  }

  getBranch(): number {
    return this.branchId.value;
  }
}
