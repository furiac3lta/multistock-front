import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../modules/users/user.model';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);
  private api = `${environment.apiBaseUrl}/admin/users`;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  create(data: any) {
    const form = new FormData();
    Object.keys(data).forEach(k => form.append(k, data[k]));
    return this.http.post<User>(this.api, form);
  }

  update(id: number, data: any) {
    const form = new FormData();
    Object.keys(data).forEach(k => form.append(k, data[k]));
    return this.http.put<User>(`${this.api}/${id}`, form);
  }

  changePassword(id: number, newPassword: string) {
    const form = new FormData();
    form.append('newPassword', newPassword);
    return this.http.put(`${this.api}/${id}/password`, form);
  }

  toggle(id: number) {
    return this.http.put<User>(`${this.api}/${id}/toggle`, {});
  }

  changeRole(id: number, role: string) {
    const form = new FormData();
    form.append('role', role);
    return this.http.put<User>(`${this.api}/${id}/roles`, form);
  }

  changeBranch(id: number, branchId: number) {
    const form = new FormData();
    form.append('branchId', branchId.toString());
    return this.http.put<User>(`${this.api}/${id}/branch`, form);
  }
}
