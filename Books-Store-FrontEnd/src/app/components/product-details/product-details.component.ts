import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { FeaturedBooks } from 'src/app/model/featured-books';
import { CartService } from 'src/app/service/cart.service';
import { SearchByCategoryService } from 'src/app/service/search-by-category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  bookDetails: FeaturedBooks = new FeaturedBooks();
  constructor(private route: ActivatedRoute,
    private searchByCategoryService: SearchByCategoryService,
    private cartService: CartService, public toastService: ToastService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductDetails();
    })
  }

  getProductDetails() {
    const bookId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.searchByCategoryService.getBookDetails(bookId).subscribe(
      data => {
        this.bookDetails.id = data.id;
        this.bookDetails.description = data.description;
        this.bookDetails.discount = data.discount;
        this.bookDetails.image_url = data.image_url;
        this.bookDetails.isbn13 = data.isbn13;
        this.bookDetails.num_pages = data.num_pages;
        this.bookDetails.price = data.price;
        this.bookDetails.publication_date = data.publication_date;
        this.bookDetails.title = data.title;
        this.searchByCategoryService.getCategoryName(data._links.category.href).subscribe(
          c => { this.bookDetails.category = c.category_name; }
        );
        this.searchByCategoryService.getLanguageName(data._links.language.href).subscribe(
          l => { this.bookDetails.language_name = l.language_name; }
        );
        this.searchByCategoryService.getPublisherName(data._links.publisher.href).subscribe(
          p => { this.bookDetails.publisher_name = p.publisher_name; }
        );
      }
    )
  }
  addtoCart(book: FeaturedBooks) {
    let cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
    this.showSuccess();
  }
  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }
  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
