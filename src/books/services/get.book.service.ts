import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../domain/book.entity';
import { BookDomain } from '../domain/book.domain';
import { IGetBookService } from '../interfaces/services/get.book.service.interface';

@Injectable()
export class GetBookService implements IGetBookService {
    constructor(@InjectRepository(Books) private booksRepository: Repository<Books>) {}

    async getByCode(code: string): Promise<BookDomain> {
        return this.booksRepository.findOneBy({ code: code });
    }
}