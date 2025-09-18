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
    // Hay alguna propiedad faltante?
    name: ['', Validators.required],
    price: [0, Validators.min(0)],
    authorId: [1, Validators.required]
  });

  books: BookVm[] = [];

  constructor(private fb: FormBuilder, private api: BooksService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getAll().subscribe({
      next: data => this.books = data,
      error: err => console.error('GET error', err)
    });
  }

  create() {
    const v = this.form.value;
    // Esta bien el payload?
    const payload: any = {
      title: (v as any).name,
      price: v.price ?? 0,
      authorId: v.authorId ?? 1
    };
    this.api.create(payload).subscribe({
      next: _ => this.load(),
      error: err => console.error('POST error', err)
    });
  }

  // Revisa bien el trackBy
  trackById = (_: number, item: BookVm) => (item as any).id;
}