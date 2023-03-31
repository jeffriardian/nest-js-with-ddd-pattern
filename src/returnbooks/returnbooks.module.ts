import { Module } from '@nestjs/common';
import { ReturnBooksController } from './controller/return.books.controller';
import { RentBooks } from 'src/rentbooks/domain/rentbook.entity';
import { Members } from 'src/members/domain/member.entity';
import { Books } from 'src/books/domain/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from './interfaces/types';
import { CreateReturnBookApplication } from './applications/create.return.book.application';
import { CreateReturnBookService } from './services/create.return.book.service';

const createReturnBookApp = { provide: TYPES.applications.ICreateReturnBookApplication, useClass: CreateReturnBookApplication };

const createReturnBookService = { provide: TYPES.services.ICreateReturnBookService, useClass: CreateReturnBookService };

@Module({
    imports: [TypeOrmModule.forFeature([RentBooks, Members, Books])],
    controllers: [ReturnBooksController],
    providers: [createReturnBookApp, createReturnBookService],
})
export class ReturnbooksModule {}
