import { Test } from '@nestjs/testing';
import { Members } from '../../../domain/member.entity';
import { CreateMemberApplication } from '../../../applications/create.member.application';
import { TYPES } from '../../../interfaces/types';

class CreateMemberService {
    create(member) {
        return member;
    }
}
describe('CreateMemberApplication', () => {
    let application: CreateMemberApplication;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                CreateMemberApplication,
                {
                    provide: TYPES.services.ICreateMemberService,
                    useClass: CreateMemberService,
                },
            ],
        }).compile();

        application = app.get<CreateMemberApplication>(CreateMemberApplication);
    });

    describe('create', () => {
        it('should create member', async () => {
            const member: Members = {
                code: 'M001',
                name: 'Angga',
            };
            expect(await application.create(member)).toEqual(member);
        });
    });
});