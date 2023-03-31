import { Test } from '@nestjs/testing';
import { Book } from '../../../domain/book.entity';
import { CreateBookApplication } from '../../../applications/create.book.application';
import { TYPES } from '../../../interfaces/types';

class CreateBookService {
    create(book) {
        return book;
    }
}
describe('CreateBookApplication', () => {
    let application: CreateBookApplication;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateBookApplication,
                {
                    provide: TYPES.services.ICreateBookService,
                    useClass: CreateBookService,
                },
            ],
        }).compile();

        application = app.get<CreateBookApplication>(CreateBookApplication);
    });

    describe('create', () => {
        it('should create book', async () => {
            const book: Book = {
                code: 'JK-45',
                title: 'Harry Potter',
                author: 'J.K Rowling',
                stock: 1,
            };
            expect(await application.create(book)).toEqual(book);
        });
    });
});