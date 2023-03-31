import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from '../domain/member.entity';
import { MemberDomain } from '../domain/member.domain';
import { ICreateMemberService } from '../interfaces/services/create.member.service.interface';

@Injectable()
export class CreateMemberService implements ICreateMemberService {
    constructor(@InjectRepository(Members) private membersRepository: Repository<Members>) {}

    async create(member: MemberDomain): Promise<MemberDomain> {
        return this.membersRepository.save(member);
    }
}