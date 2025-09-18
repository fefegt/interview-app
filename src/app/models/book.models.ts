export interface BookVm {
  bookId: number;
  title: string;
  price: number;
  published: string | null;
  authorName: string | null;
}

export interface CreateBook {
  title: string;
  price: number;
  publishedOn?: string | null;
  authorId: number;
}