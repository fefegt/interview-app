import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookVm, CreateBook } from '../models/book.models';

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<BookVm[]> {
    return this.http.get<BookVm[] | any>(`${environment.apiUrl}/books`)
      .pipe(
        map(res => Array.isArray(res) ? res : []),
        catchError(_ => of([]))
      );
  }

  create(payload: CreateBook) {
    return this.http.post(`${environment.apiUrl}/books`, payload);
  }
}
