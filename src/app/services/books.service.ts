import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookVm, CreateBook } from '../models/book.models';

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<BookVm[]> {
    // BUG: debería ser /books
    return this.http.get<BookVm[]>(`${environment.apiUrl}/book`);
  }

  create(payload: CreateBook) {
    // BUG: debería ser /books
    return this.http.post(`${environment.apiUrl}/book`, payload);
  }
}