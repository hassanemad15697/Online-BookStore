import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/model/books';
import { FeaturedBooksService } from 'src/app/service/featured-books.service';
import { ToastService } from 'src/app/service/toast.service';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-arrivals-books',
  templateUrl: './arrivals-books.component.html',
  styleUrls: ['./arrivals-books.component.css']
})
export class ArrivalsBooksComponent implements OnInit {
  arrivalBooks1: Books[] = [];
  arrivalBooks2: Books[] = [];
  constructor(private featuredBooksService: FeaturedBooksService) { }

  ngOnInit(): void {
    this.ArrivalsBooksList(0);
    this.ArrivalsBooksList(1);
  }
  ArrivalsBooksList(num: number) {
    this.featuredBooksService.getArrivalBooksList(num).subscribe(
      data => {
        if (num == 0) {
          this.arrivalBooks1 = data;
        } else if (num == 1) {
          this.arrivalBooks2 = data;
        }
      }
    );

  }

 
  config: SwiperOptions = {
    spaceBetween: 30,
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
    }
  }

}
