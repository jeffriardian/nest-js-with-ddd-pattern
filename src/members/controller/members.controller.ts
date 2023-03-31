import { Controller, Inject, Post, Res, Body, HttpStatus, UsePipes, Get, Param } from '@nestjs/common';
import { MemberDomain } from '../domain/member.domain';
import { TYPES } from '../interfaces/types';
import { ICreateMemberApplication } from '../interfaces/applications/create.member.application.interface';
import { ValidationPipe } from 'src/common/validation.pipe';
import { IGetMemberApplication } from '../interfaces/applications/get.member.application.interface';

@Controller('members')
export class MembersController {
    constructor(
        @Inject(TYPES.applications.ICreateMemberApplication) private createMemberApp: ICreateMemberApplication,
        @Inject(TYPES.applications.IGetMemberApplication) private getMemberApp: IGetMemberApplication,
    ) {}

    @UsePipes(new ValidationPipe())
    @Post('/create')
    async create(@Res() res, @Body() memberDomain: MemberDomain) {
        const stock = await this.createMemberApp.create(memberDomain);
        return res.status(HttpStatus.OK).json(stock);
    }

    @Get(':code')
    async findOneBy(@Param('code') code: string) {
        const member = await this.getMemberApp.getByCode(code);
        return member;
    }
}
