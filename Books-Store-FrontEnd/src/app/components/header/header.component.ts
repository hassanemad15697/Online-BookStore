import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksCategory } from 'src/app/model/books-category';
import { CartService } from 'src/app/service/cart.service';
import { SearchByCategoryService } from 'src/app/service/search-by-category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  booksCategories: BooksCategory[] = [];


  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(@Inject(DOCUMENT) private document: any,
    private searchByCategoryService: SearchByCategoryService,
    private router: Router,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    let loginForm = this.document.querySelector('.login-form-container');
    let searchForm = this.document.querySelector('.search-form');

    this.listCategories();
    this.updateCartStatus();

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


  @HostListener('window:scroll') onScroll() {
    if (window.scrollY > 80) {
      this.document.querySelector('.header .header-2').classList.add('active');
    } else {
      this.document.querySelector('.header .header-2').classList.remove('active');
    }
  }


  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
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

