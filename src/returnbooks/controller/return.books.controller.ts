import { Controller, Inject, Post, NotFoundException, Param } from '@nestjs/common';
import { RentBookDomain } from 'src/rentbooks/domain/rentbook.domain';
import { TYPES } from '../interfaces/types';
import { ICreateReturnBookApplication } from '../interfaces/applications/create.return.member.application.interface';

@Controller('return')
export class ReturnBooksController {
    constructor(
        @Inject(TYPES.applications.ICreateReturnBookApplication) private returnBookApp: ICreateReturnBookApplication,
    ) {}

    @Post(':member_code/:book_code')
    async create(@Param('member_code') member_code: string, @Param('book_code') book_code: string) {
        //Define master data
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        
        const return_date = year + "-" + month + "-" + date;

        //Start of Validation
        //Check data Rent Book exist or not
        const rentBookData = await this.returnBookApp.getRentBook(member_code, book_code);
        const rentBookId = parseInt(rentBookData.id);

        //Check data return date more than 7 days
        const rent_date1 = new Date(rentBookData.rent_date);
        let date_rent = rent_date1.getDate();
        let month_rent = rent_date1.getMonth() + 1;
        let year_rent = rent_date1.getFullYear();
        const return_date1 = year_rent + "-" + month_rent + "-" + date_rent;
        const return_date7 = new Date(return_date1);
        const return_Date_current = new Date(return_date);
        //End of Validation

        if (return_Date_current > return_date7){
            const status = 'penalized';

            //Start of Create Rent Book Transaction
            const rentBookDomain = new RentBookDomain();
            rentBookDomain.return_date = return_date;
            rentBookDomain.status = status;
    
            const rentBook = await this.returnBookApp.UpdateById(rentBookId, rentBookDomain);
            //End of Create Rent Book Transaction
    
            throw new NotFoundException(`Member got penalized`);
        }else{
            const status = 'return';

            //Start of Create Rent Book Transaction
            const rentBookDomain = new RentBookDomain();
            rentBookDomain.return_date = return_date;
            rentBookDomain.status = status;
    
            const rentBook = await this.returnBookApp.UpdateById(rentBookId, rentBookDomain);
            //End of Create Rent Book Transaction
    
            return { status: "success"};
        }
    }
}
