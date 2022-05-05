import { Books } from "./books";
import { CartItem } from "./cart-item";

export class OrderItem {

    quantity: number;
    books: Books;

    constructor(cartItem: CartItem) {
        this.quantity = cartItem.quantity;
        this.books = cartItem.book;
    }
}

