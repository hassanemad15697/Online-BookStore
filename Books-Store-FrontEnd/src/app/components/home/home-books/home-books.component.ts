import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/model/books';
import { FeaturedBooksService } from 'src/app/service/featured-books.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-home-books',
  templateUrl: './home-books.component.html',
  styleUrls: ['./home-books.component.css']
})
export class HomeBooksComponent implements OnInit {
  discountedBooks: Books[] = [];
  constructor(private featuredBooksService: FeaturedBooksService) { }

  ngOnInit(): void {
    this.DiscountedBooksList();
  }

  DiscountedBooksList() {
    this.featuredBooksService.getDiscountedBooksList().subscribe(
      data => {
        this.discountedBooks = data;
      }
    )
  }
  config: SwiperOptions = {
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  }
}
