import { BookDomain } from 'src/books/domain/book.domain';

export interface ICreateBookApplication {
    create(bookDomain: BookDomain): Promise<BookDomain>;
}