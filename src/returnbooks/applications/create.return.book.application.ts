import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TYPES } from '../interfaces/types';
import { RentBookDomain } from 'src/rentbooks/domain/rentbook.domain';
import { ICreateReturnBookApplication } from '../interfaces/applications/create.return.member.application.interface';
import { ICreateReturnBookService } from '../interfaces/services/create.return.member.service.interface';
import { MemberDomain } from 'src/members/domain/member.domain';
import { BookDomain } from 'src/books/domain/book.domain';

@Injectable()
export class CreateReturnBookApplication implements ICreateReturnBookApplication {
    constructor(
        @Inject(TYPES.services.ICreateReturnBookService) private returnBookService: ICreateReturnBookService,
    ) {}

    async UpdateById(rentBookId: number, updatedFields: Partial<RentBookDomain>): Promise<Partial<RentBookDomain>> {
        return this.returnBookService.UpdateById(rentBookId, updatedFields);
    }
    async getRentBook(member_code: string, book_code: string): Promise<RentBookDomain> {
        const rentBook = await this.returnBookService.getRentBook(member_code, book_code);
        if (!rentBook){
            throw new NotFoundException(`Data Rent Book not found`);
        }
        return rentBook;
    }
}