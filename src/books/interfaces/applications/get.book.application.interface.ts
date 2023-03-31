import { BookDomain } from 'src/books/domain/book.domain';

export interface IGetBookApplication {
    getByCode(code: string): Promise<BookDomain>;
}