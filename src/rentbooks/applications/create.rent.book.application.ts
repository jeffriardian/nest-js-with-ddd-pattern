import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TYPES } from '../interfaces/types';
import { RentBookDomain } from '../domain/rentbook.domain';
import { ICreateRentBookApplication } from '../interfaces/applications/create.rent.book.application.interface';
import { ICreateRentBookService } from '../interfaces/services/create.rent.book.service.interface';
import { MemberDomain } from 'src/members/domain/member.domain';
import { BookDomain } from 'src/books/domain/book.domain';

@Injectable()
export class CreateRentBookApplication implements ICreateRentBookApplication {
    constructor(
        @Inject(TYPES.services.ICreateRentBookService) private rentBookService: ICreateRentBookService,
    ) {}

    async createRentBook(rentBookDomain: RentBookDomain): Promise<RentBookDomain> {
        return this.rentBookService.createRentBook(rentBookDomain);
    }
    async getByMemberCode(member_code: string): Promise<MemberDomain> {
        const member = await this.rentBookService.getByMemberCode(member_code);
        if (!member) {
            throw new NotFoundException(`Member with code ${member_code} was not found`);
        }
        return member;
    }
    async getByBookCode(book_code: string): Promise<BookDomain> {
        const book = await this.rentBookService.getByBookCode(book_code);
        if (!book) {
            throw new NotFoundException(`Book with code ${book_code} was not found`);
        }
        return book;
    }
    async getRentBook(book_code: string): Promise<RentBookDomain> {
        const rentBook = await this.rentBookService.getRentBook(book_code);
        if (rentBook){
            throw new NotFoundException(`Book has been borrowed by another member`);
        }
        return rentBook;
    }
    async checkRentBook(member_code: string) {
        const totalRentBook = await this.rentBookService.checkRentBook(member_code);
        
        if (totalRentBook >= 2){
            throw new NotFoundException(`Members may not borrow more than 2 books`);
        }
        return totalRentBook;
    }
    async checkMemberStatus(member_code: string): Promise<RentBookDomain> {
        const memberStatus = await this.rentBookService.checkMemberStatus(member_code);
        return memberStatus;
    }
    async getAllBook(book_code: string) {
        const allbook = await this.rentBookService.getAllBook(book_code);
        return allbook;
    }
    async getAllMember(member_code: string) {
        const allmember = await this.rentBookService.getAllMember(member_code);
    }
}