import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { BranchSessionService } from './branch-session.service';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);
  private branchSession = inject(BranchSessionService);

  private api = 'http://localhost:8080/products';

  // 🔥 LISTAR productos por sucursal
  getAll(): Observable<Product[]> {
    const branchId = this.branchSession.getBranch();
    return this.http.get<Product[]>(`${this.api}/branch/${branchId}`);
  }

  // 🔥 CREAR producto asignado a la sucursal actual
  create(product: Product): Observable<Product> {
    product.branchId = this.branchSession.getBranch();
    return this.http.post<Product>(this.api, product);
  }

  // 🔥 ACTUALIZAR producto dentro de la sucursal actual
  update(id: number, product: Product): Observable<Product> {
    product.branchId = this.branchSession.getBranch();
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  // 🔥 ELIMINAR producto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
