import { Controller, Inject, Post, NotFoundException, Param } from '@nestjs/common';
import { RentBookDomain } from '../domain/rentbook.domain';
import { TYPES } from '../interfaces/types';
import { ICreateRentBookApplication } from '../interfaces/applications/create.rent.book.application.interface';

@Controller('rent')
export class RentBooksController {
    constructor(
        @Inject(TYPES.applications.ICreateRentBookApplication) private RentBookApp: ICreateRentBookApplication,
    ) {}

    @Post(':member_code/:book_code')
    async create(@Param('member_code') member_code: string, @Param('book_code') book_code: string) {
        //Define current date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        
        const rent_date = year + "-" + month + "-" + date;
        const return_date = '';
        const status = 'active';

        //Start of Validation
        //Check the Member exist or not
        await this.RentBookApp.getByMemberCode(member_code);
        //Check Book exist or not
        await this.RentBookApp.getByBookCode(book_code);
        //Check Member Penalized or not
        const memberStatus = await this.RentBookApp.checkMemberStatus(member_code);
        const returndate = memberStatus.return_date;
        let returndate1 = new Date(returndate);
        let returndate_date = returndate1.getDate() + 3;
        let returndate_month = returndate1.getMonth() + 1;
        let returndate_year = returndate1.getFullYear();
        const new_return_date = returndate_year + "-" + returndate_month + "-" + returndate_date;
        const newreturndate = new Date(new_return_date);
        if (new Date(rent_date) < newreturndate){
            throw new NotFoundException(`Member got penalized. Member with penalty cannot able to borrow the book for 3 days`);
        }
        //Check Members may not borrow more than 2 books
        await this.RentBookApp.checkRentBook(member_code);
        //Check Borrowed books are not borrowed by other members
        await this.RentBookApp.getRentBook(book_code);
        //End of Validation

        //Start of Create Rent Book Transaction
        const rentBookDomain = new RentBookDomain();
        rentBookDomain.member_code = member_code;
        rentBookDomain.book_code = book_code;
        rentBookDomain.rent_date = rent_date;
        rentBookDomain.return_date = return_date;
        rentBookDomain.status = status;

        const rentBook = await this.RentBookApp.createRentBook(rentBookDomain);
        //End of Create Rent Book Transaction

        const book_data = await this.RentBookApp.getAllBook(book_code);
        const member_data = await this.RentBookApp.getAllMember(member_code);

        return [book_data, member_data];
    }
}
