import { BookDomain } from 'src/books/domain/book.domain';

export interface ICreateBookService {
    create(bookDomain: BookDomain): Promise<BookDomain>;
}
