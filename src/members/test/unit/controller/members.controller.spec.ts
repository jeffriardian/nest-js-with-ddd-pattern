import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from '../../../controller/members.controller';
import { TYPES } from '../../../interfaces/types';

const member = {
    code: 'M001',
    name: 'Angga',
};

class CreateMemberApplicationMock {
    create(obj) {
        return member;
    }
}

class GetMemberApplicationMock {
    getByCode(code) {
        return member;
    }
}

describe('Members Controller', () => {
    let controller: MembersController;
    let createMemberAppMock;
    let getMemberAppMock;
    const response = {
        status: (code: number) => response,
        json: json => json,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MembersController],
            providers: [
                {
                    provide: TYPES.applications.ICreateMemberApplication,
                    useClass: CreateMemberApplicationMock,
                },
                {
                    provide: TYPES.applications.IGetMemberApplication,
                    useClass: GetMemberApplicationMock,
                },
            ],
        }).compile();

        controller = module.get<MembersController>(MembersController);
        createMemberAppMock = module.get(TYPES.applications.ICreateMemberApplication);
        getMemberAppMock = module.get(TYPES.applications.IGetMemberApplication);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findOneBy', () => {
        it('should get member by code', async () => {
            jest.spyOn(getMemberAppMock, 'getByCode');

            expect(await controller.findOneBy(member.code)).toEqual(member);
            expect(getMemberAppMock.getByCode).toBeCalled();
        });
    });
    describe('create', () => {
        it('should create member', async () => {
            jest.spyOn(createMemberAppMock, 'create');

            expect(await controller.create(response, member)).toEqual(member);
            expect(createMemberAppMock.create).toBeCalled();
        });
    });
});