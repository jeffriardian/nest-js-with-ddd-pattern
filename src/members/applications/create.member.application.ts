import { Injectable, Inject } from '@nestjs/common';
import { MemberDomain } from '../domain/member.domain';
import { ICreateMemberApplication } from '../interfaces/applications/create.member.application.interface';
import { TYPES } from '../interfaces/types';
import { ICreateMemberService } from '../interfaces/services/create.member.service.interface';

@Injectable()
export class CreateMemberApplication implements ICreateMemberApplication {
    constructor(@Inject(TYPES.services.ICreateMemberService) private memberService: ICreateMemberService) {}

    async create(member: MemberDomain): Promise<MemberDomain> {
        return this.memberService.create(member);
    }
}