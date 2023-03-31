import { Controller, Inject, Post, Res, Body, HttpStatus, UsePipes, Get, Param } from '@nestjs/common';
import { BookDomain } from '../domain/book.domain';
import { TYPES } from '../interfaces/types';
import { ICreateBookApplication } from '../interfaces/applications/create.book.application.interface';
import { ValidationPipe } from 'src/common/validation.pipe';
import { IGetBookApplication } from '../interfaces/applications/get.book.application.interface';

@Controller('books')
export class BooksController {
    constructor(
        @Inject(TYPES.applications.ICreateBookApplication) private createBookApp: ICreateBookApplication,
        @Inject(TYPES.applications.IGetBookApplication) private getBookApp: IGetBookApplication,
    ) {}

    @UsePipes(new ValidationPipe())
    @Post('/create')
    async create(@Res() res, @Body() bookDomain: BookDomain) {
        const stock = await this.createBookApp.create(bookDomain);
        return res.status(HttpStatus.OK).json(stock);
    }

    @Get(':code')
    async findOneBy(@Param('code') code: string) {
        const book = await this.getBookApp.getByCode(code);
        return book;
    }
}
