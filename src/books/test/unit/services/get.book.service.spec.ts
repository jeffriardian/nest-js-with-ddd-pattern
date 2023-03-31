import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetBookService } from '../../../services/get.book.service';
import { Book } from '../../../domain/book.entity';

describe('GetBookService', () => {
    let service: GetBookService;
    let repositoryMock: Repository<Book>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetBookService,
                {
                    provide: getRepositoryToken(Book),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<GetBookService>(GetBookService);
        repositoryMock = app.get<Repository<Book>>(getRepositoryToken(Book));
    });

    describe('findByCode', () => {
        it('should find book by code', async () => {
            const book: Book = {
                code: 'JK-45',
                title: 'Harry Potter',
                author: 'J.K Rowling',
                stock: 1,
            };
            jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValueOnce(book);
            expect(await service.getByCode(book.code)).toEqual(book);
            expect(repositoryMock.findOneBy).toBeCalled();
        });
    });
});