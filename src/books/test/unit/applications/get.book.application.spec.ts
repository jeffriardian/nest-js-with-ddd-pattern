import { Test } from '@nestjs/testing';
import { Book } from '../../../domain/book.entity';
import { GetBookApplication } from '../../../applications/get.book.application';
import { TYPES } from '../../../interfaces/types';
import { NotFoundException } from '@nestjs/common';

const book: Book = {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
};

class GetBookService {
    getByCode(code) {
        return book;
    }
}

describe('GetBookApplication', () => {
    let application: GetBookApplication;
    let service: GetBookService;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetBookApplication,
                {
                    provide: TYPES.services.IGetBookService,
                    useClass: GetBookService,
                },
            ],
        }).compile();

        service = app.get<GetBookService>(TYPES.services.IGetBookService);
        application = app.get<GetBookApplication>(GetBookApplication);
    });

    describe('getByCode', () => {
        it('should get book by code', async () => {
            expect(await application.getByCode(book.code)).toEqual(book);
        });

        it('throws 404 error when book is not found', async () => {
            jest.spyOn(service, 'getByCode').mockImplementation(() => null);
            try {
                await application.getByCode(book.code);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message.message).toEqual(`Book with code ${book.code} was not found`);
            }
        });
    });
});