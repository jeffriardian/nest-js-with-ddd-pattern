import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BookDomain } from '../domain/book.domain';
import { TYPES } from '../interfaces/types';
import { IGetBookApplication } from '../interfaces/applications/get.book.application.interface';
import { IGetBookService } from '../interfaces/services/get.book.service.interface';

@Injectable()
export class GetBookApplication implements IGetBookApplication {
    constructor(@Inject(TYPES.services.IGetBookService) private getBookService: IGetBookService) {}

    async getByCode(code: string): Promise<BookDomain> {
        const book = await this.getBookService.getByCode(code);
        if (!book) {
            throw new NotFoundException(`Book with code ${code} was not found`);
        }
        return book;
    }
}