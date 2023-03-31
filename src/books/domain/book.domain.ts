import { IsString, IsNumber } from 'class-validator';

export class BookDomain {
    @IsString()
    readonly code: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly author: string;

    @IsNumber()
    readonly stock: number;
}