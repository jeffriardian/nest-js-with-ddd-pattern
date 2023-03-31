import { Module } from '@nestjs/common';
import { RentBooksController } from './controller/rent.books.controller';
import { RentBooks } from './domain/rentbook.entity';
import { Members } from 'src/members/domain/member.entity';
import { Books } from 'src/books/domain/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from './interfaces/types';
import { CreateRentBookApplication } from './applications/create.rent.book.application';
import { CreateRentBookService } from './services/create.rent.book.service';

const createRentBookApp = { provide: TYPES.applications.ICreateRentBookApplication, useClass: CreateRentBookApplication };

const createRentBookService = { provide: TYPES.services.ICreateRentBookService, useClass: CreateRentBookService };

@Module({
    imports: [TypeOrmModule.forFeature([RentBooks, Members, Books])],
    controllers: [RentBooksController],
    providers: [createRentBookApp, createRentBookService],
})
export class RentbooksModule {}
