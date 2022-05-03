import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistedItem = false;
    let existingItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingItem = tempCartItem;
          break;
        }
      }
      alreadyExistedItem = (existingItem != undefined)
    }

    if (alreadyExistedItem) {
      existingItem!.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeTheCartTotal();
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem!.quantity--;
    this.computeTheCartTotal();
  }

  removeFromCart(theCartItem: CartItem) {
    console.log("it's implemented")
    let itemIndex = this.cartItems.findIndex(tempItem => tempItem.id = theCartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    else {
      this.computeTheCartTotal();
    }
  }


  computeTheCartTotal() {

    let totalPriceValue: number = 0.00;
    let totalQuantityValue: number = 0;

    for (let item of this.cartItems) {
      totalPriceValue += ((item.price * item.quantity) / 100 * (100 - item.discount));
      totalQuantityValue += item.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
