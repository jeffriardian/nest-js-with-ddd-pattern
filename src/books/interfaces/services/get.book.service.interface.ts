import { BookDomain } from 'src/books/domain/book.domain';

export interface IGetBookService {
    getByCode(code: string): Promise<BookDomain>;
}