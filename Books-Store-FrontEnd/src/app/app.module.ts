import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeaturedBooksComponent } from './components/home/featured-books/featured-books.component';
import { HttpClientModule } from '@angular/common/http'
import { FeaturedBooksService } from './service/featured-books.service';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { HomeBooksComponent } from './components/home/home-books/home-books.component';
import { ArrivalsBooksComponent } from './components/home/arrivals-books/arrivals-books.component';
import { ReviewsHomeComponent } from './components/home/reviews-home/reviews-home.component';
import { BolgsHomeComponent } from './components/home/bolgs-home/bolgs-home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './components/home/home.component';
import { SearchByCategoryService } from './service/search-by-category.service';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './service/cart.service';
import { ToastsContainer } from './components/toast/toast.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'product-details', component: CartDetailsComponent },
  { path: 'category/:id', component: SearchResultsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: SearchResultsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FeaturedBooksComponent,
    HomeBooksComponent,
    ArrivalsBooksComponent,
    ReviewsHomeComponent,
    BolgsHomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchResultsComponent,
    ProductDetailsComponent,
    ToastsContainer,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    FeaturedBooksService,
    SearchByCategoryService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
