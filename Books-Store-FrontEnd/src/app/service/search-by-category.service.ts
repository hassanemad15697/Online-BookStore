import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BooksCategory } from '../model/books-category';
import { FeaturedBooks } from '../model/featured-books';

@Injectable({
  providedIn: 'root'
})
export class SearchByCategoryService {



  private baseUrl = 'http://localhost:8080/api'

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

  getBookDetails(bookId: number): Observable<FeaturedBooks> {
    const searchByCategoryURL: string = `${this.baseUrl}/books/${bookId}`;
    return this.httpClient.get<FeaturedBooks>(searchByCategoryURL);
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