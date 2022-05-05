import { Books } from "./books";

export class CartItem {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;
    discount: number;
    book: Books;
    constructor(book: Books) {
        this.id = book.id;
        this.title = book.title;
        this.image_url = book.image_url;
        this.price = book.price;
        this.discount = book.discount;
        this.quantity = 1;
        this.book= book;
    }
}
