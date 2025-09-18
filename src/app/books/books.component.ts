import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookVm } from '../models/book.models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.min(0)],
    authorId: [1, Validators.required]
  });

  books: BookVm[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private api: BooksService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getAll().subscribe({
      next: data => { this.books = Array.isArray(data) ? data : []; this.loading = false; },
      error: _ => { this.books = []; this.loading = false; }
    });
  }

  create() {
    const v = this.form.value;
    const payload: any = {
      title: (v as any).name,   // ES ESTE EL CAMPO?
      price: v.price ?? 0,
      authorId: v.authorId ?? 1
    };
    this.api.create(payload).subscribe({
      next: _ => this.load(),
      error: err => console.error('POST error', err)
    });
  }

  // ESTA BIEN EL id?
  trackById = (_: number, item: BookVm) => (item as any).id;
}
