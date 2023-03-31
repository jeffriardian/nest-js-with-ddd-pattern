import { RentBookDomain } from 'src/rentbooks/domain/rentbook.domain';
import { MemberDomain } from 'src/members/domain/member.domain';
import { BookDomain } from 'src/books/domain/book.domain';

export interface ICreateRentBookApplication {
    createRentBook(rentBookDomain: RentBookDomain): Promise<RentBookDomain>;
    getByMemberCode(member_code: string): Promise<MemberDomain>;
    getByBookCode(book_code: string): Promise<BookDomain>;
    getRentBook(book_code: string): Promise<RentBookDomain>;
    checkRentBook(member_code: string);
    checkMemberStatus(member_code: string): Promise<RentBookDomain>;
    getAllBook(book_code: string);
    getAllMember(member_code: string);
}