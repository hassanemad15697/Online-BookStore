import { CartItem } from "./cart-item";

export class OrderItem {

    image_url: string;
    quantity: number;
    price: number;
    book_id: number;

    constructor(cartItem: CartItem) {
        this.image_url = cartItem.image_url;
        this.quantity = cartItem.quantity;
        this.price = cartItem.price;
        this.book_id = cartItem.id;
    }
}

