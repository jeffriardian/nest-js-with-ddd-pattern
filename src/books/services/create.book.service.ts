import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../domain/book.entity';
import { BookDomain } from '../domain/book.domain';
import { ICreateBookService } from '../interfaces/services/create.book.service.interface';

@Injectable()
export class CreateBookService implements ICreateBookService {
    constructor(@InjectRepository(Books) private booksRepository: Repository<Books>) {}

    async create(book: BookDomain): Promise<BookDomain> {
        return this.booksRepository.save(book);
    }
}