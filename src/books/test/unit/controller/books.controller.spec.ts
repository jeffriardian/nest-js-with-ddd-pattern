import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../../../controller/books.controller';
import { TYPES } from '../../../interfaces/types';

const book = {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
};

class CreateBookApplicationMock {
    create(obj) {
        return book;
    }
}

class GetBookApplicationMock {
    getByCode(code) {
        return book;
    }
}

describe('Books Controller', () => {
    let controller: BooksController;
    let createBookAppMock;
    let getBookAppMock;
    const response = {
        status: (code: number) => response,
        json: json => json,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [
                {
                    provide: TYPES.applications.ICreateBookApplication,
                    useClass: CreateBookApplicationMock,
                },
                {
                    provide: TYPES.applications.IGetBookApplication,
                    useClass: GetBookApplicationMock,
                },
            ],
        }).compile();

        controller = module.get<BooksController>(BooksController);
        createBookAppMock = module.get(TYPES.applications.ICreateBookApplication);
        getBookAppMock = module.get(TYPES.applications.IGetBookApplication);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findOneBy', () => {
        it('should get book by code', async () => {
            jest.spyOn(getBookAppMock, 'getByCode');

            expect(await controller.findOneBy(book.code)).toEqual(book);
            expect(getBookAppMock.getByCode).toBeCalled();
        });
    });
    describe('create', () => {
        it('should create book', async () => {
            jest.spyOn(createBookAppMock, 'create');

            expect(await controller.create(response, book)).toEqual(book);
            expect(createBookAppMock.create).toBeCalled();
        });
    });
});