import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from '../domain/member.entity';
import { MemberDomain } from '../domain/member.domain';
import { IGetMemberService } from '../interfaces/services/get.member.service.interface';

@Injectable()
export class GetMemberService implements IGetMemberService {
    constructor(@InjectRepository(Members) private membersRepository: Repository<Members>) {}

    async getByCode(code: string): Promise<MemberDomain> {
        return this.membersRepository.findOneBy({ code: code });
    }
}