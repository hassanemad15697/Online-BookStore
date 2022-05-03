import { BooksCategory } from "./books-category";

export class Books {
    id: number;
    title: string;
    isbn13: string;
    num_pages: number;
    publication_date: Date;
    price: number;
    discount: number;
    description: string;
    image_url: string;
    publisher_name: string;
    language_name: string;
    category: string;
}
