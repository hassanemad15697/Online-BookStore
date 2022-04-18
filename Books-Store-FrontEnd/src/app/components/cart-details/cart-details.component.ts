import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartItems();
  }
  listCartItems() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeTheCartTotal();
  }
  addToCart(cartItem : CartItem){
    this.cartService.addToCart(cartItem);
  }
  decrementQuantity(cartItem:CartItem){
    this.cartService.decrementQuantity(cartItem);
  }
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem);
    this.listCartItems();
  }
}