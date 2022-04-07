import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-arrivals-books',
  templateUrl: './arrivals-books.component.html',
  styleUrls: ['./arrivals-books.component.css']
})
export class ArrivalsBooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions={
    spaceBetween: 30,
    loop:true,
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
    }
  }

}
