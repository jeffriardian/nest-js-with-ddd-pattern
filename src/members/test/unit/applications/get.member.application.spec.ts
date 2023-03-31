import { Test } from '@nestjs/testing';
import { Members } from '../../../domain/member.entity';
import { GetMemberApplication } from '../../../applications/get.member.application';
import { TYPES } from '../../../interfaces/types';
import { NotFoundException } from '@nestjs/common';

const member: Members = {
    code: 'M001',
    name: 'Angga',
};

class GetMemberService {
    getByCode(code) {
        return member;
    }
}

describe('GetMemberApplication', () => {
    let application: GetMemberApplication;
    let service: GetMemberService;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                GetMemberApplication,
                {
                    provide: TYPES.services.IGetMemberService,
                    useClass: GetMemberService,
                },
            ],
        }).compile();

        service = app.get<GetMemberService>(TYPES.services.IGetMemberService);
        application = app.get<GetMemberApplication>(GetMemberApplication);
    });

    describe('getByCode', () => {
        it('should get member by code', async () => {
            expect(await application.getByCode(member.code)).toEqual(member);
        });

        it('throws 404 error when member is not found', async () => {
            jest.spyOn(service, 'getByCode').mockImplementation(() => null);
            try {
                await application.getByCode(member.code);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message.message).toEqual(`Member with code ${member.code} was not found`);
            }
        });
    });
});