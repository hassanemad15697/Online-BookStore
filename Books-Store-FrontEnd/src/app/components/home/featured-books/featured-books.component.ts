import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { Books } from 'src/app/model/books';
import { CartService } from 'src/app/service/cart.service';
import { FeaturedBooksService } from 'src/app/service/featured-books.service';
import { ToastService } from 'src/app/service/toast.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-featured-books',
  templateUrl: './featured-books.component.html',
  styleUrls: ['./featured-books.component.css']
})
export class FeaturedBooksComponent implements OnInit {

  featuredBooks: Books[] = [];
  constructor(private featuredBooksService: FeaturedBooksService,
    private cartService: CartService, public toastService: ToastService) { }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks() {
    this.featuredBooksService.getBooksList().subscribe(
      data => {
        this.featuredBooks = data;
      }
    )
  }
  addtoCart(book: Books) {
    let cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
    this.showSuccess();
  }
   showSuccess() {
    this.toastService.show('Book added successfuly to the cart', { classname: 'bg-success text-light ', delay: 5000 });
  }
  ngOnDestroy(): void {
    this.toastService.clear();
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
