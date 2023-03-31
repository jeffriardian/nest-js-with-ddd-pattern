import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetMemberService } from '../../../services/get.member.service';
import { Members } from '../../../domain/member.entity';

describe('GetMemberService', () => {
    let service: GetMemberService;
    let repositoryMock: Repository<Members>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetMemberService,
                {
                    provide: getRepositoryToken(Members),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<GetMemberService>(GetMemberService);
        repositoryMock = app.get<Repository<Members>>(getRepositoryToken(Members));
    });

    describe('findByCode', () => {
        it('should find member by code', async () => {
            const member: Members = {
                code: 'M001',
                name: 'Angga',
            };
            jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValueOnce(member);
            expect(await service.getByCode(member.code)).toEqual(member);
            expect(repositoryMock.findOneBy).toBeCalled();
        });
    });
});