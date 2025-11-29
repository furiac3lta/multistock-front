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

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.api);
  }
}
