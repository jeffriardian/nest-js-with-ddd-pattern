import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { ICreateRentBookService } from '../interfaces/services/create.rent.book.service.interface';
import { RentBooks } from '../domain/rentbook.entity';
import { RentBookDomain } from '../domain/rentbook.domain';
import { Members } from 'src/members/domain/member.entity';
import { MemberDomain } from 'src/members/domain/member.domain';
import { Books } from 'src/books/domain/book.entity';
import { BookDomain } from 'src/books/domain/book.domain';

@Injectable()
export class CreateRentBookService implements ICreateRentBookService {
    constructor(
        @InjectRepository(RentBooks) private rentBooksRepository: Repository<RentBooks>,
        @InjectRepository(Members) private memberRepository: Repository<Members>,
        @InjectRepository(Books) private bookRepository: Repository<Books>,
    ) {}

    async createRentBook(rentBook: RentBookDomain): Promise<RentBookDomain> {
        return this.rentBooksRepository.save(rentBook);
    }
    async getByMemberCode(member_code: string): Promise<MemberDomain> {
        return this.memberRepository.findOneBy({ code: member_code });
    }
    async getByBookCode(book_code: string): Promise<BookDomain> {
        return this.bookRepository.findOneBy({code: book_code})
    }
    async getRentBook(book_code: string): Promise<RentBookDomain> {
        return this.rentBooksRepository.findOneBy({book_code: book_code, status: "active"})
    }
    async checkRentBook(member_code) {
        return this.rentBooksRepository.countBy({member_code: member_code, status: "active"})
    }
    async checkMemberStatus(member_code: string): Promise<RentBookDomain> {
        return this.rentBooksRepository.findOneBy({member_code: member_code, status: "penalized"})
    }
    async getAllBook(book_code){
        return this.rentBooksRepository.findAndCountBy({book_code: book_code});
    }
    async getAllMember(member_code: string) {
        return this.rentBooksRepository.findAndCountBy({member_code: member_code});
    }
}