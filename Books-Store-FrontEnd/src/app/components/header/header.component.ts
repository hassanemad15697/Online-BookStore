import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksCategory } from 'src/app/model/books-category';
import { SearchByCategoryService } from 'src/app/service/search-by-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  booksCategories: BooksCategory[] = [];

  constructor(@Inject(DOCUMENT) private document: any,
    private searchByCategoryService: SearchByCategoryService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.listCategories();

    let searchForm = this.document.querySelector('.search-form');

    let loginForm = this.document.querySelector('.login-form-container');

    this.document.querySelector('#search-btn').onclick = () => {
      searchForm.classList.toggle('active');
    }

    this.document.querySelector('#login-btn').onclick = () => {
      loginForm.classList.toggle('active');
    }
    this.document.querySelector('#close-login-btn').onclick = () => {
      loginForm.classList.remove('active');
    }
  }

  doSearch(value: string) {
    console.log(`value = ${value}`);
    this.router.navigateByUrl(`/search/${value}`)
  }

  listCategories() {
    this.searchByCategoryService.getBooksCetegories().subscribe(
      data => {
        this.booksCategories = data;
      }
    )
  }

}

