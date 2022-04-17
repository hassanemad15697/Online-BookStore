import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FeaturedBooks } from '../model/featured-books';

@Injectable({
  providedIn: 'root'
})
export class FeaturedBooksService {


  private baseUrl = 'http://localhost:8080/api/books?size=25'

  constructor(private httpClient: HttpClient) { }

  getBooksList(): Observable<FeaturedBooks[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(Response => Response._embedded.books));
  }
  getDiscountedBooksList(): Observable<FeaturedBooks[]> {
    let discountedBooksURL = 'http://localhost:8080/api/books/search/findByOrderByDiscountDesc';
    return this.httpClient.get<GetResponse>(discountedBooksURL).pipe(map(Response => Response._embedded.books));
  }
  getArrivalBooksList(num: number) {
    let arrivalBooksURL = `http://localhost:8080/api/books/search/findByOrderByPublicationDateDesc?size=25&page=${num}`;
    return this.httpClient.get<GetResponse>(arrivalBooksURL).pipe(map(Response => Response._embedded.books));
  }
}

interface GetResponse {
  _embedded: {
    books: FeaturedBooks[];
  }
}