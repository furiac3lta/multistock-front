import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchSessionService {

  private readonly STORAGE_KEY = 'current_branch';

  // Sucursal actual
  private branchId = new BehaviorSubject<number>(this.loadInitialBranch());
  branchId$ = this.branchId.asObservable();

  constructor() {}

  // Cargar sucursal al iniciar
  private loadInitialBranch(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? Number(stored) : 1; // por defecto sucursal 1
  }

  // Cambiar sucursal
  setBranch(id: number) {
    localStorage.setItem(this.STORAGE_KEY, String(id));
    this.branchId.next(id);
  }

  // Obtener sucursal actual
  getBranch(): number {
    return this.branchId.value;
  }
}
