import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MemberDomain } from '../domain/member.domain'; 
import { TYPES } from '../interfaces/types';
import { IGetMemberApplication } from '../interfaces/applications/get.member.application.interface';
import { IGetMemberService } from '../interfaces/services/get.member.service.interface';

@Injectable()
export class GetMemberApplication implements IGetMemberApplication {
    constructor(@Inject(TYPES.services.IGetMemberService) private getMemberService: IGetMemberService) {}

    async getByCode(code: string): Promise<MemberDomain> {
        const member = await this.getMemberService.getByCode(code);
        if (!member) {
            throw new NotFoundException(`Member with code ${code} was not found`);
        }
        return member;
    }
}