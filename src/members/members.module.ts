import { Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller'; 
import { Members } from './domain/member.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from './interfaces/types';
import { CreateMemberApplication } from './applications/create.member.application';
import { CreateMemberService } from './services/create.member.service'; 
import { GetMemberApplication } from './applications/get.member.application';
import { GetMemberService } from './services/get.member.service';

const createMemberApp = { provide: TYPES.applications.ICreateMemberApplication, useClass: CreateMemberApplication };
const getMemberApp = { provide: TYPES.applications.IGetMemberApplication, useClass: GetMemberApplication };

const createMemberService = { provide: TYPES.services.ICreateMemberService, useClass: CreateMemberService };
const getMemberService = { provide: TYPES.services.IGetMemberService, useClass: GetMemberService };

@Module({
    imports: [TypeOrmModule.forFeature([Members])],
    controllers: [MembersController],
    providers: [createMemberApp, getMemberApp, createMemberService, getMemberService],
})
export class MembersModule {}
