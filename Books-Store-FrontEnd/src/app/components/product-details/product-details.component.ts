import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeaturedBooks } from 'src/app/model/featured-books';
import { SearchByCategoryService } from 'src/app/service/search-by-category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  bookDetails: FeaturedBooks = new FeaturedBooks();

  constructor(private route: ActivatedRoute,
    private searchByCategoryService: SearchByCategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductDetails();
    })
  }

  getProductDetails() {
    const bookId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.searchByCategoryService.getBookDetails(bookId).subscribe(
      data => {
        this.bookDetails = data;
      }
    )

  }

}
