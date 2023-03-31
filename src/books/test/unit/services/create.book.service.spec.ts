import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookService } from '../../../services/create.book.service';
import { Book } from '../../../domain/book.entity';

describe('CreateBookService', () => {
    let service: CreateBookService;
    let repositoryMock: Repository<Book>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateBookService,
                {
                    // how you provide the injection token in a test instance
                    provide: getRepositoryToken(Book),
                    // as a class value, Repository needs no generics
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<CreateBookService>(CreateBookService);
        repositoryMock = app.get<Repository<Book>>(getRepositoryToken(Book));
    });

    describe('create', () => {
        it('should create book', async () => {
            const book: Book = {
                code: 'JK-45',
                title: 'Harry Potter',
                author: 'J.K Rowling',
                stock: 1,
            };
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(book);
            expect(await service.create(book)).toEqual(book);
            expect(repositoryMock.save).toBeCalled();
        });
    });
});
