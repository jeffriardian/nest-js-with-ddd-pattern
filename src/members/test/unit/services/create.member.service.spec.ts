import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMemberService } from '../../../services/create.member.service';
import { Members } from '../../../domain/member.entity';

describe('CreateMemberService', () => {
    let service: CreateMemberService;
    let repositoryMock: Repository<Members>;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateMemberService,
                {
                    // how you provide the injection token in a test instance
                    provide: getRepositoryToken(Members),
                    // as a class value, Repository needs no generics
                    useClass: Repository,
                },
            ],
        }).compile();

        service = app.get<CreateMemberService>(CreateMemberService);
        repositoryMock = app.get<Repository<Members>>(getRepositoryToken(Members));
    });

    describe('create', () => {
        it('should create member', async () => {
            const member: Members = {
                code: 'M001',
                name: 'Angga',
            };
            jest.spyOn(repositoryMock, 'save').mockResolvedValueOnce(member);
            expect(await service.create(member)).toEqual(member);
            expect(repositoryMock.save).toBeCalled();
        });
    });
});
