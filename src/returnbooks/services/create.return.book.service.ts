import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateReturnBookService } from '../interfaces/services/create.return.member.service.interface';
import { RentBooks } from 'src/rentbooks/domain/rentbook.entity';
import { RentBookDomain } from 'src/rentbooks/domain/rentbook.domain';

@Injectable()
export class CreateReturnBookService implements ICreateReturnBookService {
    constructor(
        @InjectRepository(RentBooks) private rentBooksRepository: Repository<RentBooks>,
    ) {}
    
    async UpdateById(rentBookId: number, updatedFields : Partial<RentBookDomain>): Promise<Partial<any>> {
        return this.rentBooksRepository.update(rentBookId, updatedFields);
    }
    async getRentBook(member_code: string, book_code: string): Promise<RentBookDomain> {
        return this.rentBooksRepository.findOneBy({member_code: member_code, book_code: book_code, status: "active"})
    }
}