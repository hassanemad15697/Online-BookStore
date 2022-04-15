import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { CartItem } from 'src/app/model/cart-item';
import { FeaturedBooks } from 'src/app/model/featured-books';
import { CartService } from 'src/app/service/cart.service';
import { FeaturedBooksService } from 'src/app/service/featured-books.service';
import { SearchByCategoryService } from 'src/app/service/search-by-category.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  booksByCategory: FeaturedBooks[] = [];
  currentCategoryId: number = 0;
  previuosCategoryId: number = 0;
  searchMode: boolean = false;

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 15;
  totalElements: number = 0;


  constructor(private route: ActivatedRoute,
    private searchByCategoryService: SearchByCategoryService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword') + '';
    this.searchByCategoryService.searchBooksPatinate(this.pageSize, this.pageNumber - 1, theKeyword).subscribe(
      data => {
        this.booksByCategory = data._embedded.books;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    )

  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else {
      this.currentCategoryId = 0;
    }

    if (this.previuosCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previuosCategoryId = this.currentCategoryId;


    this.searchByCategoryService.getBooksListPaginate(this.pageSize, this.pageNumber - 1, this.currentCategoryId).subscribe(
      data => {
        this.booksByCategory = data._embedded.books;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    )

  }

  updatePageSize(size: string) {
    console.log(`size = ${size}`)
    this.pageSize = Number(size);
    this.pageNumber = 1;
    this.listBooks();
  }

  addtoCart(book: FeaturedBooks) {
    let cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
  config: SwiperOptions = {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      }
    }

  };

}

