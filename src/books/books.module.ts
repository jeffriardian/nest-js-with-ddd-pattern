import { Module } from '@nestjs/common';
import { BooksController } from './controller/books.controller';
import { CreateBookService } from './services/create.book.service';
import { Books } from './domain/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookApplication } from './applications/create.book.application';
import { TYPES } from './interfaces/types';
import { GetBookApplication } from './applications/get.book.application';
import { GetBookService } from './services/get.book.service';

const createBookApp = { provide: TYPES.applications.ICreateBookApplication, useClass: CreateBookApplication };
const getBookApp = { provide: TYPES.applications.IGetBookApplication, useClass: GetBookApplication };

const createBookService = { provide: TYPES.services.ICreateBookService, useClass: CreateBookService };
const getBookService = { provide: TYPES.services.IGetBookService, useClass: GetBookService };

@Module({
    imports: [TypeOrmModule.forFeature([Books])],
    controllers: [BooksController],
    providers: [createBookApp, getBookApp, createBookService, getBookService],
})
export class BooksModule {}
