import { Component, OnInit } from '@angular/core';
import { FeaturedBooks } from 'src/app/model/featured-books';
import { FeaturedBooksService } from 'src/app/service/featured-books.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-featured-books',
  templateUrl: './featured-books.component.html',
  styleUrls: ['./featured-books.component.css']
})
export class FeaturedBooksComponent implements OnInit {

  featuredBooks: FeaturedBooks[] =[];
  constructor(private featuredBooksService: FeaturedBooksService) { }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks(){
    this.featuredBooksService.getBooksList().subscribe(
      data => {
        this.featuredBooks = data;
      }
    )
  }

  config: SwiperOptions ={
    spaceBetween: 30,
    loop:true,
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