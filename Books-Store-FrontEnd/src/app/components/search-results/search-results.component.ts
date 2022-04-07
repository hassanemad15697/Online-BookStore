import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { FeaturedBooks } from 'src/app/model/featured-books';
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
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private route: ActivatedRoute,
    private searchByCategoryService: SearchByCategoryService) { }

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

  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')+'';
    this.searchByCategoryService.searchBooks(theKeyword).subscribe(
      data => {
        this.booksByCategory = data;
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

    this.searchByCategoryService.getBooksList(this.currentCategoryId).subscribe(
      data => {
        this.booksByCategory = data;
      }
    )

    for (let featuredBook of this.booksByCategory) {
      console.log(featuredBook.title);
    }
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

