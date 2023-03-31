import { Injectable, Inject } from '@nestjs/common';
import { BookDomain } from '../domain/book.domain';
import { ICreateBookApplication } from '../interfaces/applications/create.book.application.interface';
import { TYPES } from '../interfaces/types';
import { ICreateBookService } from '../interfaces/services/create.book.service.interface';

@Injectable()
export class CreateBookApplication implements ICreateBookApplication {
    constructor(@Inject(TYPES.services.ICreateBookService) private bookService: ICreateBookService) {}

    async create(book: BookDomain): Promise<BookDomain> {
        return this.bookService.create(book);
    }
}