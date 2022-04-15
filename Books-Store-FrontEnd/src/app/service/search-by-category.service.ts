import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BooksCategory } from '../model/books-category';
import { FeaturedBooks } from '../model/featured-books';

@Injectable({
  providedIn: 'root'
})
export class SearchByCategoryService {




  private baseUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) { }

  getBooksList(currentCategoryId: number): Observable<FeaturedBooks[]> {
    const searchByCategoryURL: string = `${this.baseUrl}/books/search/findByCategoryId?id=${currentCategoryId}`;
    return this.httpClient.get<GetResponseBooksList>(searchByCategoryURL).pipe(map(Response => Response._embedded.books));
  }

  getBooksListPaginate(size: number, page: number, currentCategoryId: number): Observable<GetResponseBooksList> {
    const searchByCategoryURL: string = `${this.baseUrl}/books/search/findByCategoryId?id=${currentCategoryId}&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseBooksList>(searchByCategoryURL);
  }

  getBooksCetegories(): Observable<BooksCategory[]> {
    const searchByCategoryURL: string = `${this.baseUrl}/bookscategory`;
    return this.httpClient.get<GetResponseBooksCetegories>(searchByCategoryURL).pipe(map(Response => Response._embedded.bookscategory));
  }

  searchBooksPatinate(size: number, page: number, theKeyword: string): Observable<GetResponseBooksList> {
    const searchByCategoryURL: string = `${this.baseUrl}/books/search/findByTitleContaining?title=${theKeyword}&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseBooksList>(searchByCategoryURL);
  }

  getBookDetails(bookId: number): Observable<GetResponseBookDetails> {
    const searchByCategoryURL: string = `${this.baseUrl}/books/${bookId}`;
    return this.httpClient.get<GetResponseBookDetails>(searchByCategoryURL);
  }
  getCategoryName(url: string): Observable<GetResponseCategoryName> {
    return this.httpClient.get<GetResponseCategoryName>(url);
  }
  getLanguageName(url: string): Observable<GetResponseLanguageName> {
    return this.httpClient.get<GetResponseLanguageName>(url);
  }
  getPublisherName(url: string): Observable<GetResponsePublisherName> {
    return this.httpClient.get<GetResponsePublisherName>(url);
  }
}

interface GetResponseCategoryName {
  category_name: string;
}
interface GetResponseLanguageName {
  language_name: string;
}
interface GetResponsePublisherName {
  publisher_name: string;
}
interface GetResponseBookDetails {

  id: number;
  title: string;
  isbn13: string;
  num_pages: number;
  publication_date: Date;
  price: number;
  discount: number;
  description: string;
  image_url: string;

  _links: {
    publisher: { href: string; }
    category: { href: string; }
    language: { href: string; }
  }
}
interface GetResponseBooksList {
  _embedded: {
    books: FeaturedBooks[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

interface GetResponseBooksCetegories {
  _embedded: {
    bookscategory: BooksCategory[];
  }
}