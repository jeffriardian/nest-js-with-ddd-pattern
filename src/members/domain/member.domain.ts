import { IsString } from 'class-validator';

export class MemberDomain {
    @IsString()
    readonly code: string;

    @IsString()
    readonly name: string;
}