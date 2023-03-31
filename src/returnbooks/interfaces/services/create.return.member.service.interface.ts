import { RentBookDomain } from "src/rentbooks/domain/rentbook.domain";

export interface ICreateReturnBookService {
    UpdateById(rentBookId: number, updatedFields: Partial<RentBookDomain>): Promise<Partial<RentBookDomain>>;
    getRentBook(member_code: string, book_code: string): Promise<RentBookDomain>;
}
