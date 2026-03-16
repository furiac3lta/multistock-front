import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.api, category);
  }

  update(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getStockSummary(branchId: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/dashboard/stock-category/${branchId}`);
  }

}
