import { FeaturedBooks } from "./featured-books";

export class CartItem {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;

    constructor(book: FeaturedBooks) {
        this.id = book.id;
        this.title = book.title;
        this.image_url = book.image_url;
        this.price = book.price;
        this.quantity = 1;
    }
}
