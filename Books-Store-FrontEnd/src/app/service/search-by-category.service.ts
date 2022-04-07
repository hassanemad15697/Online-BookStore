import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BooksCategory } from '../model/books-category';
import { FeaturedBooks } from '../model/featured-books';

@Injectable({
  providedIn: 'root'
})
export class SearchByCategoryService {


  private baseUrl= 'http://localhost:8080/api'

  constructor(private httpClient: HttpClient) { }
  
  getBooksList(currentCategoryId: number): Observable<FeaturedBooks[]> {

    const searchByCategoryURL:string =`${this.baseUrl}/books/search/findByCategoryId?id=${currentCategoryId}`;
    return this.httpClient.get<GetResponseBooksList>(searchByCategoryURL).pipe(map(Response => Response._embedded.books));
  }

  getBooksCetegories() : Observable<BooksCategory[]>{
    const searchByCategoryURL:string =`${this.baseUrl}/bookscategory`;
    return this.httpClient.get<GetResponseBooksCetegories>(searchByCategoryURL).pipe(map(Response => Response._embedded.bookscategory));
  }

  searchBooks(theKeyword: string): Observable<FeaturedBooks[]> {
    const searchByCategoryURL:string =`${this.baseUrl}/books/search/findByTitleContaining?title=${theKeyword}`;
    return this.httpClient.get<GetResponseBooksList>(searchByCategoryURL).pipe(map(Response => Response._embedded.books));
  }

}

interface GetResponseBooksList{
  _embedded: {
    books: FeaturedBooks[];
  }
}

interface GetResponseBooksCetegories{
  _embedded: {
    bookscategory: BooksCategory[];
  }
}