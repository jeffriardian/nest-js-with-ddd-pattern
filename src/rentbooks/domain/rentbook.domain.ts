import { IsString, IsNumber } from 'class-validator';

export class RentBookDomain {
    @IsString()
    readonly id: string;

    @IsString()
    member_code: string;

    @IsString()
    book_code: string;

    @IsString()
    rent_date: string;

    @IsString()
    return_date: string;

    @IsString()
    status: string;
}